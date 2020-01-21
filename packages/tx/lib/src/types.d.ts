/// <reference types="node" />
/**
 * Any object that can be transformed into a `Buffer`
 */
export interface TransformableToBuffer {
    toBuffer(): Buffer;
}
/**
 * A hex string prefixed with `0x`.
 */
export declare type PrefixedHexString = string;
/**
 * A Buffer, hex string prefixed with `0x`, Number, or an object with a toBuffer method such as BN.
 */
export declare type BufferLike = Buffer | TransformableToBuffer | PrefixedHexString | number;
export declare type numOrString = string | number;
export interface TxData {
    /**
     * The transaction's gas limit.
     */
    gasLimit?: string;
    /**
     * The transaction's gas price.
     */
    gasPrice?: string;
    /**
     * The transaction's the address is sent to.
     */
    to?: string;
    /**
     * The transaction's nonce.
     */
    nonce?: string;
    /**
     * This will contain the data of the message or the init of a contract
     */
    data?: string;
    /**
     * The amount of Ether sent.
     */
    value?: string;
}
