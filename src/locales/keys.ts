import { OfferType } from "../services/peoplesmarkets/commerce/v1/offer";
import {
  Currency,
  PriceType,
  RecurringInterval,
  currencyToJSON,
  priceTypeToJSON,
  recurringIntervalToJSON,
} from "../services/peoplesmarkets/commerce/v1/price";
import { ReportType } from "../services/peoplesmarkets/report/v1/report";

export const TKEYS = {
  lang: "lang",
  "Peoples-Markets": "Peoples-Markets",
  peoplesmarkets_com: "peoplesmarkets_com",
  peoplesmarkets_main_link: "peoplesmarkets_main_link",
  "powered-by-peoplesmarkets": "powered-by-peoplesmarkets",
  fetching: {
    "content-loading": "fetching.content-loading",
    "content-error": "fetching.content-error",
  },
  common: {
    by: "common.by",
    or: "common.or",
    more: "common.more",
    file: "common.file",
    per: "common.per",
    every: "common.every",
    "per-or-every": "common.per-or-every",
    cancel: "common.cancel",
    resume: "common.resume",
    any: "common.any",
    Preview: "common.Preview",
    reload: "common.reload",
    public: "common.public",
    hidden: "common.hidden",
  },
  form: {
    action: {
      "Create-new": "form.action.Create-new",
      Add: "form.action.Add",
      OK: "form.action.OK",
      Next: "form.action.Next",
      Back: "form.action.Back",
      Previous: "form.action.Previous",
      Save: "form.action.Save",
      "Save-and-continue": "form.action.Save-and-continue",
      Send: "form.action.Send",
      Done: "form.action.Done",
      Edit: "form.action.Edit",
      Delete: "form.action.Delete",
      Cancel: "form.action.Cancel",
      Close: "form.action.Close",
      Discard: "form.action.Discard",
      Remove: "form.action.Remove",
      Enable: "form.action.Enable",
      Disable: "form.action.Disable",
      Publish: "form.action.Publish",
      Hide: "form.action.Hide",
      Accept: "form.action.Accept",
      Buy: "form.action.Buy",
      Subscribe: "form.action.Subscribe",
      "Are-you-sure-you-want-to-delete-the-item":
        "form.action.Are-you-sure-you-want-to-delete-the-item",
      "Confirm-Deletion?": "form.action.Confirm-Deletion?",
      "Discard-unsafed-changes": "form.action.Discard-unsafed-changes",
      "Confirm-Cancellation": "form.action.Confirm-Cancellation",
    },
    "critical-settings": "form.critical-settings",
    errors: {
      Conflict: "form.errors.Conflict",
      "required-field": "form.errors.required-field",
      "not-modified": "form.errors.not-modified",
      "already-exists": "form.errors.already-exists",
      "already-used": "form.errors.already-used",
      "item-too-large": "form.errors.item-too-large",
      "item-too-large-size": "form.errors.item-too-large-size",
      "quota-exceeded": "form.errors.quota-exceeded",
      "wrong-type": "form.errors.wrong-type",
      "invalid-css-color": "form.errors.invalid-css-color",
      remove: "form.errors.remove",
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
  pagination: {
    previous: "pagination.previous",
    next: "pagination.next",
  },
  navigation: {
    redirecting: "navigation.redirecting",
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
    configuration: {
      title: "shop.configuration.title",
      info: "shop.configuration.info",
      Details: "shop.configuration.Details",
      Payment: "shop.configuration.Payment",
      Appearance: "shop.configuration.Appearance",
      Settings: "shop.configuration.Settings",
    },
    settings: {
      title: "shop.settings.title",
    },
    errors: {
      "conflict-on-delete": "shop.errors.conflict-on-delete",
      "invalid-url": "shop.errors.invalid-url",
    },
    labels: {
      Details: "shop.labels.Details",
      Name: "shop.labels.Name",
      name: "shop.labels.name",
      Slug: "shop.labels.Slug",
      slug: "shop.labels.slug",
      Description: "shop.labels.Description",
      description: "shop.labels.description",
      "Name-and-Description": "shop.labels.Name-and-Description",
      Image: "shop.labels.Image",
      Logo: "shop.labels.Logo",
      Theme: "shop.labels.Theme",
      Path: "shop.labels.Path",
      Domain: "shop.labels.Domain",
      domain: "shop.labels.domain",
      "is-publicly-visible": "shop.labels.is-publicly-visible",
      "contact-email-address": "shop.labels.contact-email-address",
      "Created-at": "shop.labels.Created-at",
      "Updated-at": "shop.labels.Updated-at",
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
    "contact-shop": "offer.contact-shop",
    "other-offers": "offer.other-offers",
    "downloadable-content": "offer.downloadable-content",
    "downloadable-content-info": "offer.downloadable-content-info",
    visibility: {
      title: "offer.visibility.title",
      visible: "offer.visibility.visible",
      "not-visible": "offer.visibility.not-visible",
    },
    labels: {
      Price: "offer.labels.Price",
      Name: "offer.labels.Name",
      name: "offer.labels.name",
      Description: "offer.labels.Description",
      description: "offer.labels.description",
      "Created-at": "offer.labels.Created-at",
      "Updated-at": "offer.labels.Updated-at",
      "is-publicly-visible": "offer.labels.is-publicly-visible",
      "show-on-home-page": "offer.labels.show-on-home-page",
    },
    types: {
      [OfferType.OFFER_TYPE_PHYSICAL]: `offer.types.1`,
      [OfferType.OFFER_TYPE_DIGITAL]: `offer.types.2`,
      [OfferType.OFFER_TYPE_SERVICE]: `offer.types.3`,
    } as Record<number, string>,
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
    "no-subscriptions-yet": "subscription.no-subscriptions-yet",
  },
  report: {
    label: "report.label",
    title: "report.title",
    "link-information": "report.link-information",
    labels: {
      type: "report.labels.type",
      title: "report.labels.title",
      content: "report.labels.content",
    },
    types: {
      [ReportType.REPORT_TYPE_BUG]: "report.types.1",
      [ReportType.REPORT_TYPE_FEATURE_REQUEST]: "report.types.2",
      [ReportType.REPORT_TYPE_QUESTION]: "report.types.3",
    } as Record<number, string>,
  },
  dashboard: {
    shop: {
      Details: "dashboard.shop.Details",
      "my-shops": "dashboard.shop.my-shops",
      "no-shop-yet": "dashboard.shop.no-shop-yet",
      "create-new-shop": "dashboard.shop.create-new-shop",
      "name-your-shop": "dashboard.shop.name-your-shop",
      "edit-name-and-description": "dashboard.shop.edit-name-and-description",
      "edit-contact-email": "dashboard.shop.edit-contact-email",
      "edit-image": "dashboard.shop.edit-image",
      "delete-image": "dashboard.shop.delete-image",
      "logo-image": "dashboard.shop.logo-image",
      "edit-logo": "dashboard.shop.edit-logo",
      "delete-logo": "dashboard.shop.delete-logo",
      "edit-theme": "dashboard.shop.edit-theme",
      "configure-shop": "dashboard.shop.configure-shop",
      "delete-this-shop": "dashboard.shop.delete-this-shop",
      "delete-shop-info": "dashboard.shop.delete-shop-info",
      "resulting-url": "dashboard.shop.resulting-url",
      "duplicate-slug-error": "dashboard.shop.duplicate-slug-error",
      "empty-offers-warning-title": "dashboard.shop.empty-offers-warning-title",
      "empty-offers-warning-content":
        "dashboard.shop.empty-offers-warning-content",
      logo: {
        "preview-info": "dashboard.shop.logo.preview-info",
        "delete-confirmation-message":
          "dashboard.shop.logo.delete-confirmation-message",
        "logo-info": "dashboard.shop.logo.logo-info",
      },
      image: {
        label: "dashboard.shop.image.label",
        "for-dark-theme": "dashboard.shop.image.for-dark-theme",
        "use-same-for-dark-mode": "dashboard.shop.image.use-same-for-dark-mode",
        "show-on-home": "dashboard.shop.image.show-on-home",
        "show-in-listings": "dashboard.shop.image.show-in-listings",
        "preview-home-info": "dashboard.shop.image.preview-home-info",
        "preview-listing-info": "dashboard.shop.image.preview-listing-info",
        "delete-confirmation-message":
          "dashboard.shop.image.delete-confirmation-message",
      },
      stripe: {
        title: "dashboard.shop.stripe.title",
        url: "dashboard.shop.stripe.url",
        integration: "dashboard.shop.stripe.integration",
        "integration-info-left": "dashboard.shop.stripe.integration-info-left",
        "integration-info-right":
          "dashboard.shop.stripe.integration-info-right",
        "start-integration": "dashboard.shop.stripe.start-integration",
        "continue-integration": "dashboard.shop.stripe.continue-integration",
        "remove-integration": "dashboard.shop.stripe.remove-integration",
        connected: "dashboard.shop.stripe.connected",
      },
      contact: {
        info: "dashboard.shop.contact.info",
      },
      visibility: {
        Title: "dashboard.shop.visibility.Title",
        Info: "dashboard.shop.visibility.Info",
        "not-published-yet-info":
          "dashboard.shop.visibility.not-published-yet-info",
        "hide-this-shop": "dashboard.shop.visibility.hide-this-shop",
        "publish-shop": "dashboard.shop.visibility.publish-shop",
        "publish-notification-title":
          "dashboard.shop.visibility.publish-notification-title",
        "publish-notification-message-left":
          "dashboard.shop.visibility.publish-notification-message-left",
        "publish-notification-message-right":
          "dashboard.shop.visibility.publish-notification-message-right",
        "publish-anyway": "dashboard.shop.visibility.publish-anyway",
        "unpublish-notification-title":
          "dashboard.shop.visibility.unpublish-notification-title",
        "unpublish-notification-message":
          "dashboard.shop.visibility.unpublish-notification-message",
      },
      settings: {
        Title: "dashboard.shop.settings.Title",
      },
      path: {
        "edit-path": "dashboard.shop.path.edit-path",
        "edit-path-info": "dashboard.shop.path.edit-path-info",
      },
      domain: {
        "edit-domain": "dashboard.shop.domain.edit-domain",
        "edit-domain-info": "dashboard.shop.domain.edit-domain-info",
        pending: "dashboard.shop.domain.pending",
        "pending-information": "dashboard.shop.domain.pending-information",
        "pending-information-sample":
          "dashboard.shop.domain.pending-information-sample",
        active: "dashboard.shop.domain.active",
      },
    },
    offers: {
      Details: "dashboard.offers.Details",
      "My-Offers": "dashboard.offers.My-Offers",
      "title-plural": "dashboard.offers.title-plural",
      "create-new-offer": "dashboard.offers.create-new-offer",
      "name-your-offer": "dashboard.offers.name-your-offer",
      "create-your-first-offer": "dashboard.offers.create-your-first-offer",
      "edit-offer": "dashboard.offers.edit-offer",
      "delete-this-offer": "dashboard.offers.delete-this-offer",
      "add-image": "dashboard.offers.add-image",
      "edit-price": "dashboard.offers.edit-price",
      "public-visibility": "dashboard.offers.public-visibility",
      "publish-notification-title":
        "dashboard.offers.publish-notification-title",
      "publish-notification-message":
        "dashboard.offers.publish-notification-message",
      "shop-not-public-title": "dashboard.offers.shop-not-public-title",
      "shop-not-public-message": "dashboard.offers.shop-not-public-message",
      "go-to-shop-settings": "dashboard.offers.go-to-shop-settings",
      "unpublish-notification-title":
        "dashboard.offers.unpublish-notification-title",
      "unpublish-notification-message":
        "dashboard.offers.unpublish-notification-message",
      "no-offers-yet": "dashboard.offers.no-offers-yet",
    },
    "shipping-rate": {
      "add-shipping-rate": "dashboard.shipping-rate.add-shipping-rate",
      "shipping-rates": "dashboard.shipping-rate.shipping-rates",
      "no-shipping-rates-yet": "dashboard.shipping-rate.no-shipping-rates-yet",
      country: "dashboard.shipping-rate.country",
      "to-all-countries": "dashboard.shipping-rate.to-all-countries",
    },
    media: {
      "my-media": "dashboard.media.my-media",
      "create-new-file": "dashboard.media.create-new-file",
      "edit-file": "dashboard.media.edit-file",
    },
  },
  "main-navigation": {
    actions: {
      "create-shop": "main-navigation.actions.create-shop",
      "sign-in": "main-navigation.actions.sign-in",
      "sign-out": "main-navigation.actions.sign-out",
    },
    links: {
      home: "main-navigation.links.home",
      "My-Shop": "main-navigation.links.My-Shop",
      shops: "main-navigation.links.shops",
      offers: "main-navigation.links.offers",
      "My-Offers": "main-navigation.links.My-Offers",
      dashboard: "main-navigation.links.dashboard",
      community: "main-navigation.links.community",
      "get-started": "main-navigation.links.get-started",
    },
    settings: {
      Title: "main-navigation.settings.Title",
      "switch-to-light-mode": "main-navigation.settings.switch-to-light-mode",
      "switch-to-dark-mode": "main-navigation.settings.switch-to-dark-mode",
      "change-language": "main-navigation.settings.change-language",
      report: "main-navigation.settings.report",
    },
  },
  "shops-search": {
    title: "shops-search.title",
  },
  "offers-search": {
    title: "offers-search.title",
  },
  user: {
    authenticating: "user.authenticating",
    settings: {
      title: "user.settings.title",
    },
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
    REGISTER: "landing-page.REGISTER",
    "Sign-In": "landing-page.Sign-In",
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
    "accept-tos": "terms-of-service.accept-tos",
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
