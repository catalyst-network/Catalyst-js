let wasm;
const { TextDecoder } = require(String.raw`util`);

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 1);
    getUint8Memory().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachegetInt32Memory = null;
function getInt32Memory() {
    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory;
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}
/**
* @param {Uint8Array} private_key
* @returns {Uint8Array}
*/
module.exports.public_key_from_private = function(private_key) {
    const retptr = 8;
    const ret = wasm.public_key_from_private(retptr, passArray8ToWasm(private_key), WASM_VECTOR_LEN);
    const memi32 = getInt32Memory();
    const v0 = getArrayU8FromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
    wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
    return v0;
};

/**
*/
module.exports.init_panic_hook = function() {
    wasm.init_panic_hook();
};

/**
* @param {Uint8Array} signature
* @param {Uint8Array} private_key
* @param {Uint8Array} message
* @param {Uint8Array} context
* @param {number} context_length
* @returns {number}
*/
module.exports.sign = function(signature, private_key, message, context, context_length) {
    const ptr0 = passArray8ToWasm(signature);
    const len0 = WASM_VECTOR_LEN;
    try {
        const ret = wasm.sign(ptr0, len0, passArray8ToWasm(private_key), WASM_VECTOR_LEN, passArray8ToWasm(message), WASM_VECTOR_LEN, passArray8ToWasm(context), WASM_VECTOR_LEN, context_length);
        return ret;
    } finally {
        signature.set(getUint8Memory().subarray(ptr0 / 1, ptr0 / 1 + len0));
        wasm.__wbindgen_free(ptr0, len0 * 1);
    }
};

/**
* @param {Uint8Array} signature
* @param {Uint8Array} public_key
* @param {Uint8Array} message
* @param {Uint8Array} context
* @param {number} context_length
* @returns {number}
*/
module.exports.verify = function(signature, public_key, message, context, context_length) {
    const ret = wasm.verify(passArray8ToWasm(signature), WASM_VECTOR_LEN, passArray8ToWasm(public_key), WASM_VECTOR_LEN, passArray8ToWasm(message), WASM_VECTOR_LEN, passArray8ToWasm(context), WASM_VECTOR_LEN, context_length);
    return ret;
};

/**
* @param {Uint8Array} pair
* @param {Uint8Array} private_key
* @param {Uint8Array} message
* @param {Uint8Array} context
* @param {number} context_length
* @returns {number}
*/
module.exports.sign_sig_and_public_key = function(pair, private_key, message, context, context_length) {
    const ptr0 = passArray8ToWasm(pair);
    const len0 = WASM_VECTOR_LEN;
    try {
        const ret = wasm.sign_sig_and_public_key(ptr0, len0, passArray8ToWasm(private_key), WASM_VECTOR_LEN, passArray8ToWasm(message), WASM_VECTOR_LEN, passArray8ToWasm(context), WASM_VECTOR_LEN, context_length);
        return ret;
    } finally {
        pair.set(getUint8Memory().subarray(ptr0 / 1, ptr0 / 1 + len0));
        wasm.__wbindgen_free(ptr0, len0 * 1);
    }
};

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

let cachegetNodeBufferMemory = null;
function getNodeBufferMemory() {
    if (cachegetNodeBufferMemory === null || cachegetNodeBufferMemory.buffer !== wasm.memory.buffer) {
        cachegetNodeBufferMemory = Buffer.from(wasm.memory.buffer);
    }
    return cachegetNodeBufferMemory;
}

function passStringToWasm(arg) {

    const len = Buffer.byteLength(arg);
    const ptr = wasm.__wbindgen_malloc(len);
    getNodeBufferMemory().write(arg, ptr, len);
    WASM_VECTOR_LEN = len;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

module.exports.__wbg_new_59cb74e423758ede = function() {
    const ret = new Error();
    return addHeapObject(ret);
};

module.exports.__wbg_stack_558ba5917b466edd = function(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ret0 = passStringToWasm(ret);
    const ret1 = WASM_VECTOR_LEN;
    getInt32Memory()[arg0 / 4 + 0] = ret0;
    getInt32Memory()[arg0 / 4 + 1] = ret1;
};

module.exports.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
    const v0 = getStringFromWasm(arg0, arg1).slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);
    console.error(v0);
};

module.exports.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm(arg0, arg1));
};
wasm = require('./index_bg');

