/* tslint:disable */
/**
* @param {Uint8Array} private_key
* @returns {Uint8Array}
*/
export function public_key_from_private(private_key: Uint8Array): Uint8Array;
/**
*/
export function init_panic_hook(): void;
/**
* @param {Uint8Array} signature
* @param {Uint8Array} private_key
* @param {Uint8Array} message
* @param {Uint8Array} context
* @param {number} context_length
* @returns {number}
*/
export function sign(signature: Uint8Array, private_key: Uint8Array, message: Uint8Array, context: Uint8Array, context_length: number): number;
/**
* @param {Uint8Array} signature
* @param {Uint8Array} public_key
* @param {Uint8Array} message
* @param {Uint8Array} context
* @param {number} context_length
* @returns {number}
*/
export function verify(signature: Uint8Array, public_key: Uint8Array, message: Uint8Array, context: Uint8Array, context_length: number): number;
/**
* @param {Uint8Array} pair
* @param {Uint8Array} private_key
* @param {Uint8Array} message
* @param {Uint8Array} context
* @param {number} context_length
* @returns {number}
*/
export function sign_sig_and_public_key(pair: Uint8Array, private_key: Uint8Array, message: Uint8Array, context: Uint8Array, context_length: number): number;
