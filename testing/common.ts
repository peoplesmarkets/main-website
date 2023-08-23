import { RouteDataFunc } from "@solidjs/router";
import { Queries, queries, render } from "@solidjs/testing-library";
import { Component, JSX } from "solid-js";
import { expect } from "vitest";

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
  const main = document.createElement("main");
  main.id = "main";
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

export function renderIntoMain(
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
  return render(ui, {
    container: document.getElementById("main")!,
    ...options,
  });
}
