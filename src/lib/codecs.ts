import _ from "lodash";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

export function encodeArrayBufferToBase64Url(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.length;
  let base64 = "";

  for (let i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += chars[bytes[i + 2] & 63];
  }

  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1);
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2);
  }

  return base64;
}

export function parseJwtPayload(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function getInitials(num: number, value?: string | null): string {
  if (_.isNil(value) || _.isEmpty(value)) {
    return "";
  }

  const parts = value.split(" ");
  const numberOfPossibleInitials = _.min([parts.length, num]) || 1;

  let initials = "";

  for (let i = 0; i < numberOfPossibleInitials; i++) {
    initials += parts[i][0].toUpperCase();
  }

  return initials;
}

export async function hashCodeVerifier(codeChallenge: string): Promise<string> {
  const plaintextBuffer = new TextEncoder().encode(codeChallenge);
  const hashBuffer = await crypto.subtle.digest("SHA-256", plaintextBuffer);

  return encodeArrayBufferToBase64Url(hashBuffer);
}

export function secondsToLocaleString(seconds?: number): string {
  return seconds ? new Date(seconds * 1000).toLocaleString() : "";
}

export function addHtmlLinebreaks(text?: string): string {
  if (_.isNil(text)) {
    return "";
  }
  return text.replace("\n", "\\");
}
