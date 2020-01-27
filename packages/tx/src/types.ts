
export type numOrString = string | number

export interface TxData {
    /**
     * The transaction's gas limit.
     */
    gasLimit?: numOrString
    gas?: numOrString

    /**
     * The transaction's gas price.
     */
    gasPrice?: numOrString

    /**
     * The transaction's the address is sent to.
     */
    to?: string

    /**
     * The transaction's nonce.
     */
    nonce?: numOrString
    /**
     * This will contain the data of the message or the init of a contract
     */
    data?: string

    /**
     * The amount of Ether sent.
     */
    value?: string
  }
