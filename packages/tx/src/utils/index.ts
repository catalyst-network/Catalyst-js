import encode from 'base32-encode';
import decode from 'base32-decode';

const ethjsUtil = require('ethjs-util');

/**
 * converts string to bytes
 * @param value string
 */
export function bytesFromString(value: string): Uint8Array {
  const u8a = new Uint8Array(value.length);

  for (let i = 0; i < value.length; i += 1) {
    u8a[i] = value.charCodeAt(i);
  }

  return u8a;
}

/**
 * Removes "0x" from a given `String` if it starts with "0x".
 * @param str hex string with 0x prefix
 */
export function removeHexPrefix(str: string): string {
  if (typeof str !== 'string') {
    return str;
  }
  return ethjsUtil.isHexPrefixed(str) ? str.substring(2) : str;
}

/**
 * converts hex string to bytes
 * @param str hex string
 */
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

/**
 * converts a base32 encoded string to bytes
 * @param str base32 string
 */
export function bytesFromBase32String(str: string) : Uint8Array {
  return new Uint8Array(decode(str, 'RFC4648'));
}

/**
 * coverts bytes to a base32 string
 * @param bytes Uint8Array to be encoded to base32
 */
export function base32StringFromBytes(bytes: Uint8Array) : string {
  return encode(bytes, 'RFC4648', { padding: false });
}
