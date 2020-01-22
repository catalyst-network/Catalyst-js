function start(wasm) {
    console.log('All modules loaded');
    return wasm;
}

async function load() {
    return start(await import('pkg/index'));
}

export default load;
