const ethjsUtil = require('ethjs-util');

export function bytesFromString(value: string): Uint8Array {
  const u8a = new Uint8Array(value.length);

  for (let i = 0; i < value.length; i += 1) {
    u8a[i] = value.charCodeAt(i);
  }

  return u8a;
}

/**
 * Removes "0x" from a given `String` if it starts with "0x".
 */
export function removeHexPrefix(str: string): string {
  if (typeof str !== 'string') {
    return str;
  }

  return ethjsUtil.isHexPrefixed(str) ? str.substring(2) : str;
}

export function bytesFromHexString(str: string): Uint8Array {
  if (!str) {
    return new Uint8Array();
  }

  const value = removeHexPrefix(str);
  const a = [];
  for (let i = 0, len = value.length; i < len; i += 2) {
    a.push(parseInt(value.substr(i, 2), 16));
  }
  return new Uint8Array(a);
}
