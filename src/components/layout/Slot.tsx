import { JSX, children, createComputed, on } from "solid-js";
import { createStore } from "solid-js/store";

export function getSlots(_children: JSX.Element) {
  const parts = children(() => _children);
  const [slots, setSlots] = createStore<Record<string, JSX.Element>>({});

  createComputed(
    on(parts, () => {
      for (const part of parts.toArray() as unknown as Props[]) {
        setSlots(part.name, () => part.children);
      }
    })
  );

  return slots;
}

type Props = {
  name: string;
  children: JSX.Element;
};

export function Slot(props: Props) {
  return props as unknown as JSX.Element;
}
