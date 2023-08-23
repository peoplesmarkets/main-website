import MarkdownIt from "markdown-it";
import Mila from "markdown-it-link-attributes";
import Miif from "markdown-it-image-figures";
import _ from "lodash";

let md: MarkdownIt | undefined;

export function getMarkdownItInstance(): MarkdownIt {
  if (!_.isNil(md)) {
    return md;
  }

  md = new MarkdownIt();

  md.normalizeLink = (url: string) => url;

  md.use(Mila, {
    attrs: {
      target: "_blank",
      rel: "external",
    },
  });
  md.use(Miif);

  return md;
}
