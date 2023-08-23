import { TKEYS } from "./dev";
import { EN } from "./en";

export const DE: typeof TKEYS = {
  "Peoples-Markets": EN["Peoples-Markets"],
  "Peoples-Markets-community": EN["Peoples-Markets-community"],
  peoplesmarkets_com: EN.peoplesmarkets_com,
  form: {
    action: {
      Save: "Speichern",
      Edit: "Bearbeiten",
      Delete: "Löschen",
      Cancel: "Abbrechen",
      Discard: "Verwerfen",
      "Are-you-sure-you-want-to-delete-the":
        '{{item}} namens "{{name}}" wirklich löschen?',
      "Confirm-Deletion?": "Wirklich löschen?",
    },
    errors: {
      "required-field": "Eingabe erforderlich",
      "not-modified": "Kein Änderrung",
    },
  },
  "main-navigation": {
    actions: {
      "sign-in": "Login",
    },
    links: {
      home: "Hauptseite",
      dashboard: EN["main-navigation"].links.dashboard,
      "user-settings": "Benutzereinstellungen",
      community: "Community",
    },
    settings: {
      "switch-to-light-mode": "Hellmodus aktivieren",
      "switch-to-dark-mode": "Dunkelmodus aktivieren",
      "change-language": "Language / Sprache",
    },
  },
  footer: {
    "main-paragraph":
      "People's Markets ist eine online Platform auf der Menschen ihre Waren anbieten und ihren Online-Auftritt ausbauen können.",
    "community-paragraph": "Gestalte jeden Aspekt des Projectes mit.",
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
  "landing-page": {
    "establish-your-online-appearance": "Erstelle deinen Online-Auftritt",
    "create-your-online-market-booth-and-build-your-brand":
      "Baue deine Marke mit einem Online-Marktstand auf",
    "offer-your-goods-to-the-people": "Biete den Menschen deine Waren an",
    "no-costs-until-you-sell": "Keine Kosten bis zum Verkauf",
    "no-strings-attached": "Keine Verbindlichkeiten",
    "GET-STARTED": "LOS GEHT'S",
  },
  dashboard: {
    "create-a-new-market-booth": "Neuen Marktstand erstellen",
    "current-market-booth": "Marktstand Auswahl",
    Details: "Details",
    "created-at": "erstellt am",
    "updated-at": "bearbeitet am",
    Description: "Beschreibung",
    "no-market-booth-description": "Keine Beschreibung vorhanden ...",
    "edit-market-booth-details": "Marktstand Details Bearbeiten",
    "danger-zone": "Gefahrenzone",
    "delete-this-market-booth": "Diesen Marktstand Löschen",
    "market-booth": "Marktstand",
  },
  "user-settings-page": {
    title: "Benutzereinstellungen",
    "market-booth": {
      "current-market-booth": "Marktstand Auswahl",
      "no-market-booth-yet": "Bisher kein Markstand",
    },
  },
  "community-page": {
    posts: {
      title: EN["community-page"].posts.title,
      "presentation-is-inspired-by":
        "Die Darstellungsweise der Posts ist stark inspiriert von",
      medium: EN["community-page"].posts.medium,
    },
  },
};
