import { TransProvider } from "@mbarzda/solid-i18next";
import { RouteDataFunc, Router } from "@solidjs/router";
import { Queries, queries, render } from "@solidjs/testing-library";
import { Component, JSX } from "solid-js";
import { expect } from "vitest";

import { AccessTokenProvider } from "../../contexts/AccessTokensContext";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { LOCALES } from "../../locales";

export const SEPARATOR =
  "\n--------------------------------------------------------------------------------\n";

export function errorPrint(message: string): string {
  return `${SEPARATOR}\t${message}${SEPARATOR}`;
}

export function expectNoError(err: any) {
  expect(err).toEqual("");
  unreachable!();
}

export function unreachable() {
  expect("UNREACHABLE reached").toBeUndefined();
}

// borrowed from https://github.com/pablo-abc/felte
export function createDOM(): void {
  const main = document.createElement("root");
  main.id = "root";
  document.body.appendChild(main);
}

// borrowed from https://github.com/pablo-abc/felte
export function cleanupDOM(): void {
  removeAllChildNodes(document.body);
}

// borrowed from https://github.com/pablo-abc/felte
export function removeAllChildNodes(parent: Node): void {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function renderIntoRoot(
  ui: () => JSX.Element,
  options?: {
    baseElement?: HTMLElement;
    queries?: Queries & typeof queries;
    hydrate?: boolean;
    wrapper?: Component<{ children: JSX.Element }>;
    readonly location?: string;
    routeDataFunc?: RouteDataFunc;
  }
): {
  container: HTMLElement;
} {
  const App = () => (
    <Router>
      <TransProvider options={{ load: "all", resources: LOCALES }}>
        <ThemeProvider>
          <AccessTokenProvider>{ui()}</AccessTokenProvider>
        </ThemeProvider>
      </TransProvider>
    </Router>
  );

  return render(App, {
    container: document.getElementById("root")!,
    ...options,
  });
}

export const noObj = {} as any;
export function getNoObj() {
  return noObj;
}
export function noOp() {}

export async function asyncNoOp() {}
