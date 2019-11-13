// Import dependencies.
import path from 'path';

/**
 * Set build.
 * These don't need to change, but feel free to change to your needs.
 */
const config = {
    DIST: path.resolve(__dirname, 'pkg'),
    ENTRY: path.resolve(__dirname, 'js'),
    GITIGNORE: path.resolve(__dirname, '.gitignore'),
    HOST: 'localhost',
    JSOUTPUT: 'index.js',
    OUTPUT: path.resolve(__dirname, 'static'),
    PORT: 9000,
};

// Export build.
export default config;
