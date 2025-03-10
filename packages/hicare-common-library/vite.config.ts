/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';
import tsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json';

const getPackageName = () => {
    return packageJson.name.split('/')[1];
};

const getPackageNameCamelCase = () => {
    try {
        return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
    } catch (err) {
        throw new Error('Name property in package.json is missing.');
    }
};

const fileName = {
    es: `${getPackageName()}.mjs`,
    umd: `${getPackageName()}.js`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

export default defineConfig({
    base: './',
    build: {
        outDir: './dist',
        rollupOptions: {
            output: {
                extend: true,
            },
        },
        lib: {
            entry: path.resolve(__dirname, 'lib/index.ts'),
            name: getPackageNameCamelCase(),
            formats,
            fileName: (format) => {
                return fileName[format];
            },
        },
    },
    test: {},
    plugins: [tsconfigPaths(), commonjs()],
});
