import _ from "lodash";

export function setDocumentLanguage(lang: string) {
  document.documentElement.lang = lang;
}

export function setDocumentTitle(title: string) {
  document.title = title;
}

export function setDocumentMetaDescription(description: string) {
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", description);
}

export function setFaviconHref(iconUrl: string) {
  const icon = document.getElementById("favicon") as HTMLLinkElement | null;
  if (!_.isNil(icon)) {
    icon.href = iconUrl;
  }
}
