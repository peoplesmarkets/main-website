import {
  OfferType,
  offerTypeToJSON,
} from "../services/peoplesmarkets/commerce/v1/offer";
import {
  PriceType,
  RecurringInterval,
  priceTypeToJSON,
  recurringIntervalToJSON,
} from "../services/peoplesmarkets/commerce/v1/price";
import { TKEYS } from "./dev";
import { EN } from "./en";

export const DE: typeof TKEYS = {
  "Peoples-Markets": EN["Peoples-Markets"],
  peoplesmarkets_com: EN.peoplesmarkets_com,
  peoplesmarkets_main_link: EN.peoplesmarkets_main_link,
  fetching: {
    "content-loading": "Wird geladen ...",
    "content-error": "Unerwarteter Fehler",
  },
  common: {
    by: "Von",
    more: "mehr",
    file: "Datei",
    per: "pro",
    every: "alle",
    "per-or-every": "{count, plural, =1 {pro} other {alle} }",
  },
  form: {
    action: {
      "Create-new": "Erstellen",
      Add: "Hinzufügen",
      OK: "Okay",
      Save: "Speichern",
      Edit: "Bearbeiten",
      Delete: "Löschen",
      Cancel: "Abbrechen",
      Discard: "Verwerfen",
      Buy: "Kaufen",
      Subscribe: "Abonnieren",
      "Are-you-sure-you-want-to-delete-the-item":
        '{item} namens "{name}" wirklich löschen?',
      "Confirm-Deletion?": "Wirklich löschen?",
    },
    "danger-zone": "Gefahrenzone",
    errors: {
      Conflict: "Konflikt",
      "required-field": "Eingabe erforderlich",
      "not-modified": "Kein Änderrung",
      "already-exists": "Bereits vergeben",
      "item-too-large": "{item} ist zu groß",
      "wrong-type": "Falscher Dateityp",
      "invalid-css-color": "Ungültige CSS Farbe",
    },
  },
  query: {
    "order-by": {
      "created-at": {
        title: "Erstellt am",
        "newest-first": "Neueste zuerst",
        "oldest-first": "Älteste zuerst",
      },
      "updated-at": {
        title: "Zuletzt bearbeitet",
        "newest-first": "Neueste zuerst",
        "oldest-first": "Älteste zuerst",
      },
      random: {
        title: "Zufällig",
      },
    },
  },
  price: {
    Price: "Preis",
    "decimal-point": ",",
    "billing-period": "Abrechnungszeitraum",
    currency: {
      ...EN.price.currency,
      title: "Währung",
    },
    "price-type": {
      title: "Typ",
      [priceTypeToJSON(PriceType.PRICE_TYPE_ONE_TIME)]: "Einmalig",
      [priceTypeToJSON(PriceType.PRICE_TYPE_RECURRING)]: "Wiederkehrend",
    },
    "recurring-interval": {
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_DAY
      )]: `{intervalCount, plural, =1 {Tag} other {Tage} }`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_WEEK
      )]: `{intervalCount, plural, =1 {Woche} other {Wochen} }`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_MONTH
      )]: `{intervalCount, plural, =1 {Monat} other {Monate} }`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_YEAR
      )]: `{intervalCount, plural, =1 {Jahr} other {Jahre} }`,
    },
  },
  "market-booth": {
    title: "Marktstand",
    "title-plural": "Marktstände",
    "no-description": "Keine Beschreibung vorhanden ...",
    settings: {
      title: "Einstellungen",
    },
    errors: {
      "ensure-offers-deleted": "Lösche zuerst alle Angebote.",
    },
    labels: {
      Details: "Details",
      Name: "Name",
      name: "Name",
      Slug: "Pfad",
      slug: "Pfad",
      Description: "Beschreibung",
      description: "Beschreibung",
      "Created-at": "Erstellt am",
      "Updated-at": "Bearbeitet am",
      Domain: EN["market-booth"].labels.Domain,
      domain: EN["market-booth"].labels.domain,
    },
  },
  "shop-customization": {
    labels: {
      headerBackgroundColorLight: "Header Hintergrundfarbe (Hellmodus)",
      headerBackgroundColorDark: "Header Hintergrundfarbe (Dunkelmodus)",
      headerContentColorLight: "Header Farbe (Hellmodus)",
      headerContentColorDark: "Header Farbe (Dunkelmodus)",
      secondaryBackgroundColorLight: "Sekundär Hintergrundfarbe (Hellmodus)",
      secondaryBackgroundColorDark: "Sekundär Hintergrundfarbe (Dunkelmodus)",
      secondaryContentColorLight: "Sekundär Farbe (Hellmodus)",
      secondaryContentColorDark: "Sekundär Farbe (Dunkelmodus)",
    },
  },
  offer: {
    title: "Angebot",
    "title-plural": "Angebote",
    "no-offers-yet": "Derzeit noch keine Angebote ...",
    "no-description": "Keine Beschreibung vorhanden ...",
    "currently-not-available": "Derzeit nicht verfügbar",
    "sign-in-to-subscribe": "Anmelden um zu abonnieren",
    "other-offers": "Weitere Angebote",
    "downloadable-content": "downloadbarer Inhalt",
    visibility: {
      title: "Sichtbarkeit",
      visible: "Öffentlich sichtbar",
      "not-visible": "Nicht öffentlich sichtbar",
    },
    "is-featured": {
      title: "Featured",
      featured: "Featured",
      "not-featured": "Nicht featured",
    },
    labels: {
      Price: "Preis",
      Name: "Name",
      name: "Name",
      Description: "Beschreibung",
      description: "Beschreibung",
      "Created-at": "Erstellt am",
      "Updated-at": "Bearbeitet am",
    },
    types: {
      [offerTypeToJSON(OfferType.OFFER_TYPE_PHYSICAL)]: `Gegenstand`,
      [offerTypeToJSON(OfferType.OFFER_TYPE_DIGITAL)]: `Digital`,
      [offerTypeToJSON(OfferType.OFFER_TYPE_SERVICE)]: `Dienstleistung`,
    },
  },
  media: {
    Title: "Datei",
    "Title-plural": "Dateien",
    Download: "Download",
    "Download-now": "Jetzt herrunterladen",
    "download-file": 'Datei "{item}" herunterladen',
    errors: {
      "still-part-of-an-offer": "Die Datei ist noch in Angeboten enhalten",
    },
    labels: {
      name: "Name",
      file: "Datei",
    },
  },
  image: {
    "delete-confirmation-message": "Dieses Bild wirklich löschen?",
  },
  "market-booths-search": {
    title: "Finde einen Marktstand",
  },
  "offers-search": {
    title: "Durchsuche alle Angebote",
  },
  dashboard: {
    "market-booth": {
      Details: "Details",
      "my-market-booths": "Meine Marktstände",
      "no-market-booth-yet": "Bisher kein Markstand",
      "create-new-market-booth": "Neuen Marktstand erstellen",
      "edit-name-and-description": "Name und Beschreibung bearbeiten",
      "edit-image": "Bild bearbeiten",
      "delete-image": "Bild löschen",
      "edit-logo": "Logo bearbeiten",
      "delete-logo": "Logo löschen",
      "edit-theme": "Erscheinungsbild anpassen",
      "edit-path": "URL-Pfad einstellen",
      "edit-domain": "Domain einstellen",
      "delete-this-market-booth": "Diesen Marktstand löschen",
      "resulting-url": "Resultierende URL",
      image: {
        "for-light-theme": "Für Hellmodus",
        "for-dark-theme": "Für Dunkelmodus",
        "show-in-listings": "In Listen anzeigen",
        "show-on-home": "Auf der Hauptseite anzeigen",
      },
      domain: {
        pending: "Wird verifiziert",
        active: "Verifiziert",
      },
      stripe: {
        title: EN.dashboard["market-booth"].stripe.title,
        integration: "Stripe Integration",
        "start-integration": "Stripe einrichten",
        "continue-integration": "Stripe Einrichtung fortsetzen",
        "remove-integration": "Stripe Einrichtung aufheben",
      },
    },
    offers: {
      Details: "Details",
      "title-plural": "Angebote",
      "create-new-offer": "Neues Angebot erstellen",
      "edit-offer": "Angebot bearbeiten",
      "delete-this-offer": "Dieses Angebot löschen",
      "add-image": "Bild hinzufügen",
      "edit-price": "Preis bearbeiten",
    },
    media: {
      "my-media": "Meine Dateien",
      "create-new-file": "Neue Datei hochladen",
      "edit-file": "Datei bearbeiten",
    },
  },
  "main-navigation": {
    actions: {
      "sign-in": "Login",
      "sign-out": "Logout",
    },
    links: {
      home: EN["main-navigation"].links.home,
      "market-booths": "Marktstände",
      offers: "Angebote",
      dashboard: EN["main-navigation"].links.dashboard,
      "user-settings": "Benutzereinstellungen",
      community: EN["main-navigation"].links.community,
    },
    settings: {
      "switch-to-light-mode": "Hellmodus aktivieren",
      "switch-to-dark-mode": "Dunkelmodus aktivieren",
      "change-language": "Sprache / Language",
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
    Support: "Support",
    "support-email": EN.imprint["support-email"],
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
  "environment-banner": {
    title: "Testumgebung",
    description:
      "Dies ist eine Testumgebung rein für Entwicklungszwecke. Die Hauptseite findest du hier: ",
  },
  footer: {
    "powered-by": EN.footer["powered-by"],
    "main-paragraph":
      "People's Markets ist eine online Platform auf der Menschen ihre Waren anbieten und ihren Online-Auftritt ausbauen können.",
    "community-paragraph": "Gestalte jeden Aspekt des Projekts mit.",
  },
};
