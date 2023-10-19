import {
  OfferType,
  offerTypeToJSON,
} from "../services/peoplesmarkets/commerce/v1/offer";
import {
  Currency,
  PriceType,
  RecurringInterval,
  currencyToJSON,
  priceTypeToJSON,
  recurringIntervalToJSON,
} from "../services/peoplesmarkets/commerce/v1/price";
import { ReportType } from "../services/peoplesmarkets/report/v1/report";
import { TKEYS } from "./keys";

export const EN: typeof TKEYS = {
  lang: "en",
  "Peoples-Markets": "People's Markets",
  peoplesmarkets_com: "peoplesmarkets.com",
  peoplesmarkets_main_link: "https://peoplesmarkets.com",
  fetching: {
    "content-loading": "Content loading ...",
    "content-error": "Unexpected Error",
  },
  common: {
    by: "By",
    more: "more",
    file: "file",
    per: "per",
    every: "every",
    "per-or-every": "{count, plural, =1 {every} other {every} }",
    cancel: "cancel",
    resume: "resume",
    any: "Any",
  },
  form: {
    action: {
      "Create-new": "Create new",
      Add: "Add",
      OK: "OK",
      Save: "Save",
      Send: "Send",
      Edit: "Edit",
      Delete: "Delete",
      Cancel: "Cancel",
      Discard: "Discard",
      Remove: "Remove",
      Enable: "Enable",
      Disable: "Disable",
      Publish: "Publish",
      Hide: "Hide",
      Accept: "Accept",
      Buy: "Buy",
      Subscribe: "Subscribe",
      "Are-you-sure-you-want-to-delete-the-item":
        'Are you sure you want to delete the {item}: "{name}"?',
      "Confirm-Deletion?": "Confirm Deletion?",
      "Discard-unsafed-changes": "Discard unsaved changes?",
      "Confirm-Cancellation": "Confirm Cancellation?",
    },
    "critical-settings": "Critical Settings",
    errors: {
      Conflict: "Conflict",
      "required-field": "Required field",
      "not-modified": "Not modified",
      "already-exists": "Already exists",
      "already-used": "Already exists",
      "item-too-large": "{item} is too large",
      "item-too-large-size": "{item} is too large. maximum: {maxSize}",
      "wrong-type": "Wrong file type. Currently supported: {types}",
      "invalid-css-color": "Invalid CSS color",
      remove: "Remove: {item}",
    },
  },
  query: {
    "order-by": {
      "created-at": {
        title: "Created at",
        "newest-first": "Newest first",
        "oldest-first": "Oldest first",
      },
      "updated-at": {
        title: "Updated at",
        "newest-first": "Newest first",
        "oldest-first": "Oldest first",
      },
      random: {
        title: "Random",
      },
    },
  },
  pagination: {
    previous: "previous",
    next: "next",
  },
  price: {
    Price: "Price",
    "decimal-point": ".",
    "billing-period": "Billing period",
    "add-trial-period": "Add trial period",
    "trial-period": "Trial period",
    "days-free": "{periodDays, plural, =1 {day} other {days}} free",
    currency: {
      title: "Currency",
      [currencyToJSON(Currency.CURRENCY_EUR)]: `EUR`,
    },
    "price-type": {
      title: "Type",
      [priceTypeToJSON(PriceType.PRICE_TYPE_ONE_TIME)]: `One time`,
      [priceTypeToJSON(PriceType.PRICE_TYPE_RECURRING)]: `Recurring`,
    },
    "recurring-interval": {
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_DAY
      )]: `{intervalCount, plural, =1 {day} other {days} }`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_WEEK
      )]: `{intervalCount, plural, =1 {week} other {weeks} }`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_MONTH
      )]: `{intervalCount, plural, =1 {month} other {months} }`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_YEAR
      )]: `{intervalCount, plural, =1 {year} other {years} }`,
    },
  },
  shop: {
    title: "Shop",
    "title-plural": "Shops",
    "no-description": "No description ...",
    settings: {
      title: "Settings",
    },
    errors: {
      "ensure-offers-deleted": "Ensure all Offers are deleted first.",
      "invalid-url": "Invalid URL",
    },
    labels: {
      Details: "Details",
      Name: "Name",
      name: "name",
      Slug: "Path",
      slug: "path",
      Description: "Description",
      description: "description",
      "Name-and-Description": "Name and Description",
      Image: "Image",
      Logo: "Logo",
      Theme: "Theme",
      Path: "URL-path",
      Domain: "Domain",
      domain: "domain",
      "is-publicly-visible": "This Shop is publicly visible",
      "contact-email-address": "Contact email address",
      "Created-at": "Created at",
      "Updated-at": "Updated at",
    },
  },
  "shop-customization": {
    labels: {
      headerBackgroundColorLight: "Header background color (light theme)",
      headerBackgroundColorDark: "Header background color (dark theme)",
      headerContentColorLight: "Header content color (light theme)",
      headerContentColorDark: "Header content color (dark theme)",
      secondaryBackgroundColorLight: "Secondary background color (light theme)",
      secondaryBackgroundColorDark: "Secondary background color (dark theme)",
      secondaryContentColorLight: "Secondary content color (light theme)",
      secondaryContentColorDark: "Secondary content color (dark theme)",
    },
  },
  offer: {
    title: "Offer",
    "title-plural": "Offers",
    "no-offers-yet": "No Offers yet ...",
    "no-description": "No description ...",
    "currently-not-available": "Currently not available",
    "sign-in-to-subscribe": "Sign in",
    "contact-shop": "Contact Shop",
    "other-offers": "Other Offers",
    "downloadable-content": "downloadable content",
    visibility: {
      title: "Visibility",
      visible: "Publicly visible",
      "not-visible": "Not publicly visible",
    },
    labels: {
      Price: "Price",
      Name: "Name",
      name: "Name",
      Description: "Description",
      description: "Description",
      "Created-at": "Created at",
      "Updated-at": "Updated at",
      "is-publicly-visible": "This Offer is publicly visible",
      "show-on-home-page": "Show this Offer on home page",
    },
    types: {
      [offerTypeToJSON(OfferType.OFFER_TYPE_PHYSICAL)]: `physical`,
      [offerTypeToJSON(OfferType.OFFER_TYPE_DIGITAL)]: `digital`,
      [offerTypeToJSON(OfferType.OFFER_TYPE_SERVICE)]: `service`,
    },
  },
  media: {
    Title: "File",
    "Title-plural": "Files",
    Download: "Download",
    "Download-now": "Download now",
    "download-file": 'Download the file "{item}"',
    Inventory: "Inventory",
    "download-all": "Download all",
    errors: {
      "still-part-of-an-offer": "The file is still contained in some offers",
    },
    labels: {
      name: "Name",
      file: "File",
    },
  },
  subscription: {
    Title: "Subscription",
    "Title-plural": "Subscriptions",
    "My-Subscriptions": "My Subscriptions",
    "subscription-to": "Subscription for",
    "already-subscribed": "Already subscribed",
    "payed-until": "Payed until",
    "cancel-subscription": "Cancel Subscription",
    "included-files": "Included files",
    "subscription-configuration": "Subscription Configuration",
    resume: "Resume Subscription",
    "canceled-at": "Canceled at",
    "no-subscriptions-yet": "No Subscriptions yet ...",
  },
  image: {
    "delete-confirmation-message":
      "Are you sure you want to delete the current image?",
  },
  report: {
    title: "Submit feedback",
    "link-information":
      "Your feedback was successfully created as GitHub issue. You can check the status of it using the following link.",

    labels: {
      type: "Type",
      title: "Title",
      content: "Message",
    },
    types: {
      [ReportType.REPORT_TYPE_BUG]: "Bug report",
      [ReportType.REPORT_TYPE_FEATURE_REQUEST]: "Feature request",
      [ReportType.REPORT_TYPE_QUESTION]: "Question",
    },
  },
  dashboard: {
    shop: {
      Details: "Details",
      "my-shops": "My Shops",
      "no-shop-yet": "No Shop yet",
      "create-new-shop": "Create a new Shop",
      "edit-name-and-description": "Edit name and description",
      "edit-contact-email": "Edit contact email address",
      "public-visibility": "Public Visibility",
      "publish-notification-title": "Are you sure you want publish this Shop?",
      "publish-notification-message": "By publishing this Shop ...",
      "unpublish-notification-title":
        "Are you sure you want to unpublish this Shop?",
      "unpublish-notification-message": "By unpublishing this Shop ...",
      "edit-image": "Edit image",
      "delete-image": "Delete image",
      "logo-image": "Logo image",
      "edit-logo": "Edit logo",
      "delete-logo": "Delete logo",
      "edit-theme": "Edit theme",
      "edit-path": "Edit URL-path",
      "edit-domain": "Edit domain",
      "delete-this-shop": "Delete this Shop",
      "resulting-url": "Resulting URL",
      image: {
        label: "Image",
        "for-dark-theme": "For dark theme",
        "use-same-for-dark-mode": "Use same image in dark theme",
        "show-in-listings": "Show in listings",
        "show-on-home": "Show on home page",
      },
      domain: {
        pending: "Pending verification",
        "pending-information":
          "Please configure the following DNS CNAME record for the specified domain:",
        "pending-information-sample":
          "{item}. CNAME mysite.peoplesmarkets.com.",
        active: "Verified",
      },
      stripe: {
        title: "Stripe",
        integration: "Stripe Integration",
        "start-integration": "Integrate Stripe",
        "continue-integration": "Continue Stripe integration",
        "remove-integration": "Remove Stripe integration",
      },
    },
    offers: {
      Details: "Details",
      "title-plural": "Offers",
      "create-new-offer": "Create a new Offer",
      "edit-offer": "Edit Offer",
      "delete-this-offer": "Delete this Offer",
      "add-image": "Add image",
      "edit-price": "Edit Price",
      "public-visibility": "Public Visibility",
      "publish-notification-title": "Are you sure you want publish this Offer?",
      "publish-notification-message": "By publishing this Offer ...",
      "unpublish-notification-title":
        "Are you sure you want to unpublish this Offer?",
      "unpublish-notification-message": "By unpublishing this Offer ...",
    },
    "shipping-rate": {
      "add-shipping-rate": "Add Shipping Rate",
      "shipping-rates": "Shipping Rates",
      "no-shipping-rates-yet": "No Shipping Rates yet ...",
      country: "Country",
      "to-all-countries": "To all countries",
    },
    media: {
      "my-media": "My Files",
      "create-new-file": "Upload new File",
      "edit-file": "Edit File",
    },
  },
  "main-navigation": {
    actions: {
      "sign-in": "Sign In",
      "sign-out": "Sign Out",
    },
    links: {
      home: "Home",
      shops: "Shops",
      offers: "Offers",
      dashboard: "Dashboard",
      "user-settings": "User Settings",
      community: "Community",
      "get-started": "Get started",
    },
    settings: {
      Title: "Settings",
      "switch-to-light-mode": "Switch to light theme",
      "switch-to-dark-mode": "Switch to dark theme",
      "change-language": "Language / Sprache",
      report: "Feedback",
    },
  },
  "shops-search": {
    title: "Search shops",
  },
  "offers-search": {
    title: "Search offers",
  },
  "user-settings-page": {
    title: "User Settings",
  },
  "community-page": {
    headline: "Help the project grow!",
    description:
      "## This is planned to be the place where everyone can involve themselves in the project. Currently, the place to give feedback and criticize is the [Issues section](https://github.com/peoplesmarkets/Project/issues) on GitHub.",
    posts: {
      title: "Posts",
      "presentation-is-inspired-by":
        "The presentation of the posts is heavily inspired by",
      medium: "Medium",
    },
  },
  "landing-page": {
    "get-started": "Get started",
    REGISTER: "REGISTER NOW",
    "establish-your-online-appearance": "Establish Your Online Appearance",
    "create-your-online-shop-and-build-your-brand":
      "Create your online store and build your brand",
    "offer-your-goods-to-the-people": "Offer your goods to the people",
    "no-costs-until-you-sell": "No costs until you sell",
    "no-strings-attached": "No strings attached",
  },
  imprint: {
    title: "Imprint",
    responsible: {
      title: "Currently responsible",
      name: "Maximilian Temeschinko",
      street: "Thalkirchner Str. 182",
      address_line_1: "81371 Munich",
      address_line_2: "Germany",
    },
    Support: "Support",
    "support-email": "support@peoplesmarkets.com",
  },
  "privacy-policy": {
    title: "Privacy Policy",
  },
  "terms-of-service": {
    title: "Terms of service",
  },
  "page-not-found": {
    title: "404 Page Not Found",
    "back-to-home": "Back to home page",
  },
  "environment-banner": {
    title: "Developement Environment",
    description:
      "This is a developement environment for testing purpose only. For the main site visit: ",
  },
  footer: {
    "powered-by": "Powered by",
    "main-paragraph":
      "People's Markets is an online platform where people and businesses can offer their goods while building their brand and market appearance.",
    "community-paragraph": "Get involved in any aspect of the project.",
  },
};
