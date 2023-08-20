import { LANGUAGES } from "@peoplesmarkets/frontend-lib";

import { DE } from "./de";
import { EN } from "./en";
import { TKEYS } from "./dev";

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
