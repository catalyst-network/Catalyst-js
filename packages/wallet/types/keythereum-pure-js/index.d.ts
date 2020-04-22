declare module 'keythereum-pure-js' {
export const browser: boolean;

export const constants: {
    cipher: string;
    ivBytes: number;
    keyBytes: number;
    pbkdf2: {
        c: number;
        dklen: number;
        hash: string;
        prf: string;
    };
    scrypt: {
        dklen: number;
        memory: number;
        n: number;
        p: number;
        r: number;
    };
};

export const scrypt: any;

export const version: string;

export function create(params: any, cb: any): any;

export function decrypt(ciphertext: any, key: any, iv: any, algo: any): any;

export function deriveKey(password: any, salt: any, options: any, cb: any): any;

export function deriveKeyUsingScryptInBrowser(password: any, salt: any, options: any, cb: any): any;

export function deriveKeyUsingScryptInNode(password: any, salt: any, options: any, cb: any): any;

export function dump(password: any, privateKey: any, salt: any, iv: any, options: any, cb: any): any;

export function encrypt(plaintext: any, key: any, iv: any, algo: any): any;

export function exportToFile(keyObject: any, keystore: any, cb: any): any;

export function generateKeystoreFilename(address: any): any;

export function getMAC(derivedKey: any, ciphertext: any): any;

export function importFromFile(address: any, datadir: any, cb: any): any;

export function isBase64(str: any): any;

export function isCipherAvailable(cipher: any): any;

export function isHex(str: any): any;

export function marshal(derivedKey: any, privateKey: any, salt: any, iv: any, options: any): any;

export function privateKeyToAddress(privateKey: any): any;

export function recover(password: any, keyObject: any): any;

export function str2buf(str: any, enc: any): any;

export namespace crypto {
    class DiffieHellman {
        constructor(sizeOrKey: any, keyEncoding: any, generator: any, genEncoding: any);

        computeSecret(key: any, inEnc: any, outEnc: any): any;

        generateKeys(encoding: any): any;

        getGenerator(encoding: any): any;

        getPrime(encoding: any): any;

        getPrivateKey(encoding: any): any;

        getPublicKey(encoding: any): any;

        setPrivateKey(key: any, encoding: any): any;

        setPublicKey(key: any, encoding: any): any;

    }

    class DiffieHellmanGroup {
        constructor(name: any);

        computeSecret(key: any, inEnc: any, outEnc: any): any;

        generateKeys(encoding: any): any;

        getGenerator(encoding: any): any;

        getPrime(encoding: any): any;

        getPrivateKey(encoding: any): any;

        getPublicKey(encoding: any): any;

    }

    class Sign {
        constructor(algorithm: any, options: any);

        sign(options: any, encoding: any): any;

        update(data: any, encoding: any): any;

        static defaultMaxListeners: number;

        static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

        static init(): void;

        static listenerCount(emitter: any, type: any): any;

        static once(emitter: any, name: any): any;

        static pipeline(streams: any): any;

        static usingDomains: boolean;

    }

    class Verify {
        constructor(algorithm: any, options: any);

        update(data: any, encoding: any): any;

        verify(options: any, signature: any, sigEncoding: any): any;

        static defaultMaxListeners: number;

        static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

        static init(): void;

        static listenerCount(emitter: any, type: any): any;

        static once(emitter: any, name: any): any;

        static pipeline(streams: any): any;

        static usingDomains: boolean;

    }

    const constants: {
        ALPN_ENABLED: number;
        DH_CHECK_P_NOT_PRIME: number;
        DH_CHECK_P_NOT_SAFE_PRIME: number;
        DH_NOT_SUITABLE_GENERATOR: number;
        DH_UNABLE_TO_CHECK_GENERATOR: number;
        NPN_ENABLED: number;
        POINT_CONVERSION_COMPRESSED: number;
        POINT_CONVERSION_HYBRID: number;
        POINT_CONVERSION_UNCOMPRESSED: number;
        RSA_NO_PADDING: number;
        RSA_PKCS1_OAEP_PADDING: number;
        RSA_PKCS1_PADDING: number;
        RSA_PKCS1_PSS_PADDING: number;
        RSA_SSLV23_PADDING: number;
        RSA_X931_PADDING: number;
    };

    function Cipher(args: any): any;

    function Cipheriv(cipher: any, key: any, iv: any, options: any): any;

    function Decipher(args: any): any;

    function Decipheriv(cipher: any, key: any, iv: any, options: any): any;

    function Hash(algorithm: any, options: any): any;

    function Hmac(hmac: any, key: any, options: any): any;

    function createCipher(args: any): any;

    function createCipheriv(cipher: any, key: any, iv: any, options: any): any;

    function createCredentials(): void;

    function createDecipher(args: any): any;

    function createDecipheriv(cipher: any, key: any, iv: any, options: any): any;

    function createDiffieHellman(sizeOrKey: any, keyEncoding: any, generator: any, genEncoding: any): any;

    function createDiffieHellmanGroup(name: any): any;

    function createECDH(curve: any): any;

    function createHash(algorithm: any, options: any): any;

    function createHmac(hmac: any, key: any, options: any): any;

    function createSign(algorithm: any, options: any): any;

    function createVerify(algorithm: any, options: any): any;

    function getCiphers(): any;

    function getDiffieHellman(name: any): any;

    function getHashes(): any;

    function listCiphers(): any;

    function pbkdf2(password: any, salt: any, iterations: any, keylen: any, digest: any, callback: any): any;

    function pbkdf2Sync(password: any, salt: any, iterations: any, keylen: any, digest: any): any;

    function privateDecrypt(options: any, buffer: any): any;

    function privateEncrypt(options: any, buffer: any): any;

    function prng(size: any, cb: any): any;

    function pseudoRandomBytes(size: any, cb: any): any;

    function publicDecrypt(options: any, buffer: any): any;

    function publicEncrypt(options: any, buffer: any): any;

    function randomBytes(size: any, cb: any): any;

    function randomFill(buf: any, offset: any, size: any, cb: any): any;

    function randomFillSync(buf: any, offset: any, size: any): any;

    function rng(size: any, cb: any): any;

    namespace Sign {
        class Duplex {
            constructor(options: any);

            cork(): void;

            end(chunk: any, encoding: any, cb: any): any;

            setDefaultEncoding(encoding: any): any;

            uncork(): void;

            write(chunk: any, encoding: any, cb: any): any;

            static Duplex: any;

            static ReadableState(options: any, stream: any, isDuplex: any): void;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static from(iterable: any, opts: any): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class EventEmitter {
            constructor();

            addListener(type: any, listener: any): any;

            emit(type: any, args: any): any;

            eventNames(): any;

            getMaxListeners(): any;

            listenerCount(type: any): any;

            listeners(type: any): any;

            off(type: any, listener: any): any;

            on(type: any, listener: any): any;

            once(type: any, listener: any): any;

            prependListener(type: any, listener: any): any;

            prependOnceListener(type: any, listener: any): any;

            rawListeners(type: any): any;

            removeAllListeners(type: any, ...args: any[]): any;

            removeListener(type: any, listener: any): any;

            setMaxListeners(n: any): any;

            static EventEmitter: any;

            static defaultMaxListeners: number;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static usingDomains: boolean;

        }

        class PassThrough {
            constructor(options: any);

            static PassThrough: any;

            static ReadableState(options: any, stream: any, isDuplex: any): void;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static from(iterable: any, opts: any): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class Readable {
            constructor(options: any);

            addListener(ev: any, fn: any): any;

            destroy(err: any, cb: any): any;

            isPaused(): any;

            off(ev: any, fn: any): any;

            on(ev: any, fn: any): any;

            pause(): any;

            pipe(dest: any, pipeOpts: any): any;

            push(chunk: any, encoding: any): any;

            read(n: any): any;

            removeAllListeners(ev: any, ...args: any[]): any;

            removeListener(ev: any, fn: any): any;

            resume(): any;

            setEncoding(enc: any): any;

            unpipe(dest: any): any;

            unshift(chunk: any, encoding: any): any;

            wrap(stream: any, ...args: any[]): any;

            static Readable: any;

            static ReadableState(options: any, stream: any, isDuplex: any): void;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static from(iterable: any, opts: any): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class Stream {
            constructor();

            pipe(dest: any, options: any): any;

            static Stream: any;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class Transform {
            constructor(options: any);

            push(chunk: any, encoding: any): any;

            static ReadableState(options: any, stream: any, isDuplex: any): void;

            static Transform: any;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static from(iterable: any, opts: any): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class Writable {
            constructor(options: any);

            cork(): void;

            destroy(err: any, cb: any): any;

            end(chunk: any, encoding: any, cb: any): any;

            pipe(): void;

            setDefaultEncoding(encoding: any): any;

            uncork(): void;

            write(chunk: any, encoding: any, cb: any): any;

            static Writable: any;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class WritableState {
            constructor(options: any, stream: any, isDuplex: any);

            getBuffer(): any;

        }

        namespace Duplex {
            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class PassThrough {
                constructor(options: any);

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Readable {
                constructor(options: any);

                addListener(ev: any, fn: any): any;

                destroy(err: any, cb: any): any;

                isPaused(): any;

                off(ev: any, fn: any): any;

                on(ev: any, fn: any): any;

                pause(): any;

                pipe(dest: any, pipeOpts: any): any;

                push(chunk: any, encoding: any): any;

                read(n: any): any;

                removeAllListeners(ev: any, ...args: any[]): any;

                removeListener(ev: any, fn: any): any;

                resume(): any;

                setEncoding(enc: any): any;

                unpipe(dest: any): any;

                unshift(chunk: any, encoding: any): any;

                wrap(stream: any, ...args: any[]): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Stream {
                constructor();

                pipe(dest: any, options: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Transform {
                constructor(options: any);

                push(chunk: any, encoding: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Writable {
                constructor(options: any);

                cork(): void;

                destroy(err: any, cb: any): any;

                end(chunk: any, encoding: any, cb: any): any;

                pipe(): void;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static WritableState: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

        }

        namespace PassThrough {
            class Duplex {
                constructor(options: any);

                cork(): void;

                end(chunk: any, encoding: any, cb: any): any;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class Readable {
                constructor(options: any);

                addListener(ev: any, fn: any): any;

                destroy(err: any, cb: any): any;

                isPaused(): any;

                off(ev: any, fn: any): any;

                on(ev: any, fn: any): any;

                pause(): any;

                pipe(dest: any, pipeOpts: any): any;

                push(chunk: any, encoding: any): any;

                read(n: any): any;

                removeAllListeners(ev: any, ...args: any[]): any;

                removeListener(ev: any, fn: any): any;

                resume(): any;

                setEncoding(enc: any): any;

                unpipe(dest: any): any;

                unshift(chunk: any, encoding: any): any;

                wrap(stream: any, ...args: any[]): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Stream {
                constructor();

                pipe(dest: any, options: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Transform {
                constructor(options: any);

                push(chunk: any, encoding: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Writable {
                constructor(options: any);

                cork(): void;

                destroy(err: any, cb: any): any;

                end(chunk: any, encoding: any, cb: any): any;

                pipe(): void;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static WritableState: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

        }

        namespace Readable {
            class Duplex {
                constructor(options: any);

                cork(): void;

                end(chunk: any, encoding: any, cb: any): any;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class PassThrough {
                constructor(options: any);

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Stream {
                constructor();

                pipe(dest: any, options: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Transform {
                constructor(options: any);

                push(chunk: any, encoding: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Writable {
                constructor(options: any);

                cork(): void;

                destroy(err: any, cb: any): any;

                end(chunk: any, encoding: any, cb: any): any;

                pipe(): void;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static WritableState: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

        }

        namespace Stream {
            class Duplex {
                constructor(options: any);

                cork(): void;

                end(chunk: any, encoding: any, cb: any): any;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class PassThrough {
                constructor(options: any);

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Readable {
                constructor(options: any);

                addListener(ev: any, fn: any): any;

                destroy(err: any, cb: any): any;

                isPaused(): any;

                off(ev: any, fn: any): any;

                on(ev: any, fn: any): any;

                pause(): any;

                pipe(dest: any, pipeOpts: any): any;

                push(chunk: any, encoding: any): any;

                read(n: any): any;

                removeAllListeners(ev: any, ...args: any[]): any;

                removeListener(ev: any, fn: any): any;

                resume(): any;

                setEncoding(enc: any): any;

                unpipe(dest: any): any;

                unshift(chunk: any, encoding: any): any;

                wrap(stream: any, ...args: any[]): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Transform {
                constructor(options: any);

                push(chunk: any, encoding: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Writable {
                constructor(options: any);

                cork(): void;

                destroy(err: any, cb: any): any;

                end(chunk: any, encoding: any, cb: any): any;

                pipe(): void;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static WritableState: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

        }

        namespace Transform {
            class Duplex {
                constructor(options: any);

                cork(): void;

                end(chunk: any, encoding: any, cb: any): any;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class PassThrough {
                constructor(options: any);

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Readable {
                constructor(options: any);

                addListener(ev: any, fn: any): any;

                destroy(err: any, cb: any): any;

                isPaused(): any;

                off(ev: any, fn: any): any;

                on(ev: any, fn: any): any;

                pause(): any;

                pipe(dest: any, pipeOpts: any): any;

                push(chunk: any, encoding: any): any;

                read(n: any): any;

                removeAllListeners(ev: any, ...args: any[]): any;

                removeListener(ev: any, fn: any): any;

                resume(): any;

                setEncoding(enc: any): any;

                unpipe(dest: any): any;

                unshift(chunk: any, encoding: any): any;

                wrap(stream: any, ...args: any[]): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Stream {
                constructor();

                pipe(dest: any, options: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Writable {
                constructor(options: any);

                cork(): void;

                destroy(err: any, cb: any): any;

                end(chunk: any, encoding: any, cb: any): any;

                pipe(): void;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static WritableState: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

        }

        namespace Writable {
            class Duplex {
                constructor(options: any);

                cork(): void;

                end(chunk: any, encoding: any, cb: any): any;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class PassThrough {
                constructor(options: any);

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Readable {
                constructor(options: any);

                addListener(ev: any, fn: any): any;

                destroy(err: any, cb: any): any;

                isPaused(): any;

                off(ev: any, fn: any): any;

                on(ev: any, fn: any): any;

                pause(): any;

                pipe(dest: any, pipeOpts: any): any;

                push(chunk: any, encoding: any): any;

                read(n: any): any;

                removeAllListeners(ev: any, ...args: any[]): any;

                removeListener(ev: any, fn: any): any;

                resume(): any;

                setEncoding(enc: any): any;

                unpipe(dest: any): any;

                unshift(chunk: any, encoding: any): any;

                wrap(stream: any, ...args: any[]): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Stream {
                constructor();

                pipe(dest: any, options: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Transform {
                constructor(options: any);

                push(chunk: any, encoding: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class WritableState {
                constructor(options: any, stream: any, isDuplex: any);

                getBuffer(): any;

            }

        }

    }

    namespace Verify {
        class Duplex {
            constructor(options: any);

            cork(): void;

            end(chunk: any, encoding: any, cb: any): any;

            setDefaultEncoding(encoding: any): any;

            uncork(): void;

            write(chunk: any, encoding: any, cb: any): any;

            static Duplex: any;

            static ReadableState(options: any, stream: any, isDuplex: any): void;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static from(iterable: any, opts: any): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class EventEmitter {
            constructor();

            addListener(type: any, listener: any): any;

            emit(type: any, args: any): any;

            eventNames(): any;

            getMaxListeners(): any;

            listenerCount(type: any): any;

            listeners(type: any): any;

            off(type: any, listener: any): any;

            on(type: any, listener: any): any;

            once(type: any, listener: any): any;

            prependListener(type: any, listener: any): any;

            prependOnceListener(type: any, listener: any): any;

            rawListeners(type: any): any;

            removeAllListeners(type: any, ...args: any[]): any;

            removeListener(type: any, listener: any): any;

            setMaxListeners(n: any): any;

            static EventEmitter: any;

            static defaultMaxListeners: number;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static usingDomains: boolean;

        }

        class PassThrough {
            constructor(options: any);

            static PassThrough: any;

            static ReadableState(options: any, stream: any, isDuplex: any): void;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static from(iterable: any, opts: any): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class Readable {
            constructor(options: any);

            addListener(ev: any, fn: any): any;

            destroy(err: any, cb: any): any;

            isPaused(): any;

            off(ev: any, fn: any): any;

            on(ev: any, fn: any): any;

            pause(): any;

            pipe(dest: any, pipeOpts: any): any;

            push(chunk: any, encoding: any): any;

            read(n: any): any;

            removeAllListeners(ev: any, ...args: any[]): any;

            removeListener(ev: any, fn: any): any;

            resume(): any;

            setEncoding(enc: any): any;

            unpipe(dest: any): any;

            unshift(chunk: any, encoding: any): any;

            wrap(stream: any, ...args: any[]): any;

            static Readable: any;

            static ReadableState(options: any, stream: any, isDuplex: any): void;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static from(iterable: any, opts: any): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class Stream {
            constructor();

            pipe(dest: any, options: any): any;

            static Stream: any;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class Transform {
            constructor(options: any);

            push(chunk: any, encoding: any): any;

            static ReadableState(options: any, stream: any, isDuplex: any): void;

            static Transform: any;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static from(iterable: any, opts: any): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class Writable {
            constructor(options: any);

            cork(): void;

            destroy(err: any, cb: any): any;

            end(chunk: any, encoding: any, cb: any): any;

            pipe(): void;

            setDefaultEncoding(encoding: any): any;

            uncork(): void;

            write(chunk: any, encoding: any, cb: any): any;

            static Writable: any;

            static defaultMaxListeners: number;

            static finished(stream: any, opts: any, callback: any, ...args: any[]): any;

            static init(): void;

            static listenerCount(emitter: any, type: any): any;

            static once(emitter: any, name: any): any;

            static pipeline(streams: any): any;

            static usingDomains: boolean;

        }

        class WritableState {
            constructor(options: any, stream: any, isDuplex: any);

            getBuffer(): any;

        }

        namespace Duplex {
            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class PassThrough {
                constructor(options: any);

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Readable {
                constructor(options: any);

                addListener(ev: any, fn: any): any;

                destroy(err: any, cb: any): any;

                isPaused(): any;

                off(ev: any, fn: any): any;

                on(ev: any, fn: any): any;

                pause(): any;

                pipe(dest: any, pipeOpts: any): any;

                push(chunk: any, encoding: any): any;

                read(n: any): any;

                removeAllListeners(ev: any, ...args: any[]): any;

                removeListener(ev: any, fn: any): any;

                resume(): any;

                setEncoding(enc: any): any;

                unpipe(dest: any): any;

                unshift(chunk: any, encoding: any): any;

                wrap(stream: any, ...args: any[]): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Stream {
                constructor();

                pipe(dest: any, options: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Transform {
                constructor(options: any);

                push(chunk: any, encoding: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Writable {
                constructor(options: any);

                cork(): void;

                destroy(err: any, cb: any): any;

                end(chunk: any, encoding: any, cb: any): any;

                pipe(): void;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static WritableState: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

        }

        namespace PassThrough {
            class Duplex {
                constructor(options: any);

                cork(): void;

                end(chunk: any, encoding: any, cb: any): any;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class Readable {
                constructor(options: any);

                addListener(ev: any, fn: any): any;

                destroy(err: any, cb: any): any;

                isPaused(): any;

                off(ev: any, fn: any): any;

                on(ev: any, fn: any): any;

                pause(): any;

                pipe(dest: any, pipeOpts: any): any;

                push(chunk: any, encoding: any): any;

                read(n: any): any;

                removeAllListeners(ev: any, ...args: any[]): any;

                removeListener(ev: any, fn: any): any;

                resume(): any;

                setEncoding(enc: any): any;

                unpipe(dest: any): any;

                unshift(chunk: any, encoding: any): any;

                wrap(stream: any, ...args: any[]): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Stream {
                constructor();

                pipe(dest: any, options: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Transform {
                constructor(options: any);

                push(chunk: any, encoding: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Writable {
                constructor(options: any);

                cork(): void;

                destroy(err: any, cb: any): any;

                end(chunk: any, encoding: any, cb: any): any;

                pipe(): void;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static WritableState: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

        }

        namespace Readable {
            class Duplex {
                constructor(options: any);

                cork(): void;

                end(chunk: any, encoding: any, cb: any): any;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class PassThrough {
                constructor(options: any);

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Stream {
                constructor();

                pipe(dest: any, options: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Transform {
                constructor(options: any);

                push(chunk: any, encoding: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Writable {
                constructor(options: any);

                cork(): void;

                destroy(err: any, cb: any): any;

                end(chunk: any, encoding: any, cb: any): any;

                pipe(): void;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static WritableState: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

        }

        namespace Stream {
            class Duplex {
                constructor(options: any);

                cork(): void;

                end(chunk: any, encoding: any, cb: any): any;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class PassThrough {
                constructor(options: any);

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Readable {
                constructor(options: any);

                addListener(ev: any, fn: any): any;

                destroy(err: any, cb: any): any;

                isPaused(): any;

                off(ev: any, fn: any): any;

                on(ev: any, fn: any): any;

                pause(): any;

                pipe(dest: any, pipeOpts: any): any;

                push(chunk: any, encoding: any): any;

                read(n: any): any;

                removeAllListeners(ev: any, ...args: any[]): any;

                removeListener(ev: any, fn: any): any;

                resume(): any;

                setEncoding(enc: any): any;

                unpipe(dest: any): any;

                unshift(chunk: any, encoding: any): any;

                wrap(stream: any, ...args: any[]): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Transform {
                constructor(options: any);

                push(chunk: any, encoding: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Writable {
                constructor(options: any);

                cork(): void;

                destroy(err: any, cb: any): any;

                end(chunk: any, encoding: any, cb: any): any;

                pipe(): void;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static WritableState: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

        }

        namespace Transform {
            class Duplex {
                constructor(options: any);

                cork(): void;

                end(chunk: any, encoding: any, cb: any): any;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class PassThrough {
                constructor(options: any);

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Readable {
                constructor(options: any);

                addListener(ev: any, fn: any): any;

                destroy(err: any, cb: any): any;

                isPaused(): any;

                off(ev: any, fn: any): any;

                on(ev: any, fn: any): any;

                pause(): any;

                pipe(dest: any, pipeOpts: any): any;

                push(chunk: any, encoding: any): any;

                read(n: any): any;

                removeAllListeners(ev: any, ...args: any[]): any;

                removeListener(ev: any, fn: any): any;

                resume(): any;

                setEncoding(enc: any): any;

                unpipe(dest: any): any;

                unshift(chunk: any, encoding: any): any;

                wrap(stream: any, ...args: any[]): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Stream {
                constructor();

                pipe(dest: any, options: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Writable {
                constructor(options: any);

                cork(): void;

                destroy(err: any, cb: any): any;

                end(chunk: any, encoding: any, cb: any): any;

                pipe(): void;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static WritableState: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

        }

        namespace Writable {
            class Duplex {
                constructor(options: any);

                cork(): void;

                end(chunk: any, encoding: any, cb: any): any;

                setDefaultEncoding(encoding: any): any;

                uncork(): void;

                write(chunk: any, encoding: any, cb: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class EventEmitter {
                constructor();

                addListener(type: any, listener: any): any;

                emit(type: any, args: any): any;

                eventNames(): any;

                getMaxListeners(): any;

                listenerCount(type: any): any;

                listeners(type: any): any;

                off(type: any, listener: any): any;

                on(type: any, listener: any): any;

                once(type: any, listener: any): any;

                prependListener(type: any, listener: any): any;

                prependOnceListener(type: any, listener: any): any;

                rawListeners(type: any): any;

                removeAllListeners(type: any, ...args: any[]): any;

                removeListener(type: any, listener: any): any;

                setMaxListeners(n: any): any;

                static EventEmitter: any;

                static defaultMaxListeners: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static usingDomains: any;

            }

            class PassThrough {
                constructor(options: any);

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Readable {
                constructor(options: any);

                addListener(ev: any, fn: any): any;

                destroy(err: any, cb: any): any;

                isPaused(): any;

                off(ev: any, fn: any): any;

                on(ev: any, fn: any): any;

                pause(): any;

                pipe(dest: any, pipeOpts: any): any;

                push(chunk: any, encoding: any): any;

                read(n: any): any;

                removeAllListeners(ev: any, ...args: any[]): any;

                removeListener(ev: any, fn: any): any;

                resume(): any;

                setEncoding(enc: any): any;

                unpipe(dest: any): any;

                unshift(chunk: any, encoding: any): any;

                wrap(stream: any, ...args: any[]): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Stream {
                constructor();

                pipe(dest: any, options: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class Transform {
                constructor(options: any);

                push(chunk: any, encoding: any): any;

                static Duplex: any;

                static EventEmitter: any;

                static PassThrough: any;

                static Readable: any;

                static ReadableState: any;

                static Stream: any;

                static Transform: any;

                static Writable: any;

                static defaultMaxListeners: any;

                static finished: any;

                static from: any;

                static init: any;

                static listenerCount: any;

                static once: any;

                static pipeline: any;

                static usingDomains: any;

            }

            class WritableState {
                constructor(options: any, stream: any, isDuplex: any);

                getBuffer(): any;

            }

        }

    }

}
}