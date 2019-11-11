export function bytesFromString (value) {
    const u8a = new Uint8Array(value.length);
  
    for (let i = 0; i < value.length; i++) {
      u8a[i] = value.charCodeAt(i);
    }
  
    return u8a;
  }

  export function bytesFromHexString( hexString ) {
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
  }