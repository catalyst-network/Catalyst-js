export function bytesFromString(value: string) {
  const u8a = new Uint8Array(value.length);

  for (let i = 0; i < value.length; i += 1) {
    u8a[i] = value.charCodeAt(i);
  }

  return u8a;
}

// export function bytesFromHexString(hexString: string) {
//   return new Uint8Array(
//     hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)),
//   );
// }

export function bytesFromHexString(str: string) {
  if (!str) {
    return new Uint8Array();
  }
  const a = [];
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }
  return new Uint8Array(a);
}
