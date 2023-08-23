import { DE } from "./de";
import { EN } from "./en";
import { TKEYS } from "./dev";
import _ from "lodash";

export const LANGUAGES = {
  english: "en",
  german: "de",
};

export const LOCALES = {
  dev: {
    translation: TKEYS,
  },
  [LANGUAGES.english]: {
    translation: EN,
  },
  [LANGUAGES.german]: {
    translation: DE,
  },
};

export function getNextLanguageKey(currentLanguageKey: string) {
  const languageKeys = _.values(LANGUAGES);

  if (_.isEmpty(languageKeys)) {
    throw new Error("List of languages was empty");
  }

  const currentIndex = _.findIndex(
    languageKeys,
    (key) => key === currentLanguageKey
  );

  const nextIndex = currentIndex + 1;

  if (nextIndex < languageKeys.length) {
    return languageKeys[nextIndex];
  }

  return languageKeys[0];
}
