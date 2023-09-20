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

export const TKEYS = {
  "Peoples-Markets": "Peoples-Markets",
  peoplesmarkets_com: "peoplesmarkets_com",
  peoplesmarkets_main_link: "peoplesmarkets_main_link",
  fetching: {
    "content-loading": "fetching.content-loading",
    "content-error": "fetching.content-error",
  },
  common: {
    by: "common.by",
    more: "common.more",
    file: "common.file",
    per: "common.per",
    every: "common.every",
    "per-or-every": "common.per-or-every",
  },
  form: {
    action: {
      "Create-new": "form.action.Create-new",
      Add: "form.action.Add",
      OK: "form.action.OK",
      Save: "form.action.Save",
      Edit: "form.action.Edit",
      Delete: "form.action.Delete",
      Cancel: "form.action.Cancel",
      Discard: "form.action.Discard",
      Buy: "form.action.Buy",
      "Are-you-sure-you-want-to-delete-the-item":
        "form.action.Are-you-sure-you-want-to-delete-the-item",
      "Confirm-Deletion?": "form.action.Confirm-Deletion?",
    },
    "danger-zone": "form.danger-zone",
    errors: {
      Conflict: "form.errors.Conflict",
      "required-field": "form.errors.required-field",
      "not-modified": "form.errors.not-modified",
      "already-exists": "form.errors.already-exists",
      "item-too-large": "form.errors.item-too-large",
      "wrong-type": "form.errors.wrong-type",
    },
  },
  query: {
    "order-by": {
      "created-at": {
        title: "query.order-by.created-at.title",
        "newest-first": "query.order-by.created-at.newest-first",
        "oldest-first": "query.order-by.created-at.oldest-first",
      },
      "updated-at": {
        title: "query.order-by.updated-at.title",
        "newest-first": "query.order-by.updated-at.newest-first",
        "oldest-first": "query.order-by.updated-at.oldest-first",
      },
      random: {
        title: "query.order-by.random.title",
      },
    },
  },
  price: {
    Price: "price.Price",
    "decimal-point": "price.decimal-point",
    "billing-period": "price.billing-period",
    currency: {
      title: "price.currency.title",
      [currencyToJSON(Currency.CURRENCY_EUR)]: `price.currency.${currencyToJSON(
        Currency.CURRENCY_EUR
      )}`,
    },
    "price-type": {
      title: "price.price-type.title",
      [priceTypeToJSON(
        PriceType.PRICE_TYPE_ONE_TIME
      )]: `price.price-type.${priceTypeToJSON(PriceType.PRICE_TYPE_ONE_TIME)}`,
      [priceTypeToJSON(
        PriceType.PRICE_TYPE_RECURRING
      )]: `price.price-type.${priceTypeToJSON(PriceType.PRICE_TYPE_RECURRING)}`,
    },
    "recurring-interval": {
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_DAY
      )]: `price.recurring-interval.${recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_DAY
      )}`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_WEEK
      )]: `price.recurring-interval.${recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_WEEK
      )}`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_MONTH
      )]: `price.recurring-interval.${recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_MONTH
      )}`,
      [recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_YEAR
      )]: `price.recurring-interval.${recurringIntervalToJSON(
        RecurringInterval.RECURRING_INTERVAL_YEAR
      )}`,
    },
  },
  "market-booth": {
    title: "market-booth.title",
    "title-plural": "market-booth.title-plural",
    "no-description": "market-booth.no-description",
    "edit-image": "market-booth.edit-image",
    "delete-image": "market-booth.delete-image",
    errors: {
      "ensure-offers-deleted": "market-booth.errors.ensure-offers-deleted",
    },
    labels: {
      Details: "market-booth.labels.Details",
      Name: "market-booth.labels.Name",
      name: "market-booth.labels.name",
      Description: "market-booth.labels.Description",
      description: "market-booth.labels.description",
      "Created-at": "market-booth.labels.Created-at",
      "Updated-at": "market-booth.labels.Updated-at",
    },
  },
  offer: {
    title: "offer.title",
    "title-plural": "offer.title-plural",
    "no-offers-yet": "offer.no-offers-yet",
    "no-description": "offer.no-description",
    "currently-no-payment-method": "offer.currently-no-payment-method",
    "other-offers-by": "offer.other-offers-by",
    "downloadable-content": "offer.downloadable-content",
    labels: {
      Price: "offer.labels.Price",
      Name: "offer.labels.Name",
      name: "offer.labels.name",
      Description: "offer.labels.Description",
      description: "offer.labels.description",
      "Created-at": "offer.labels.Created-at",
      "Updated-at": "offer.labels.Updated-at",
    },
    types: {
      [offerTypeToJSON(
        OfferType.OFFER_TYPE_PHYSICAL
      )]: `offer.types.${offerTypeToJSON(OfferType.OFFER_TYPE_PHYSICAL)}`,
      [offerTypeToJSON(
        OfferType.OFFER_TYPE_DIGITAL
      )]: `offer.types.${offerTypeToJSON(OfferType.OFFER_TYPE_DIGITAL)}`,
      [offerTypeToJSON(
        OfferType.OFFER_TYPE_SERVICE
      )]: `offer.types.${offerTypeToJSON(OfferType.OFFER_TYPE_SERVICE)}`,
    },
  },
  media: {
    Title: "media.Title",
    "Title-plural": "media.Title-plural",
    Download: "media.Download",
    "Download-now": "media.Download-now",
    "download-file": "media.download-file",
    errors: {
      "still-part-of-an-offer": "media.errors.still-part-of-an-offer",
    },
    labels: {
      name: "media.labels.name",
      file: "media.labels.file",
    },
  },
  image: {
    "delete-confirmation-message": "image.delete-confirmation-message",
  },
  "market-booths-search": {
    title: "market-booths-search.title",
  },
  "offers-search": {
    title: "offers-search.title",
  },
  dashboard: {
    "market-booth": {
      Details: "dashboard.market-booth.Details",
      "my-market-booths": "dashboard.market-booth.my-market-booths",
      "no-market-booth-yet": "dashboard.market-booth.no-market-booth-yet",
      "create-new-market-booth":
        "dashboard.market-booth.create-new-market-booth",
      "edit-market-booth-details":
        "dashboard.market-booth.edit-market-booth-details",
      "delete-this-market-booth":
        "dashboard.market-booth.delete-this-market-booth",
      "add-or-update-image": "dashboard.market-booth.add-or-update-image",
      stripe: {
        title: "dashboard.market-booth.stripe.title",
        integration: "dashboard.market-booth.stripe.integration",
        "start-integration": "dashboard.market-booth.stripe.start-integration",
        "continue-integration":
          "dashboard.market-booth.stripe.continue-integration",
        "remove-integration":
          "dashboard.market-booth.stripe.remove-integration",
      },
    },
    offers: {
      Details: "dashboard.offers.Details",
      "title-plural": "dashboard.offers.title-plural",
      "create-new-offer": "dashboard.offers.create-new-offer",
      "edit-offer": "dashboard.offers.edit-offer",
      "delete-this-offer": "dashboard.offers.delete-this-offer",
      "add-image": "dashboard.offers.add-image",
      "edit-price": "dashboard.offers.edit-price",
    },
    media: {
      "my-media": "dashboard.media.my-media",
      "create-new-file": "dashboard.media.create-new-file",
      "edit-file": "dashboard.media.edit-file",
    },
  },
  "main-navigation": {
    actions: {
      "sign-in": "main-navigation.actions.sign-in",
    },
    links: {
      "market-booths": "main-navigation.links.market-booths",
      offers: "main-navigation.links.offers",
      dashboard: "main-navigation.links.dashboard",
      "user-settings": "main-navigation.links.user-settings",
      community: "main-navigation.links.community",
    },
    settings: {
      "switch-to-light-mode": "main-navigation.settings.switch-to-light-mode",
      "switch-to-dark-mode": "main-navigation.settings.switch-to-dark-mode",
      "change-language": "main-navigation.settings.change-language",
    },
  },
  "user-settings-page": {
    title: "user-settings-page.title",
  },
  "community-page": {
    headline: "community-page.headline",
    description: "community-page.description",
    posts: {
      title: "community-page.posts.title",
      "presentation-is-inspired-by":
        "community-page.posts.presentation-is-inspired-by",
      medium: "community-page.posts.medium",
    },
  },
  "landing-page": {
    "get-started": "landing-page.get-started",
    "GET-STARTED": "landing-page.GET-STARTED",
    "establish-your-online-appearance":
      "landing-page.establish-your-online-appearance",
    "create-your-online-market-booth-and-build-your-brand":
      "landing-page.create-your-online-market-booth-and-build-your-brand",
    "offer-your-goods-to-the-people":
      "landing-page.offer-your-goods-to-the-people",
    "no-costs-until-you-sell": "landing-page.no-costs-until-you-sell",
    "no-strings-attached": "landing-page.no-strings-attached",
  },
  imprint: {
    title: "imprint.title",
    responsible: {
      title: "imprint.responsible.title",
      name: "imprint.responsible.name",
      street: "imprint.responsible.street",
      address_line_1: "imprint.responsible.address_line_1",
      address_line_2: "imprint.responsible.address_line_2",
    },
    Support: "imprint.Support",
    "support-email": "imprint.support-email",
  },
  "privacy-policy": {
    title: "privacy-policy.title",
  },
  "terms-of-service": {
    title: "terms-of-service.title",
  },
  "page-not-found": {
    title: "page-not-found.title",
    "back-to-home": "page-not-found.back-to-home",
  },
  "environment-banner": {
    title: "environment-banner.title",
    description: "environment-banner.description",
  },
  footer: {
    "main-paragraph": "footer.main-paragraph",
    "community-paragraph": "footer.community-paragraph",
  },
};
