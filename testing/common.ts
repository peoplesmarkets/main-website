export const SEPARATOR =
  "\n--------------------------------------------------------------------------------\n";

export function errorPrint(message: string): string {
  return `${SEPARATOR}\t${message}${SEPARATOR}`;
}
