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
    file: "file",
  },
  form: {
    action: {
      Add: "Add",
      OK: "OK",
      Save: "Save",
      Edit: "Edit",
      Delete: "Delete",
      Cancel: "Cancel",
      Discard: "Discard",
      "Are-you-sure-you-want-to-delete-the":
        'Are you sure you want to delete the {{item}}: "{{name}}"?',
      "Confirm-Deletion?": "Confirm Deletion?",
    },
    "danger-zone": "Danger Zone",
    errors: {
      Conflict: "Conflict",
      "required-field": "Required field",
      "not-modified": "Not modified",
      "already-exists": "Already exists",
      "item-too-large": "{{item}} is too large",
      "wrong-type": "Wrong file type",
    },
  },
  query: {
    "order-by": {
      title: "Order by",
      "newest-first": "Newest first",
      "oldest-first": "Oldest first",
      random: "Random",
    },
  },
  price: {
    "decimal-point": ".",
  },
  "market-booth": {
    title: "Market Booth",
    "title-plural": "Market Booths",
    "no-description": "No description ...",
    "edit-image": "Edit image",
    "delete-image": "Delete image",
    errors: {
      "ensure-offers-deleted": "Ensure all Offers are deleted first.",
    },
    labels: {
      Details: "Details",
      Name: "Name",
      name: "name",
      Description: "Description",
      description: "description",
      "Created-at": "Created at",
      "Updated-at": "Updated at",
    },
  },
  offer: {
    title: "Offer",
    "title-plural": "Offers",
    "no-offers-yet": "No Offers yet ...",
    "no-description": "No description ...",
    labels: {
      Price: "Price",
      Name: "Name",
      name: "Name",
      Description: "Description",
      description: "Description",
      "Created-at": "Created at",
      "Updated-at": "Updated at",
    },
  },
  image: {
    "delete-confirmation-message":
      "Are you sure you want to delete the current image?",
  },
  "market-booths-search": {
    title: "Search for a Market Booth",
  },
  "offers-search": {
    title: "Search all Offers",
  },
  dashboard: {
    "market-booth": {
      Details: "Maket Booth Details",
      "current-market-booth": "Current Market Booth",
      "no-market-booth-yet": "No Market Booth yet",
      "create-new-market-booth": "Create a new Market Booth",
      "edit-market-booth-details": "Edit Market Booth Details",
      "delete-this-market-booth": "Delete this Market Booth",
      "add-or-update-image": "Add or update image",
    },
    offers: {
      Details: "Offer details",
      "title-plural": "Offers",
      "create-new-offer": "Create a new Offer",
      "edit-offer": "Edit Offer",
      "delete-this-offer": "Delete this Offer",
      "add-image": "Add image",
    },
  },
  "main-navigation": {
    actions: {
      "sign-in": "Sign In",
    },
    links: {
      "market-booths": "Market Booths",
      offers: "Offers",
      dashboard: "Dashboard",
      "user-settings": "User Settings",
      community: "Community",
    },
    settings: {
      "switch-to-light-mode": "Switch to light mode",
      "switch-to-dark-mode": "Switch to dark mode",
      "change-language": "Language / Sprache",
    },
  },
  "user-settings-page": {
    title: "User Settings",
    "payment-integration": {
      title: "Payment Providers",
      stripe: {
        title: "Stripe",
        "start-integration": "Integrate Stripe",
        "continue-integration": "Continue Stripe integration",
        "remove-integration": "Remove Stripe integration",
      },
    },
    "market-booths-subtitle": "Configure Market Booths",
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
    "create-your-online-market-booth-and-build-your-brand":
      "Create your online Market Booth and build your brand",
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
    "main-paragraph":
      "People's Markets is an online platform where businesses and people can offer their goods while building their brand and market appearance.",
    "community-paragraph": "Get involved in any aspect of the project.",
  },
};
