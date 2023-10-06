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
  lang: "lang",
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
    cancel: "common.cancel",
    resume: "common.resume",
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
      Subscribe: "form.action.Subscribe",
      "Are-you-sure-you-want-to-delete-the-item":
        "form.action.Are-you-sure-you-want-to-delete-the-item",
      "Confirm-Deletion?": "form.action.Confirm-Deletion?",
      "Discard-unsafed-changes": "form.action.Discard-unsafed-changes",
      "Confirm-Cancellation": "form.action.Confirm-Cancellation",
    },
    "danger-zone": "form.danger-zone",
    errors: {
      Conflict: "form.errors.Conflict",
      "required-field": "form.errors.required-field",
      "not-modified": "form.errors.not-modified",
      "already-exists": "form.errors.already-exists",
      "item-too-large": "form.errors.item-too-large",
      "wrong-type": "form.errors.wrong-type",
      "invalid-css-color": "form.errors.invalid-css-color",
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
    "add-trial-period": "price.add-trial-period",
    "trial-period": "price.trial-period",
    "days-free": "price.days-free",
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
  shop: {
    title: "shop.title",
    "title-plural": "shop.title-plural",
    "no-description": "shop.no-description",
    settings: {
      title: "shop.settings.title",
    },
    errors: {
      "ensure-offers-deleted": "shop.errors.ensure-offers-deleted",
    },
    labels: {
      Details: "shop.labels.Details",
      Name: "shop.labels.Name",
      name: "shop.labels.name",
      Slug: "shop.labels.Slug",
      slug: "shop.labels.slug",
      Description: "shop.labels.Description",
      description: "shop.labels.description",
      "Created-at": "shop.labels.Created-at",
      "Updated-at": "shop.labels.Updated-at",
      Domain: "shop.labels.Domain",
      domain: "shop.labels.domain",
    },
  },
  "shop-customization": {
    labels: {
      headerBackgroundColorLight:
        "shop-customization.labels.headerBackgroundColorLight",
      headerBackgroundColorDark:
        "shop-customization.labels.headerBackgroundColorDark",
      headerContentColorLight:
        "shop-customization.labels.headerContentColorLight",
      headerContentColorDark:
        "shop-customization.labels.headerContentColorDark",
      secondaryBackgroundColorLight:
        "shop-customization.labels.secondaryBackgroundColorLight",
      secondaryBackgroundColorDark:
        "shop-customization.labels.secondaryBackgroundColorDark",
      secondaryContentColorLight:
        "shop-customization.labels.secondaryContentColorLight",
      secondaryContentColorDark:
        "shop-customization.labels.secondaryContentColorDark",
    },
  },
  offer: {
    title: "offer.title",
    "title-plural": "offer.title-plural",
    "no-offers-yet": "offer.no-offers-yet",
    "no-description": "offer.no-description",
    "currently-not-available": "offer.currently-not-available",
    "sign-in-to-subscribe": "offer.sign-in-to-subscribe",
    "other-offers": "offer.other-offers",
    "downloadable-content": "offer.downloadable-content",
    visibility: {
      title: "offer.visibility.title",
      visible: "offer.visibility.visible",
      "not-visible": "offer.visibility.not-visible",
    },
    "is-featured": {
      title: "offer.is-featured.title",
      featured: "offer.is-featured.featured",
      "not-featured": "offer.is-featured.not-featured",
    },
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
    Inventory: "media.Inventory",
    "download-all": "media.download-all",
    errors: {
      "still-part-of-an-offer": "media.errors.still-part-of-an-offer",
    },
    labels: {
      name: "media.labels.name",
      file: "media.labels.file",
    },
  },
  subscription: {
    Title: "subscription.Title",
    "Title-plural": "subscription.Title-plural",
    "My-Subscriptions": "subscription.My-Subscriptions",
    "subscription-to": "subscription.subscription-to",
    "already-subscribed": "subscription.already-subscribed",
    "payed-until": "subscription.payed-until",
    "cancel-subscription": "subscription.cancel-subscription",
    "included-files": "subscription.included-files",
    "subscription-configuration": "subscription.subscription-configuration",
    resume: "subscription.resume",
    "canceled-at": "subscription.canceled-at",
    "no-subscriptions-yet": "subscription.no-subscriptions-yet"
  },
  image: {
    "delete-confirmation-message": "image.delete-confirmation-message",
  },
  "shops-search": {
    title: "shops-search.title",
  },
  "offers-search": {
    title: "offers-search.title",
  },
  dashboard: {
    shop: {
      Details: "dashboard.shop.Details",
      "my-shops": "dashboard.shop.my-shops",
      "no-shop-yet": "dashboard.shop.no-shop-yet",
      "create-new-shop": "dashboard.shop.create-new-shop",
      "edit-name-and-description": "dashboard.shop.edit-name-and-description",
      "edit-image": "dashboard.shop.edit-image",
      "delete-image": "dashboard.shop.delete-image",
      "edit-logo": "dashboard.shop.edit-logo",
      "delete-logo": "dashboard.shop.delete-logo",
      "edit-theme": "dashboard.shop.edit-theme",
      "edit-path": "dashboard.shop.edit-path",
      "edit-domain": "dashboard.shop.edit-domain",
      "delete-this-shop": "dashboard.shop.delete-this-shop",
      "resulting-url": "dashboard.shop.resulting-url",
      image: {
        "for-light-theme": "dashboard.shop.image.for-light-theme",
        "for-dark-theme": "dashboard.shop.image.for-dark-theme",
        "show-in-listings": "dashboard.shop.image.show-in-listings",
        "show-on-home": "dashboard.shop.image.show-on-home",
      },
      domain: {
        pending: "dashboard.shop.domain.pending",
        active: "dashboard.shop.domain.active",
      },
      stripe: {
        title: "dashboard.shop.stripe.title",
        integration: "dashboard.shop.stripe.integration",
        "start-integration": "dashboard.shop.stripe.start-integration",
        "continue-integration": "dashboard.shop.stripe.continue-integration",
        "remove-integration": "dashboard.shop.stripe.remove-integration",
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
      "sign-out": "main-navigation.actions.sign-out",
    },
    links: {
      home: "main-navigation.links.home",
      shops: "main-navigation.links.shops",
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
    "create-your-online-shop-and-build-your-brand":
      "landing-page.create-your-online-shop-and-build-your-brand",
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
    "powered-by": "footer.powered-by",
    "main-paragraph": "footer.main-paragraph",
    "community-paragraph": "footer.community-paragraph",
  },
};
