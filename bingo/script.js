"use strict";

const ALPHABET = Array.from("AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ");
const VOWELS = new Set(Array.from("AĄEĘIOÓUY"));
const MAX_DUPLICATE_ATTEMPTS = 100;

const form = document.getElementById("settings");
const sheets = document.getElementById("sheets");
const status = document.getElementById("status");
const generationError = document.getElementById("generation-error");
const printButton = document.getElementById("print");
const colorMode = document.getElementById("color-mode");
const paletteCards = Array.from(document.querySelectorAll(".palette-card"));
const paletteButton = document.getElementById("generate-palette");
const paletteStatus = document.getElementById("palette-status");
let printPending = false;
const numberFields = [
  { id: "rows", label: "Liczba wierszy", min: 2, max: 32 },
  { id: "columns", label: "Liczba kolumn", min: 2, max: 32 },
  { id: "count", label: "Liczba plansz", min: 1, max: 100 },
];

function shuffle(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function createBoard(rows, columns) {
  const letters = shuffle(ALPHABET);
  const offsets = ALPHABET.map((_, index) => index);
  const rowOffsets = shuffle(offsets).slice(0, rows);
  const columnOffsets = shuffle(offsets).slice(0, columns);
  return rowOffsets.map((row) =>
    columnOffsets.map((column) => letters[(row + column) % ALPHABET.length]),
  );
}

function createBatch(rows, columns, count) {
  const boards = [];
  const signatures = new Set();
  for (let index = 0; index < count; index += 1) {
    let board;
    let signature;
    let attempts = 0;
    do {
      if (attempts >= MAX_DUPLICATE_ATTEMPTS) {
        throw new Error(
          "Nie udało się wylosować różnych plansz. Spróbuj ponownie lub zmniejsz liczbę plansz.",
        );
      }
      board = createBoard(rows, columns);
      signature = board.flat().join("");
      attempts += 1;
    } while (signatures.has(signature));
    signatures.add(signature);
    boards.push(board);
  }
  return boards;
}

function readSettings() {
  const settings = {};
  let firstInvalid = null;
  for (const { id, label, min, max } of numberFields) {
    const input = document.getElementById(id);
    const value = input.valueAsNumber;
    const valid = Number.isInteger(value) && value >= min && value <= max;
    input.setAttribute("aria-invalid", String(!valid));
    document.getElementById(`${id}-error`).textContent = valid
      ? ""
      : `${label}: wpisz liczbę całkowitą od ${min} do ${max}.`;
    if (!valid && firstInvalid === null) {
      firstInvalid = input;
    }
    settings[id] = value;
  }
  if (firstInvalid !== null) {
    firstInvalid.focus();
    return null;
  }
  settings.letterCase = document.getElementById("letter-case").value;
  settings.boardFont = document.getElementById("board-font").value;
  settings.squareCells = document.getElementById("square-cells").checked;
  settings.colorMode = colorMode.value;
  settings.vowelColor = document.getElementById("vowel-color").value;
  settings.consonantColor = document.getElementById("consonant-color").value;
  settings.palette = Array.from(
    document.querySelectorAll(".palette-color"),
    (input) => input.value,
  );
  return settings;
}

function letterColor(letter, settings) {
  if (settings.colorMode === "groups") {
    return VOWELS.has(letter) ? settings.vowelColor : settings.consonantColor;
  }
  if (settings.colorMode === "random") {
    return settings.palette[Math.floor(Math.random() * settings.palette.length)];
  }
  return "#000000";
}

function hexChannels(hex) {
  return [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255);
}

function colorHue(hex) {
  const [red, green, blue] = hexChannels(hex);
  const maximum = Math.max(red, green, blue);
  const delta = maximum - Math.min(red, green, blue);
  if (delta < 0.05) {
    return null;
  }
  const sector = maximum === red
    ? (green - blue) / delta
    : maximum === green
      ? (blue - red) / delta + 2
      : (red - green) / delta + 4;
  return (sector * 60 + 360) % 360;
}

function hslToHex(hue, saturation, lightness) {
  const sector = ((hue % 360 + 360) % 360) / 60;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const secondary = chroma * (1 - Math.abs(sector % 2 - 1));
  const channels = [
    [chroma, secondary, 0], [secondary, chroma, 0],
    [0, chroma, secondary], [0, secondary, chroma],
    [secondary, 0, chroma], [chroma, 0, secondary],
  ][Math.floor(sector)];
  return "#" + channels.map((channel) =>
    Math.round((channel + lightness - chroma / 2) * 255).toString(16).padStart(2, "0"),
  ).join("");
}

function whiteContrast(hex) {
  const linear = hexChannels(hex).map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  const luminance = linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  return 1.05 / (luminance + 0.05);
}

function updatePaletteControls() {
  paletteCards.forEach((card) => {
    card.querySelector(".palette-hex").textContent = card.querySelector(".palette-color").value.toUpperCase();
    card.classList.toggle("locked", card.querySelector(".palette-lock").checked);
  });
  const allLocked = paletteCards.every((card) => card.querySelector(".palette-lock").checked);
  paletteButton.disabled = allLocked;
  paletteStatus.textContent = allLocked
    ? "Wszystkie kolory są zablokowane. Odblokuj przynajmniej jeden, aby losować paletę."
    : "";
}

function generatePalette() {
  const schemes = [
    [0, 22, 44, 160, 182, 204],
    [0, 25, 120, 145, 240, 265],
    [0, 18, 36, 54, 72, 90],
  ];
  const offsets = schemes[Math.floor(Math.random() * schemes.length)];
  const anchorIndex = paletteCards.findIndex((card) =>
    card.querySelector(".palette-lock").checked
      && colorHue(card.querySelector(".palette-color").value) !== null,
  );
  const baseHue = anchorIndex === -1
    ? Math.random() * 360
    : colorHue(paletteCards[anchorIndex].querySelector(".palette-color").value) - offsets[anchorIndex];
  const saturation = 0.58 + Math.random() * 0.22;
  paletteCards.forEach((card, index) => {
    if (card.querySelector(".palette-lock").checked) {
      return;
    }
    const hue = baseHue + offsets[index] + Math.random() * 12 - 6;
    let lightness = 0.34 + Math.random() * 0.1;
    let color = hslToHex(hue, saturation, lightness);
    while (whiteContrast(color) < 4.5) {
      lightness -= 0.01;
      color = hslToHex(hue, saturation, lightness);
    }
    card.querySelector(".palette-color").value = color;
  });
  updatePaletteControls();
  markOutdated();
  paletteStatus.textContent = "Nowa paleta jest gotowa. Kliknij „Generuj plansze”, aby użyć jej na wydruku.";
}

function renderBatch(boards, settings) {
  const fragment = document.createDocumentFragment();
  boards.forEach((letters, index) => {
    const page = document.createElement("article");
    page.className = "page-preview";
    page.setAttribute("aria-label", `Plansza ${index + 1}`);

    const sheet = document.createElement("div");
    sheet.className = "sheet";
    const header = document.createElement("div");
    header.className = "sheet-header";
    const title = document.createElement("span");
    title.className = "sheet-title";
    title.textContent = "Literkowe bingo";
    const number = document.createElement("span");
    number.textContent = `Plansza ${index + 1} / ${boards.length}`;
    header.append(title, number);

    const board = document.createElement("div");
    board.className = "board";
    board.dataset.font = settings.boardFont;
    board.classList.toggle("full-page", !settings.squareCells);
    board.setAttribute("role", "table");
    board.setAttribute("aria-label", `${settings.rows} × ${settings.columns}`);
    board.setAttribute("aria-rowcount", String(settings.rows));
    board.setAttribute("aria-colcount", String(settings.columns));
    board.style.setProperty("--rows", settings.rows);
    board.style.setProperty("--columns", settings.columns);
    letters.forEach((row, rowIndex) => {
      const boardRow = document.createElement("div");
      boardRow.className = "board-row";
      boardRow.setAttribute("role", "row");
      row.forEach((letter, columnIndex) => {
        const cell = document.createElement("span");
        cell.className = "cell";
        cell.setAttribute("role", "cell");
        cell.setAttribute("aria-rowindex", String(rowIndex + 1));
        cell.setAttribute("aria-colindex", String(columnIndex + 1));
        cell.textContent = settings.letterCase === "lower" ? letter.toLowerCase() : letter;
        cell.style.color = letterColor(letter, settings);
        boardRow.append(cell);
      });
      board.append(boardRow);
    });
    sheet.append(header, board);
    page.append(sheet);
    fragment.append(page);
  });
  return fragment;
}

function updatePreviewScale() {
  const page = sheets.querySelector(".page-preview");
  if (page !== null) {
    const sheet = page.querySelector(".sheet");
    sheets.style.setProperty("--preview-scale", page.clientWidth / sheet.offsetWidth);
  }
}

function updateColorControls() {
  document.getElementById("group-colors").hidden = colorMode.value !== "groups";
  document.getElementById("random-colors").hidden = colorMode.value !== "random";
  document.getElementById("color-help").hidden = colorMode.value === "black";
}

function markOutdated() {
  updateColorControls();
  printButton.disabled = true;
  status.textContent = "Ustawienia zmienione. Kliknij „Generuj plansze”, aby odświeżyć podgląd przed drukowaniem.";
}

function generate() {
  printButton.disabled = true;
  generationError.textContent = "";
  const settings = readSettings();
  if (settings === null) {
    status.textContent = "Popraw zaznaczone pola i ponownie wygeneruj plansze.";
    return;
  }

  try {
    const boards = createBatch(settings.rows, settings.columns, settings.count);
    const fragment = renderBatch(boards, settings);
    sheets.replaceChildren(fragment);
    updatePreviewScale();
    printButton.disabled = false;
    status.textContent = `Gotowe do druku. Liczba plansz: ${boards.length}. Każda plansza zajmuje osobną stronę A4.`;
  } catch (error) {
    console.error("Board generation failed.", error);
    generationError.textContent = error instanceof Error
      ? error.message
      : "Nie udało się wygenerować plansz. Spróbuj ponownie.";
    status.textContent = "Nowe plansze nie są gotowe. Drukowanie jest wyłączone.";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generate();
});
function handleSettingsChange(event) {
  if (event.target.matches(".palette-lock")) {
    updatePaletteControls();
    return;
  }
  if (event.target.matches(".palette-color")) {
    updatePaletteControls();
  }
  markOutdated();
}

form.addEventListener("input", handleSettingsChange);
form.addEventListener("change", handleSettingsChange);
paletteButton.addEventListener("click", generatePalette);
printButton.addEventListener("click", async () => {
  if (printButton.disabled || printPending) {
    return;
  }
  printPending = true;
  try {
    await document.fonts.ready;
    if (!printButton.disabled) {
      window.print();
    }
  } finally {
    printPending = false;
  }
});
const previewObserver = new ResizeObserver(updatePreviewScale);
previewObserver.observe(sheets);
updatePaletteControls();
updateColorControls();
generate();
