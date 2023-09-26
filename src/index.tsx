// @refresh reload
import { render } from "solid-js/web";

import "./fonts.scss";
import "./normalize.scss";
import "./theme.scss";

import App from "./App";
import { checkEnvironmentVariables } from "./lib/env";

const root = document.getElementById("root");

checkEnvironmentVariables();

render(() => <App />, root!);
