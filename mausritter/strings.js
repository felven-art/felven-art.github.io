/* ============================================================================
   strings.js — all translatable UI text, loaded before the app.
   Plain <script> (NOT fetch/JSON) on purpose, so the app still works when the
   file is opened directly (file://).

   To add a language: copy the `en` block, translate the values, give it a code
   (e.g. `de`), and add a matching <option> to #langSel in index.html.
   Missing keys fall back to English, then to the key name.

   NOTE: the default item/condition LIBRARY names live in index.html and stay
   English. A placed item stores a snapshot of its definition, so translating
   library names wouldn't retro-translate already-placed items — not worth the
   extra complexity here. Zone labels below DO translate (drawn fresh each time).
   ========================================================================== */
window.STRINGS = {

  en: {
    'app.title': 'Mausritter Live Sheets',
    'app.sub': 'Shared character sheets — no account, no server of your own.',

    'nav.chars': 'Characters', 'nav.live': 'Live Session', 'nav.help': 'Help',

    'list.title': 'Characters',
    'list.empty': 'No characters yet. Create one to begin.',
    'btn.new': '+ New character', 'btn.random': 'Random',
    'btn.export': 'Export JSON', 'btn.import': 'Import JSON',
    'card.delete': 'Delete', 'card.unnamed': 'Unnamed',
    'confirm.delChar': 'Delete "{name}" for everyone in the room?',

    'ed.back': '← Back', 'ed.namePh': 'Name', 'ed.delete': 'Delete',
    'ed.secCharacter': 'Character', 'ed.secStats': 'Stats',
    'ed.secInventory': 'Inventory', 'ed.secHirelings': 'Hirelings',
    'f.background': 'Background', 'f.birthsign': 'Birthsign', 'f.coat': 'Coat', 'f.look': 'Look',
    'f.level': 'Level', 'f.xp': 'XP', 'f.grit': 'Grit', 'f.pips': 'Pips /250',
    'f.gritSlots': 'Grit',
    'grit.divider': 'Grit Slots',
    'f.notes': 'Notes / description',
    'st.max': 'Max', 'st.now': 'Now',
    'st.str': 'STR', 'st.dex': 'DEX', 'st.wil': 'WIL', 'st.hp': 'HP',

    'hire.add': '+ Add hireling', 'hire.title': 'Hireling {n}', 'hire.remove': 'Remove',
    'hire.look': 'Look', 'hire.disposition': 'Disposition',

    'ic.edit': 'Edit', 'ic.rotate': 'Rotate', 'ic.remove': 'Remove',
    'confirm.removeItem': 'Remove "{name}"?',

    'ie.title': 'Edit item', 'ie.name': 'Name', 'ie.type': 'Type', 'ie.size': 'Size',
    'ie.size1': '1 slot', 'ie.size2': '2 slots',
    'ie.damage': 'Damage (optional)', 'ie.usage': 'Usage dots', 'ie.notes': 'Notes (optional)',
    'ie.clear': 'How to clear (optional)',
    'ie.cancel': 'Cancel', 'ie.save': 'Save',
    'cf.namePh': 'Custom item', 'cf.add': 'Add to library',

    'type.weapon': 'Weapon', 'type.ranged': 'Ranged', 'type.armour': 'Armour',
    'type.utility': 'Utility', 'type.spell': 'Spell', 'type.condition': 'Condition', 'type.custom': 'Custom',

    'pal.items': 'items', 'pal.conditions': 'conditions', 'pal.custom': 'custom',
    'pal.empty': 'Nothing here yet.',
    'pal.header': 'Items & conditions',
    'bank.header': 'Bank',

    'toast.nameReq': 'Name required',
    'toast.noFit': "Doesn't fit at that size — make room first",
    'toast.noRoom': 'No room on the sheet',
    'toast.cantPlace': "Can't place there",
    'toast.cantRotate': "Can't rotate there",
    'toast.added': 'Added {name}',
    'toast.imported': 'Imported {n} character(s)',
    'toast.importErr': 'Could not read that file',
    'toast.created': 'Created {name}',
    'toast.copied': 'Invite link copied',
    'toast.sessionStarted': 'Session started',
    'toast.connected': 'Connected',
    'toast.liveErr': 'Live error: {type}',

    'live.leave': 'Leave',
    'live.title': 'Live Session',
    'live.blurb': 'Share your sheets with other players in real time. Data travels peer-to-peer. Everyone connected can view and edit every sheet (permissions are informal).',
    'live.yourName': 'Your display name', 'live.yourNamePh': 'e.g. Bramble',
    'live.host': 'Host a session', 'live.copyInvite': 'Copy invite link', 'live.end': 'End session',
    'live.atTable': 'At the table', 'live.joinWith': 'Join with an invite link',
    'live.joinLinkPh': 'Paste invite link here', 'live.join': 'Join',
    'live.hosting': 'Hosting {code}', 'live.joined': 'Joined {code}',
    'live.ended': 'Session ended', 'live.left': 'Left session',
    'live.hostEnded': 'Host ended the session', 'live.disconnected': 'Disconnected from host',
    'live.badLink': 'That does not look like a valid invite link.',
    'live.cantConnect': 'Could not connect. Ask the host for a fresh link.',
    'live.reconnecting': 'Connection dropped — reconnecting… (try {n})',
    'live.reconnected': 'Back online',
    'live.giveUp': 'Could not reconnect. Ask the host for a fresh invite link.',
    'role.host': 'Host', 'role.player': 'Player',

    'help.title': 'How it works',
    'help.1': 'Character sheets are saved in <strong>this browser</strong> (localStorage). They are not on any server.',
    'help.2': '<strong>Export JSON</strong> is your backup. Clearing browser data erases everything else.',
    'help.3': '<strong>Live Session</strong>: one person hosts and shares the invite link. Edits sync live via peer-to-peer WebRTC. Data is not stored by anyone in the middle.',
    'help.4': 'If the host leaves, live sync stops — but each person keeps their own local copy.',
    'help.5': 'Inventory: drag items from the palette onto the 5×2 grid. Two-slot items can be rotated. Drop onto an occupied or off-grid spot is rejected.',
    'help.6': 'Run it from a web server (or GitHub Pages), not by double-clicking the file — live sync and clipboard need a real origin.',

    'zone.mainPaw': 'Main Paw', 'zone.body': 'Body', 'zone.pack': 'Pack', 'zone.offPaw': 'Off Paw',
    'foot.ready': 'Ready to use', 'foot.quick': 'Quick to ready',
    'foot.pack': 'Pack: Takes time to ready during combat, requires an action to retrieve.',

    // Default item & condition library. A placed item stores nameKey/notesKey
    // so it stays translated; editing an item's text detaches it (see index.html).
    'item.improvised.name': 'Improvised', 'item.improvised.notes': 'Mark usage after each use in combat.',
    'item.light.name': 'Light', 'item.light.notes': 'If attacking with two light weapons at once, roll two dice and keep the higher.',
    'item.medium.name': 'Medium', 'item.medium.notes': 'Held in one paw deals k6 damage. In both – k8.',
    'item.heavy.name': 'Heavy',
    'item.lightRanged.name': 'Light ranged',
    'item.heavyRanged.name': 'Heavy ranged',
    'item.slingBullets.name': 'Sling bullets, bag',
    'item.arrows.name': 'Arrows, quiver',
    'item.lightArmour.name': 'Light armour', 'item.lightArmour.notes': 'Reduces damage by 1',
    'item.heavyArmour.name': 'Heavy armour', 'item.heavyArmour.notes': 'Reduces damage by 1',
    'item.torch.name': 'Torch', 'item.torch.notes': 'Mark usage every 6th turn.',
    'item.lantern.name': 'Lantern', 'item.lantern.notes': 'Mark usage every 6th turn.',
    'item.eLantern.name': 'Electric lantern', 'item.eLantern.notes': 'Mark usage every 6th turn.',
    'item.rations.name': 'Rations',
    'item.coinPurse.name': 'Coin purse', 'item.coinPurse.notes': 'Holds 250 pips',
    'item.fireball.name': 'Fireball', 'item.fireball.notes': 'Spell stone',

    'cond.exhausted.name': 'Exhausted', 'cond.exhausted.notes': '', 'cond.exhausted.clear': 'Removal: Long rest',
    'cond.frightened.name': 'Frightened', 'cond.frightened.notes': '', 'cond.frightened.clear': 'Removal: Short rest; Pass a WIL test to face the fear',
    'cond.hungry.name': 'Hungry', 'cond.hungry.notes': '', 'cond.hungry.clear': 'Removal: Eat a meal',
    'cond.wounded.name': 'Wounded', 'cond.wounded.notes': '', 'cond.wounded.clear': 'Removal: Full rest; Disadvantage on STR and DEX tests',
    'cond.insane.name': 'Insane', 'cond.insane.notes': '', 'cond.insane.clear': 'Removal: Full rest; Disadvantage on WIL tests',
  },

  pl: {
    'app.title': 'Mausritter — Karty na żywo',
    'app.sub': 'Wspólne karty postaci — bez konta, bez własnego serwera.',

    'nav.chars': 'Postacie', 'nav.live': 'Sesja na żywo', 'nav.help': 'Pomoc',

    'list.title': 'Postacie',
    'list.empty': 'Brak postaci. Utwórz jedną, aby zacząć.',
    'btn.new': '+ Nowa postać', 'btn.random': 'Losowa',
    'btn.export': 'Eksport JSON', 'btn.import': 'Import JSON',
    'card.delete': 'Usuń', 'card.unnamed': 'Bez imienia',
    'confirm.delChar': 'Usunąć „{name}" dla wszystkich w pokoju?',

    'ed.back': '← Wróć', 'ed.namePh': 'Imię', 'ed.delete': 'Usuń',
    'ed.secCharacter': 'Postać', 'ed.secStats': 'Cechy',
    'ed.secInventory': 'Ekwipunek', 'ed.secHirelings': 'Najemnicy',
    'f.background': 'Zawód', 'f.birthsign': 'Znak zodiaku', 'f.coat': 'Sierść', 'f.look': 'Szczegół',
    'f.level': 'Poziom', 'f.xp': 'PD', 'f.grit': 'Hart', 'f.pips': 'Pestki /250',
    'f.gritSlots': 'Hart',
    'grit.divider': 'Sloty Hartu',
    'f.notes': 'Notatki',
    'st.max': 'Maksymalna', 'st.now': 'Obecna',
    'st.str': 'SF', 'st.dex': 'ZR', 'st.wil': 'SW', 'st.hp': 'PW',

    'hire.add': '+ Dodaj najemnika', 'hire.title': 'Najemnik {n}', 'hire.remove': 'Usuń',
    'hire.look': 'Wygląd', 'hire.disposition': 'Nastawienie',

    'ic.edit': 'Edytuj', 'ic.rotate': 'Obróć', 'ic.remove': 'Usuń',
    'confirm.removeItem': 'Usunąć „{name}"?',

    'ie.title': 'Edytuj przedmiot', 'ie.name': 'Nazwa', 'ie.type': 'Typ', 'ie.size': 'Rozmiar',
    'ie.size1': '1 pole', 'ie.size2': '2 pola',
    'ie.damage': 'Obrażenia (opcjonalne)', 'ie.usage': 'Punkty zużycia', 'ie.notes': 'Notatki (opcjonalne)',
    'ie.clear': 'Jak usunąć (opcjonalne)',
    'ie.cancel': 'Anuluj', 'ie.save': 'Zapisz',
    'cf.namePh': 'Własny przedmiot', 'cf.add': 'Dodaj do biblioteki',

    'type.weapon': 'Broń', 'type.ranged': 'Dystansowa', 'type.armour': 'Pancerz',
    'type.utility': 'Narzędzie', 'type.spell': 'Zaklęcie', 'type.condition': 'Stan', 'type.custom': 'Własne',

    'pal.items': 'przedmioty', 'pal.conditions': 'stany', 'pal.custom': 'własne',
    'pal.empty': 'Jeszcze nic tu nie ma.',
    'pal.header': 'Przedmioty i stany',
    'bank.header': 'Bank',

    'toast.nameReq': 'Wymagana nazwa',
    'toast.noFit': 'Nie mieści się w tym rozmiarze — najpierw zrób miejsce',
    'toast.noRoom': 'Brak miejsca na karcie',
    'toast.cantPlace': 'Nie można tu położyć',
    'toast.cantRotate': 'Nie można tu obrócić',
    'toast.added': 'Dodano {name}',
    'toast.imported': 'Zaimportowano postacie: {n}',
    'toast.importErr': 'Nie udało się odczytać pliku',
    'toast.created': 'Utworzono {name}',
    'toast.copied': 'Skopiowano link',
    'toast.sessionStarted': 'Sesja rozpoczęta',
    'toast.connected': 'Połączono',
    'toast.liveErr': 'Błąd sesji: {type}',

    'live.leave': 'Rozłącz',
    'live.title': 'Sesja na żywo',
    'live.blurb': 'Udostępniaj karty innym graczom na żywo. Dane przesyłane są bezpośrednio między urządzeniami. Każdy podłączony może oglądać i edytować każdą kartę (uprawnienia są nieformalne).',
    'live.yourName': 'Twoja nazwa', 'live.yourNamePh': 'np. Bramble',
    'live.host': 'Załóż sesję', 'live.copyInvite': 'Kopiuj link', 'live.end': 'Zakończ sesję',
    'live.atTable': 'Przy stole', 'live.joinWith': 'Dołącz przez link',
    'live.joinLinkPh': 'Wklej link tutaj', 'live.join': 'Dołącz',
    'live.hosting': 'Hostujesz {code}', 'live.joined': 'Dołączono {code}',
    'live.ended': 'Sesja zakończona', 'live.left': 'Opuszczono sesję',
    'live.hostEnded': 'Host zakończył sesję', 'live.disconnected': 'Utracono połączenie z hostem',
    'live.badLink': 'To nie wygląda na prawidłowy link.',
    'live.cantConnect': 'Nie udało się połączyć. Poproś hosta o nowy link.',
    'live.reconnecting': 'Połączenie przerwane — ponowne łączenie… (próba {n})',
    'live.reconnected': 'Znowu online',
    'live.giveUp': 'Nie udało się połączyć ponownie. Poproś hosta o nowy link.',
    'role.host': 'Host', 'role.player': 'Gracz',

    'help.title': 'Jak to działa',
    'help.1': 'Karty postaci są zapisywane w <strong>tej przeglądarce</strong> (localStorage). Nie ma ich na żadnym serwerze.',
    'help.2': '<strong>Eksport JSON</strong> to Twoja kopia zapasowa. Wyczyszczenie danych przeglądarki usuwa resztę.',
    'help.3': '<strong>Sesja na żywo</strong>: jedna osoba hostuje i udostępnia link. Zmiany synchronizują się na żywo przez WebRTC. Dane nie są nigdzie po drodze przechowywane.',
    'help.4': 'Jeśli host wyjdzie, synchronizacja się kończy — ale każdy zachowuje swoją lokalną kopię.',
    'help.5': 'Ekwipunek: przeciągaj przedmioty z palety na siatkę 5×2. Przedmioty 2-polowe można obracać. Upuszczenie na zajęte lub poza siatką jest odrzucane.',
    'help.6': 'Uruchamiaj z serwera WWW (lub GitHub Pages), nie przez dwuklik pliku — sesja na żywo i schowek wymagają prawdziwego origin.',

    'zone.mainPaw': 'Główna łapka', 'zone.body': 'Na sobie', 'zone.pack': 'Plecak', 'zone.offPaw': 'Druga łapka',
    'foot.ready': 'Gotowe do użycia', 'foot.quick': 'Szybkie przygotowanie',
    'foot.pack': 'Plecak: Przygotowanie zabiera czas; wyciągnięcie w walce to akcja',

    'item.improvised.name': 'Improwizowana', 'item.improvised.notes': 'Zaznacz zużycie po każdym wykorzystaniu w walce.',
    'item.light.name': 'Lekka', 'item.light.notes': 'Jeśli atakujesz dwiema lekkimi broniami jednocześnie, rzuć dwiema kostkami i wybierz wyższy wynik.',
    'item.medium.name': 'Średnia', 'item.medium.notes': 'Dzierżona w jednej łapce zadaje k6 obrażeń. W obu – k8.',
    'item.heavy.name': 'Ciężka',
    'item.lightRanged.name': 'Lekka dystansowa',
    'item.heavyRanged.name': 'Ciężka dystansowa',
    'item.slingBullets.name': 'Pociski, torba',
    'item.arrows.name': 'Strzały, kołczan',
    'item.lightArmour.name': 'Lekka zbroja', 'item.lightArmour.notes': 'Zmniejsza obrażenia o 1',
    'item.heavyArmour.name': 'Ciężka zbroja', 'item.heavyArmour.notes': 'Zmniejsza obrażenia o 1',
    'item.torch.name': 'Pochodnia', 'item.torch.notes': 'Zakreśl zużycie co 6 turę.',
    'item.lantern.name': 'Latarnia', 'item.lantern.notes': 'Zakreśl zużycie co 6 turę.',
    'item.eLantern.name': 'Latarnia elektryczna', 'item.eLantern.notes': 'Zakreśl zużycie co 6 turę.',
    'item.rations.name': 'Prowiant',
    'item.coinPurse.name': 'Sakiewka', 'item.coinPurse.notes': 'Mieści 250 pestek',
    'item.fireball.name': 'Kula ognia', 'item.fireball.notes': 'Kamień zaklęć',

    'cond.exhausted.name': 'Wyczerpana', 'cond.exhausted.notes': '', 'cond.exhausted.clear': 'Usunięcie: Długi odpoczynek',
    'cond.frightened.name': 'Przerażona', 'cond.frightened.notes': 'Zdaj test SW, aby stawić czoła lękowi', 'cond.frightened.clear': 'Usunięcie: Krótki odpoczynek',
    'cond.hungry.name': 'Głodna', 'cond.hungry.notes': '', 'cond.hungry.clear': 'Usunięcie: Spożycie posiłku',
    'cond.wounded.name': 'Ranna', 'cond.wounded.notes': 'Utrudnienie w testach SF i ZR', 'cond.wounded.clear': 'Usunięcie: Pełny odpoczynek',
    'cond.insane.name': 'Niepoczytalna', 'cond.insane.notes': 'Utrudnienie w testach SW', 'cond.insane.clear': 'Usunięcie: Pełny odpoczynek',
  },

};
