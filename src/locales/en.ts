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
import { TKEYS } from "./dev";

export const EN: typeof TKEYS = {
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
    "per-or-every": "{count, plural, =1 {per} other {every} }",
  },
  form: {
    action: {
      "Create-new": "Create new",
      Add: "Add",
      OK: "OK",
      Save: "Save",
      Edit: "Edit",
      Delete: "Delete",
      Cancel: "Cancel",
      Discard: "Discard",
      Buy: "Buy",
      Subscribe: "Subscribe",
      "Are-you-sure-you-want-to-delete-the-item":
        'Are you sure you want to delete the {item}: "{name}"?',
      "Confirm-Deletion?": "Confirm Deletion?",
    },
    "danger-zone": "Danger Zone",
    errors: {
      Conflict: "Conflict",
      "required-field": "Required field",
      "not-modified": "Not modified",
      "already-exists": "Already exists",
      "item-too-large": "{item} is too large",
      "wrong-type": "Wrong file type",
      "invalid-css-color": "Invalid CSS color",
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
  price: {
    Price: "Price",
    "decimal-point": ".",
    "billing-period": "Billing period",
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
    },
    labels: {
      Details: "Details",
      Name: "Name",
      name: "name",
      Slug: "Path",
      slug: "path",
      Description: "Description",
      description: "description",
      "Created-at": "Created at",
      "Updated-at": "Updated at",
      Domain: "Domain",
      domain: "domain",
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
    "other-offers": "Other Offers",
    "downloadable-content": "downloadable content",
    visibility: {
      title: "Visibility",
      visible: "Publicly visible",
      "not-visible": "Not publicly visible",
    },
    "is-featured": {
      title: "Featured",
      featured: "Featured",
      "not-featured": "Not featured",
    },
    labels: {
      Price: "Price",
      Name: "Name",
      name: "Name",
      Description: "Description",
      description: "Description",
      "Created-at": "Created at",
      "Updated-at": "Updated at",
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
    errors: {
      "still-part-of-an-offer": "The file is still contained in some offers",
    },
    labels: {
      name: "Name",
      file: "File",
    },
  },
  image: {
    "delete-confirmation-message":
      "Are you sure you want to delete the current image?",
  },
  "shops-search": {
    title: "Search for a Shop",
  },
  "offers-search": {
    title: "Search all Offers",
  },
  dashboard: {
    shop: {
      Details: "Details",
      "my-shops": "My Shops",
      "no-shop-yet": "No Shop yet",
      "create-new-shop": "Create a new Shop",
      "edit-name-and-description": "Name, Description and Visibility",
      "edit-image": "Edit Image",
      "delete-image": "Delete Image",
      "edit-logo": "Edit Logo",
      "delete-logo": "Delete Logo",
      "edit-theme": "Edit Theme",
      "edit-path": "Edit URL-path",
      "edit-domain": "Edit Domain",
      "delete-this-shop": "Delete this Shop",
      "resulting-url": "Resulting URL",
      image: {
        "for-light-theme": "For light theme",
        "for-dark-theme": "For dark theme",
        "show-in-listings": "Show in listings",
        "show-on-home": "Show on home page",
      },
      domain: {
        pending: "Pending verification",
        active: "Verified",
      },
      stripe: {
        title: "Stripe",
        integration: "Stripe Integraion",
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
    },
    settings: {
      "switch-to-light-mode": "Switch to light theme",
      "switch-to-dark-mode": "Switch to dark theme",
      "change-language": "Language / Sprache",
    },
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
    "GET-STARTED": "GET STARTED",
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
