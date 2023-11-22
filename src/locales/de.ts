import { OfferType } from "../services/peoplesmarkets/commerce/v1/offer";
import {
  PriceType,
  RecurringInterval,
  priceTypeToJSON,
  recurringIntervalToJSON,
} from "../services/peoplesmarkets/commerce/v1/price";
import { ReportType } from "../services/peoplesmarkets/report/v1/report";
import { EN } from "./en";
import { TKEYS } from "./keys";

export const DE: typeof TKEYS = {
  lang: "de",
  "Peoples-Markets": EN["Peoples-Markets"],
  peoplesmarkets_com: EN.peoplesmarkets_com,
  peoplesmarkets_main_link: EN.peoplesmarkets_main_link,
  "powered-by-peoplesmarkets": EN["powered-by-peoplesmarkets"],
  fetching: {
    "content-loading": "Wird geladen ...",
    "content-error": "Unerwarteter Fehler",
  },
  common: {
    by: "Von",
    or: "oder",
    more: "mehr",
    file: "Datei",
    per: "pro",
    every: "alle",
    "per-or-every": "{count, plural, =1 {pro} other {alle} }",
    cancel: "Kündigen",
    resume: "Fortsetzen",
    any: "Alle",
    Preview: "Vorschau",
    reload: "Neu laden",
    public: "öffentlich",
    hidden: "verborgen",
  },
  form: {
    action: {
      "Create-new": "Erstellen",
      Add: "Hinzufügen",
      OK: "Okay",
      Next: "Weiter",
      Back: "Zurück",
      Previous: "Vorherige",
      Save: "Speichern",
      "Save-and-continue": "Speichern und weiter",
      Done: "Speichern",
      Send: "Senden",
      Edit: "Bearbeiten",
      Delete: "Löschen",
      Cancel: "Abbrechen",
      Close: "Schließen",
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
      "quota-exceeded": "Datenkontingent überschritten",
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
  navigation: {
    redirecting: "Redirecting",
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
    configuration: {
      title: "Konfiguration",
      info: "Bearbeite den Namen, die Beschreibung und das Aussehen deines Shops.",
      Details: "Details",
      Payment: "Bezahlung",
      Appearance: "Erscheinungsbild",
      Settings: "Einstellungen",
    },
    settings: {
      title: "Einstellungen",
    },
    errors: {
      "conflict-on-delete":
        "Bitte vergewissere dich, dass alle Angebote und Domains gelöscht sind.",
      "invalid-url": "Ungültige URL",
    },
    labels: {
      Details: "Details",
      Name: "Name",
      name: "Name",
      Slug: "URL-Pfad",
      slug: "URL-Pfad",
      Description: "Beschreibung",
      description: "Beschreibung",
      "Name-and-Description": "Name und Beschreibung",
      Image: "Banner Bild",
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
    "sign-in-to-subscribe": "Anmelden und abonnieren",
    "contact-shop": "Shop kontaktieren",
    "other-offers": "Weitere Angebote",
    "downloadable-content": "Downloadbarer Inhalt",
    "downloadable-content-info":
      "Melde dich an, um das Angebot zu abonnieren und anschließend auf die enthaltenen Dateien zuzugreifen.",
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
      [OfferType.OFFER_TYPE_PHYSICAL]: `Gegenstand`,
      [OfferType.OFFER_TYPE_DIGITAL]: `Digital`,
      [OfferType.OFFER_TYPE_SERVICE]: `Dienstleistung`,
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
  report: {
    label: "Meldung / Feedback",
    title: "Fehler melden / Feedback geben",
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
      "no-shop-yet": "Bisher keinen Shop erstellt ...",
      "create-new-shop": "Neuen Shop erstellen",
      "name-your-shop": "Gib deinem Shop einen Namen.",
      "edit-name-and-description": "Name und Beschreibung bearbeiten",
      "edit-contact-email": "Kontakt E-Mail bearbeiten",
      "edit-image": "Bild bearbeiten",
      "delete-image": "Bild löschen",
      "logo-image": "Bild",
      "edit-logo": "Logo bearbeiten",
      "delete-logo": "Logo löschen",
      "edit-theme": "Erscheinungsbild anpassen",
      "configure-shop": "Shop konfigurieren",
      "delete-this-shop": "Diesen Shop löschen",
      "delete-shop-info":
        "Bist du dir sicher, dass du den Shop löschen möchtest? Die Daten sind nicht widerherstellbar.",
      "resulting-url": "Resultierende URL",
      "duplicate-slug-error":
        "Der automatisch generierte URL-Pfad ist bereits vergeben.",
      "empty-offers-warning-title": "Keine Angebote vorhanden",
      "empty-offers-warning-content":
        "Derzeit bietet dein Shop noch keine Angebote an. Wenn du fortfährst wird dein Shop leer sein.",
      logo: {
        "preview-info": "Vorschau der Navigationsleiste deines Shops",
        "delete-confirmation-message": "Dieses Logo wirklich löschen?",
        "logo-info":
          "Lade ein Bild hoch, das in der Navigationsleiste verwendet wird. Wenn kein Bild vorhanden ist, verwenden wir einfach den Namen deines Shops.",
      },
      image: {
        label: "Bild",
        "for-dark-theme": "Für Dunkelmodus",
        "use-same-for-dark-mode": "Selbes Bild für Dunkelmodus verwenden",
        "show-on-home": "Banner auf der Hauptseite anzeigen",
        "show-in-listings": "Banner in Suchergebnissen anzeigen",
        "preview-home-info": "Vorschau der Hauptseite deines Shops",
        "preview-listing-info": "Vorschau deines Shops in Suchergebnissen",
        "delete-confirmation-message": "Dieses Bild wirklich löschen?",
      },
      stripe: {
        title: EN.dashboard["shop"].stripe.title,
        url: "https://stripe.com/de",
        integration: "Stripe Integration",
        "integration-info-left": "Registriere dich bei",
        "integration-info-right":
          ", um viele gängige Online-Zahlungsmethoden einzurichten.",
        "start-integration": "Starte mit",
        "continue-integration": "Fortsetzen mit",
        "remove-integration": "Stripe Einrichtung aufheben",
        connected: "Stripe Account ist verbunden",
      },
      contact: {
        info: "Wenn du keine Online-Zahlungsmethode verwendest, gib hier eine E-Mail-Adresse an, unter der deine Kunden dich erreichen können.",
      },
      visibility: {
        Title: "Öffentliche Sichtbarkeit",
        Info: "Du kannst jederzeit die öffentliche Sichtbarkeit deines Shops einstellen. Wenn du die Sichtbarkeit veränderst, wird auch die Sichtbarkeit aller Angebote angepasst.",
        "not-published-yet-info":
          "Dein Shop ist derzeit nicht öffentlich sichtbar.",
        "hide-this-shop": "Shop verbergen",
        "publish-shop": "Shop veröffentlichen",
        "publish-notification-title": "Shop veröffentlichen?",
        "publish-notification-message-left":
          "Um den Shop zu veröffenlichen, bitte lies und akzeptiere die Allgemeinen Geschäftsbedingungen",
        "publish-notification-message-right": "",
        "publish-anyway": "Trotzdem veröffentlichen",
        "unpublish-notification-title": "Shop verbergen?",
        "unpublish-notification-message":
          "Mit Verbergen des Shops, werden auch alle Angebote verborgen.",
      },
      settings: {
        Title: "Einstellungen",
      },
      path: {
        "edit-path": "URL-Pfad anpassen",
        "edit-path-info":
          "Wenn du keine eigene Domain verwendest, kannst du hier den Pfad zu deinem Shop anpassen.",
      },
      domain: {
        "edit-domain": "Domain einstellen",
        "edit-domain-info":
          "Du kannst deine eigene Domain verwenden, unter der dein Shop erreichbar ist. Nach dem Speichern muss ein DNS-CNAME-Eintrag für die Domain eingerichtet werden, der auf mysite.peoplesmarkets.com zeigt. Anschließend werden wir die Einrichtung abschließen.",
        pending: "Wird eingerichtet",
        "pending-information":
          "Bitte konfiguriere den folgenden DNS CNAME Eintrag für die angegebene Domain:",
        "pending-information-sample":
          "{item}. CNAME mysite.peoplesmarkets.com.",
        active: "Verifiziert",
      },
    },
    offers: {
      Details: "Details",
      "My-Offers": "Meine Angebote",
      "title-plural": "Angebote",
      "create-new-offer": "Neues Angebot erstellen",
      "name-your-offer": "Gib dem Angebot einen Namen",
      "create-your-first-offer": "Erstelle dein erstes Angebot",
      "edit-offer": "Angebot bearbeiten",
      "delete-this-offer": "Dieses Angebot löschen",
      "add-image": "Bild hinzufügen",
      "edit-price": "Preis bearbeiten",
      "public-visibility": "Öffentliche Sichtbarkeit",
      "publish-notification-title": "Angebot veröffentlichen?",
      "publish-notification-message": "",
      "shop-not-public-title": "Dein shop ist noch nicht veröffentlicht",
      "shop-not-public-message":
        "Dein Shop mit diesem Angebot ist noch nicht öffentlich sichtbar. Du kannst das Angebot trotzdem veröffentlichen, dein Shop ist jedoch noch nicht erreichbar.",
      "go-to-shop-settings": "Shop Einstellungen",
      "unpublish-notification-title": "Angebot verbergen?",
      "unpublish-notification-message": "",
      "no-offers-yet": "Bisher keine Angebote erstellt ...",
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
      "create-shop": "Erstelle deinen Shop!",
      "sign-in": "Login",
      "sign-out": "Logout",
    },
    links: {
      home: EN["main-navigation"].links.home,
      "My-Shop": "Mein Shop",
      shops: "Shops",
      offers: "Angebote",
      "My-Offers": "Meine Angebote",
      dashboard: EN["main-navigation"].links.dashboard,
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
  user: {
    authenticating: "Authentifizierung",
    settings: {
      title: "Benutzereinstellungen",
    },
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
    "Sign-In": "Anmelden",
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
    "accept-tos": "AGB akzeptieren",
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
