// @refresh reload
import { render } from "solid-js/web";

import "./theme.scss";

import "@material/web/tabs/primary-tab";
import "@material/web/tabs/secondary-tab";
import "@material/web/tabs/tabs";

import { ComponentProps } from "solid-js";
import App from "./App";
import { checkEnvironmentVariables } from "./lib/env";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-tabs": ComponentProps<"div"> & {};
      "md-primary-tab": ComponentProps<"div"> & {
        active?: boolean | undefined;
      };
      "md-secondary-tab": ComponentProps<"div"> & {
        active?: boolean | undefined;
      };
    }
  }
}

const root = document.getElementById("root");

checkEnvironmentVariables();

render(() => <App />, root!);
