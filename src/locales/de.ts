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
import { TKEYS } from "./keys";
import { EN } from "./en";
import { ReportType } from "../services/peoplesmarkets/report/v1/report";

export const DE: typeof TKEYS = {
  lang: "de",
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
    cancel: "kündigen",
    resume: "fortsetzen",
    any: "Alle",
  },
  form: {
    action: {
      "Create-new": "Erstellen",
      Add: "Hinzufügen",
      OK: "Okay",
      Save: "Speichern",
      Send: "Senden",
      Edit: "Bearbeiten",
      Delete: "Löschen",
      Cancel: "Abbrechen",
      Discard: "Verwerfen",
      Subscribe: "Abonnieren",
      Remove: "Löschen",
      Enable: "Aktivieren",
      Disable: "Deaktivieren",
      Publish: "Veröffentlichen",
      Hide: "Verbergen",
      Accept: "Akzeptieren",
      Buy: "Kaufen",
      "Are-you-sure-you-want-to-delete-the-item":
        '{item} namens "{name}" wirklich löschen?',
      "Confirm-Deletion?": "Wirklich löschen?",
      "Discard-unsafed-changes": "Nicht gespeicherte Änderungen verwerfen?",
      "Confirm-Cancellation": "Wirklich kündigen?",
    },
    "critical-settings": "Kritische Einstellungen",
    errors: {
      Conflict: "Konflikt",
      "required-field": "Eingabe erforderlich",
      "not-modified": "Kein Änderrung",
      "already-exists": "Bereits vergeben",
      "already-used": "Bereits verwendet",
      "item-too-large": "{item} ist zu groß",
      "item-too-large-size": "{item} ist zu groß. maximum: {maxSize}",
      "wrong-type": "Falscher Dateityp. Derzeit unterstützt: {types}",
      "invalid-css-color": "Ungültige CSS Farbe",
      remove: "Lösche: {item}",
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
  pagination: {
    previous: "vorherige",
    next: "nächste",
  },
  price: {
    Price: "Preis",
    "decimal-point": ",",
    "billing-period": "Abrechnungszeitraum",
    "add-trial-period": "Testzeit hinzufügen",
    "trial-period": "Testzeit",
    "days-free": "{periodDays, plural, =1 {Tag} other {Tage}} kostenlos",
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
  shop: {
    title: "Shop",
    "title-plural": "Shops",
    "no-description": "Keine Beschreibung vorhanden ...",
    settings: {
      title: "Einstellungen",
    },
    errors: {
      "ensure-offers-deleted": "Lösche zuerst alle Angebote.",
      "invalid-url": "Ungültige URL",
    },
    labels: {
      Details: "Details",
      Name: "Name",
      name: "Name",
      Slug: "Pfad",
      slug: "Pfad",
      Description: "Beschreibung",
      description: "Beschreibung",
      "Name-and-Description": "Name und Beschreibung",
      Image: "Bild",
      Logo: "Logo",
      Theme: "Erscheinungsbild",
      Path: "URL-Pfad",
      Domain: EN["shop"].labels.Domain,
      domain: EN["shop"].labels.domain,
      "is-publicly-visible": "Dieser Shop ist öffentlich sichtbar",
      "contact-email-address": "Kontakt E-Mail",
      "Created-at": "Erstellt am",
      "Updated-at": "Bearbeitet am",
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
    "sign-in-to-subscribe": "Anmelden",
    "contact-shop": "Shop kontaktieren",
    "other-offers": "Weitere Angebote",
    "downloadable-content": "downloadbarer Inhalt",
    visibility: {
      title: "Sichtbarkeit",
      visible: "Öffentlich sichtbar",
      "not-visible": "Nicht öffentlich sichtbar",
    },
    labels: {
      Price: "Preis",
      Name: "Name",
      name: "Name",
      Description: "Beschreibung",
      description: "Beschreibung",
      "Created-at": "Erstellt am",
      "Updated-at": "Bearbeitet am",
      "is-publicly-visible": "Dieses Angebot ist öffentlich sichtbar",
      "show-on-home-page": "Dieses Angebot auf der Hauptseite anzeigen",
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
    Inventory: "Inventory",
    "download-all": "Alles herunterladen",
    errors: {
      "still-part-of-an-offer": "Die Datei ist noch in Angeboten enhalten",
    },
    labels: {
      name: "Name",
      file: "Datei",
    },
  },
  subscription: {
    Title: "Abo",
    "Title-plural": "Abos",
    "My-Subscriptions": "Meine Abonnements",
    "subscription-to": "Abo für",
    "already-subscribed": "Bereits abonniert",
    "payed-until": "Bezahlt bis",
    "cancel-subscription": "Abonnement kündigen",
    "included-files": "Enhaltene Dateien",
    "subscription-configuration": "Abonnement Einstellungen",
    resume: "Abonnement fortsetzen",
    "canceled-at": "Gekündigt am",
    "no-subscriptions-yet": "Bisher keine Abonnements ...",
  },
  image: {
    "delete-confirmation-message": "Dieses Bild wirklich löschen?",
  },
  report: {
    title: "Feedback geben",
    "link-information":
      "Dein Feedback wurde als Issue in GitHub angelegt. Unter dem folgenden Link kannst du den Status einsehen.",
    labels: {
      type: "Typ",
      title: "Titel",
      content: "Nachricht",
    },
    types: {
      [ReportType.REPORT_TYPE_BUG]: "Fehlermeldung",
      [ReportType.REPORT_TYPE_FEATURE_REQUEST]: "Featureanfrage",
      [ReportType.REPORT_TYPE_QUESTION]: "Frage",
    },
  },
  dashboard: {
    shop: {
      Details: "Details",
      "my-shops": "Meine Shops",
      "no-shop-yet": "Bisher keinen Shop erstellt",
      "create-new-shop": "Neuen Shop erstellen",
      "edit-name-and-description": "Name und Beschreibung bearbeiten",
      "edit-contact-email": "Kontakt E-Mail bearbeiten",
      "public-visibility": "Öffentliche Sichtbarkeit",
      "publish-notification-title": "Shop veröffentlichen?",
      "publish-notification-message": "Mit der Veröffentlichung des Shops ...",
      "unpublish-notification-title": "Shop verbergen?",
      "unpublish-notification-message": "Mit dem Verbergen des Shops ...",
      "edit-image": "Bild bearbeiten",
      "delete-image": "Bild löschen",
      "logo-image": "Bild",
      "edit-logo": "Logo bearbeiten",
      "delete-logo": "Logo löschen",
      "edit-theme": "Erscheinungsbild anpassen",
      "edit-path": "URL-Pfad einstellen",
      "edit-domain": "Domain einstellen",
      "delete-this-shop": "Diesen Shop löschen",
      "resulting-url": "Resultierende URL",
      image: {
        label: "Bild",
        "for-dark-theme": "Für Dunkelmodus",
        "use-same-for-dark-mode": "Selbes Bild für Dunkelmodus verwenden",
        "show-in-listings": "In Listen anzeigen",
        "show-on-home": "Auf der Hauptseite anzeigen",
      },
      domain: {
        pending: "Wird verifiziert",
        "pending-information":
          "Bitte konfiguriere den folgenden DNS CNAME Eintrag für die angegebene Domain:",
        "pending-information-sample":
          "{item}. CNAME mysite.peoplesmarkets.com.",
        active: "Verifiziert",
      },
      stripe: {
        title: EN.dashboard["shop"].stripe.title,
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
      "public-visibility": "Öffentliche Sichtbarkeit",
      "publish-notification-title": "Angebot veröffentlichen?",
      "publish-notification-message":
        "Mit der Veröffentlichung des Angebots ...",
      "unpublish-notification-title": "Angebot verbergen?",
      "unpublish-notification-message": "Mit dem Verbergen des Angebots ...",
    },
    "shipping-rate": {
      "add-shipping-rate": "Versandkosten hinzufügen",
      "shipping-rates": "Versandkosten",
      "no-shipping-rates-yet": "Bisher keine Versandkosten ...",
      country: "Land",
      "to-all-countries": "In alle Länder",
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
      shops: "Shops",
      offers: "Angebote",
      dashboard: EN["main-navigation"].links.dashboard,
      "user-settings": "Benutzereinstellungen",
      community: EN["main-navigation"].links.community,
      "get-started": "Get started",
    },
    settings: {
      Title: "Einstellungen",
      "switch-to-light-mode": "Hellmodus aktivieren",
      "switch-to-dark-mode": "Dunkelmodus aktivieren",
      "change-language": "Sprache / Language",
      report: EN["main-navigation"].settings.report,
    },
  },
  "shops-search": {
    title: "Suche Shops",
  },
  "offers-search": {
    title: "Suche Angebote",
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
    REGISTER: "JETZT REGISTRIEREN",
    "establish-your-online-appearance": "Erstelle dir eine Online-Präsenz",
    "create-your-online-shop-and-build-your-brand":
      "Baue deine Marke mit einem Online-Shop auf",
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
