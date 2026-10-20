# Polish letter bingo

Generate randomized letter bingo sheets for children.
The Polish interface works offline.
Each board uses one A4 portrait page.
The experiment needs no installed packages, server, or build step.

## Open the page

Open `index.html` in a current desktop browser, such as Microsoft Edge, Chrome, or Firefox.
Keep `styles.css` and `script.js` beside the HTML file.
Enable JavaScript.
The page generates ten boards when it opens.

## Interface appearance

The screen interface uses a picture-book theme with bright accents, outlined controls, and decorative shapes.
Titles use Baloo 2, and the controls use Nunito.
The browser requests these fonts from Google Fonts when a network connection is available.
Local fallback fonts keep the interface usable offline.
Font requests do not send generated sheets or form values.
Generation and printing require no external service.

[Baloo 2](https://github.com/google/fonts/tree/main/ofl/baloo2) includes extended Latin characters for Polish headings.

The interface uses larger text, visible keyboard focus, and responsive controls.
Common board settings remain visible.
Font, layout, and color controls occupy a collapsible section labeled **Wygląd plansz i kolory**.
This section is closed initially and uses native keyboard-accessible controls.
Reduced-motion preferences disable the reveal animation and decorative movement.

The sheet preview and print layout use the selected board font.
White cells, letter colors, and page dimensions do not depend on the font selection.

## Generate sheets

1. Set the row count and column count, each from 2 through 32.
2. Set the sheet count from 1 through 100.
3. Select uppercase or lowercase letters.
4. Optionally open **Wygląd plansz i kolory** to change the font, square-cell layout, or colors.
5. Select **Generuj plansze**.
6. Review the sheets below the controls.

The initial settings are 5 rows, 5 columns, uppercase letters, Arial, black text, and square cells.
Settings do not change an existing batch.
After a setting changes, generate the batch again before printing.
Invalid settings leave the previous preview visible and disable the Print button.

Opening or closing the appearance section does not change its values or regenerate sheets.
Closed controls still apply to generated sheets.
Generate and Print remain visible outside the section.

## Board fonts

Open **Wygląd plansz i kolory** and select a font before generating the sheets.
The selection applies to both the preview and printed letters.
It does not change the interface font.

| Font | Style |
| --- | --- |
| Arial | Classic sans-serif, selected by default |
| Georgia | Traditional serif |
| Trebuchet MS | Clear sans-serif |
| Nunito | Rounded, like the interface text |
| Comic Sans MS | Handwritten style |

Nunito loads through the existing Google Fonts request.
This font applies to printing as well as the screen.
The Print button waits for pending font requests before it opens the print dialog.
If a font cannot load or is not installed, the browser uses its declared fallback fonts.
All generation and print controls remain available offline.
Generate the sheets again after changing the font.

## Letters and colors

The generator uses all 32 letters of the Polish alphabet:

`A Ą B C Ć D E Ę F G H I J K L Ł M N Ń O Ó P R S Ś T U W Y Z Ź Ż`

Letters do not repeat within a row or column.
They can repeat elsewhere on a board.
Boards within a generated batch have different letter arrangements.

| Mode | Behavior |
| --- | --- |
| Wszystkie czarne | Every letter is black. This is the initial mode. |
| Samogłoski i spółgłoski | Vowels are red and consonants are blue. Change either color with its control. |
| Losowe kolory | Each letter occurrence receives a random color from the six editable palette colors. Colors can repeat. |

The vowels are `A Ą E Ę I O Ó U Y`.
All other letters in this alphabet are consonants.
Cell backgrounds always remain white.
Very light custom colors can be difficult to read on white paper.

### Generate a palette

1. Open **Wygląd plansz i kolory** and select **Losowe kolory**.
2. Select **Losuj paletę** to generate six coordinated colors.
3. Select **Zablokuj** below any color that you want to keep.
4. Select **Losuj paletę** again to replace only unlocked colors.
5. Change any color manually with its color control.
6. Select **Generuj plansze** to use the palette on new sheets.

The generator combines related or complementary hues.
If a locked color has a distinct hue, the generator uses the first such color as its reference.
Multiple locked colors remain unchanged, even if their hues differ.

Generated colors have a contrast ratio of at least 4.5:1 against white.
The contrast ratio measures the difference in relative brightness between two colors.
Manual colors and locked colors remain unchanged, even if they have lower contrast.

The generator button is disabled when all six colors are locked.
Changing locks alone does not change a palette or invalidate the current sheets.
Hexadecimal color codes appear below the color controls.
The generator works offline and uses no external services or dependencies.

### Board generation

The generator uses a randomized Latin square.
A Latin square arranges symbols so each symbol occurs once in each row and column.
The generator shuffles letters and row and column offsets in a 32-letter construction.
It selects the requested rows and columns.
This guarantees row and column uniqueness without repeated attempts to place individual letters.
It does not sample every possible valid board uniformly.
Duplicate boards trigger another attempt, with a limit of 100 attempts per sheet.
A generation error preserves the previous preview and disables the Print button.

## Print or save as PDF

1. Generate the required batch.
2. Select **Drukuj / zapisz PDF**.
3. Select A4 paper and portrait orientation.
4. Select 100% scale.
5. Disable browser headers and footers.
6. Keep the page margins defined by the document.
7. Select a printer, or select the browser PDF destination.
8. Print or save the complete batch.

The document defines 10 mm page margins.
The content reserves an additional 1 mm at the bottom to reduce page overflow from browser rounding.
The title and sheet numbers appear only in the screen preview.
Only the letter grid prints.
With **Tylko kwadratowe pola** selected, the grid uses the largest square cells that fit inside the available page area.
The square-cell grid stays centered and leaves white space when its proportions differ from the page.
With the option cleared, the grid fills the available page area and can have rectangular cells.
The selected layout applies to both the preview and printed sheets.
Printed sheets reserve no space for a title or sheet number.
Controls and screen decorations do not print.
Disable browser headers and footers separately in the print dialog.
The webpage cannot reliably disable these browser features.
Printing does not change the letters or their colors.

## Limits

- Large boards have small letters. A 32-by-32 board is supported but is less suitable for early reading practice.
- Narrow rectangular boards also have small letters because the font must fit both cell dimensions.
- A batch of 100 large boards can take time to render and print.
- Printer margins, browser settings, paper, and ink can affect the result.
- The browser can override document colors or margins.
- The page uses a print color hint, but cannot guarantee identical screen and paper colors.
- The Print button blocks outdated settings. The browser print shortcut can still print the previous preview.
- The page does not save settings or batches after a reload.
- The page has no free center, caller sheet, custom letter subset, or direct PDF download.
- Generation and printing work offline. The optional Google Fonts requests require network access.

## Verification

Automated checks and browser print checks require separate authorization under the workspace instructions.
Do not treat the implementation alone as evidence that every browser produces the same printed result.
