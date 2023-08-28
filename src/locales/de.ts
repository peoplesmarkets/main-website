import { TKEYS } from "./dev";
import { EN } from "./en";

export const DE: typeof TKEYS = {
  "Peoples-Markets": EN["Peoples-Markets"],
  peoplesmarkets_com: EN.peoplesmarkets_com,
  fetching: {
    "content-loading": "Wird geladen ...",
    "content-error": "Unerwarteter Fehler",
  },
  common: {
    file: "Datei",
  },
  form: {
    action: {
      Add: "Hinzufügen",
      OK: "Okay",
      Save: "Speichern",
      Edit: "Bearbeiten",
      Delete: "Löschen",
      Cancel: "Abbrechen",
      Discard: "Verwerfen",
      "Are-you-sure-you-want-to-delete-the":
        '{{item}} namens "{{name}}" wirklich löschen?',
      "Confirm-Deletion?": "Wirklich löschen?",
    },
    "danger-zone": "Gefahrenzone",
    errors: {
      Conflict: "Konflikt",
      "required-field": "Eingabe erforderlich",
      "not-modified": "Kein Änderrung",
      "already-exists": "Bereits vergeben",
      "item-too-large": "{{item}} ist zu groß",
      "wrong-type": "Falscher Dateityp",
    },
  },
  "market-booth": {
    title: "Marktstand",
    "title-plural": "Marktstände",
    "no-description": "Keine Beschreibung vorhanden ...",
    "edit-image": "Bild bearbeiten",
    "delete-image": "Bild löschen",
    "delete-confirmation-message": "Derzeitiges Bild wirklich löschen",
    errors: {
      "ensure-offers-deleted": "Lösche zuerst alle Angebote.",
    },
    labels: {
      Details: "Details",
      Name: "Name",
      name: "Name",
      Description: "Beschreibung",
      description: "Beschreibung",
      "Created-at": "Erstellt am",
      "Updated-at": "Bearbeitet am",
    },
  },
  offer: {
    title: "Angebot",
    "title-plural": "Angebote",
    "no-offers-yet": "Derzeit noch keine Angebote ...",
    "no-description": "Keine Beschreibung vorhanden ...",
    labels: {
      Name: "Name",
      name: "Name",
      Description: "Beschreibung",
      description: "Beschreibung",
      "Created-at": "Erstellt am",
      "Updated-at": "Bearbeitet am",
    },
  },
  "market-booths-search": {
    title: "Finde einen Marktstand",
  },
  "offers-search": {
    title: "Durchsuche alle Angebote",
  },
  dashboard: {
    "market-booth": {
      Details: "Marktstand Details",
      "current-market-booth": "Marktstand Auswahl",
      "no-market-booth-yet": "Bisher kein Markstand",
      "create-new-market-booth": "Neuen Marktstand erstellen",
      "edit-market-booth-details": "Marktstand Details bearbeiten",
      "delete-this-market-booth": "Diesen Marktstand löschen",
      "add-or-update-image": "Bild hinzufügen, oder bearbeiten",
    },
    offers: {
      Details: "Angebot Details",
      "title-plural": "Angebote",
      "create-new-offer": "Neues Angebot erstellen",
      "edit-offer": "Angebot bearbeiten",
      "delete-this-offer": "Dieses Angebot löschen",
    },
  },
  "main-navigation": {
    actions: {
      "sign-in": "Login",
    },
    links: {
      "market-booths": "Marktstände",
      offers: "Angebote",
      dashboard: EN["main-navigation"].links.dashboard,
      "user-settings": "Benutzereinstellungen",
      community: EN["main-navigation"].links.community,
    },
    settings: {
      "switch-to-light-mode": "Hellmodus aktivieren",
      "switch-to-dark-mode": "Dunkelmodus aktivieren",
      "change-language": "Language / Sprache",
    },
  },
  "user-settings-page": {
    title: "Benutzereinstellungen",
  },
  "community-page": {
    headline: "Hilf dem Projekt zu wachsen!",
    description:
      '## Es ist geplant, dass das der Ort sein wird, an dem sich jeder am Projekt beteiligen kann. Momentan nutze bitte die "[Issues](https://github.com/peoplesmarkets/Project/issues)" auf GitHub, um dein Feedback und Kritik abzugeben.',
    posts: {
      title: EN["community-page"].posts.title,
      "presentation-is-inspired-by":
        "Die Darstellungsweise der Posts ist stark inspiriert von",
      medium: EN["community-page"].posts.medium,
    },
  },
  "landing-page": {
    "get-started": "Los geht's",
    "GET-STARTED": "LOS GEHT'S",
    "establish-your-online-appearance": "Erstell dir deine Online-Präsenz",
    "create-your-online-market-booth-and-build-your-brand":
      "Baue deine Marke mit einem Online-Marktstand auf",
    "offer-your-goods-to-the-people": "Biete den Menschen deine Waren an",
    "no-costs-until-you-sell": "Keine Kosten bis zum Verkauf",
    "no-strings-attached": "Keine Verbindlichkeiten",
  },
  imprint: {
    title: "Impressum",
    responsible: {
      title: "Derzeit verantwortlich",
      name: EN.imprint.responsible.name,
      street: EN.imprint.responsible.street,
      address_line_1: "81371 München",
      address_line_2: "Deutschland",
    },
  },
  "privacy-policy": {
    title: "Datenschutzrichtlinie",
  },
  "terms-of-service": {
    title: "AGB",
  },
  "page-not-found": {
    title: "404 Seite nicht gefunden",
    "back-to-home": "Zurück zur Startseite",
  },
  footer: {
    "main-paragraph":
      "People's Markets ist eine online Platform auf der Menschen ihre Waren anbieten und ihren Online-Auftritt ausbauen können.",
    "community-paragraph": "Gestalte jeden Aspekt des Projekts mit.",
  },
};
