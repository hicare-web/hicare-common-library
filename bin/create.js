// lerna create package

import os from 'os';
import path from "path";
import fs from "fs/promises";
import child_process from "child_process";
import { program } from "commander";

program.option("-n, --name <name>", "package name");
program.parse();

const options = program.opts();
if (!options.name) {
    console.error("name is required");
    process.exit(1);
}

const currentPath = process.cwd();

async function getRootPath() {
    let current = currentPath;
    while (current !== os.homedir()) {
        const files = await fs.readdir(current);
        if (files.includes("package.json")) {
            return current;
        }
        current = path.resolve(current, "..");
    }
    return null;
}

const rootPath = await getRootPath();
if (!rootPath) {
    console.error("Can't find lerna root path");
    process.exit(1);
}

const binPath = path.resolve(rootPath, "bin");
const lernaJson = await fs.readFile(path.resolve(rootPath, "lerna.json"), "utf-8");
const npmClient = JSON.parse(lernaJson).npmClient;
const packagesPath = JSON.parse(lernaJson).packages
if (!npmClient) {
    console.error("Can't find npmClient in lerna.json");
    process.exit(1);
}
if (!packagesPath) {
    console.error("Can't find packages path");
    process.exit(1);
}

let npmClientExec = "npx";
if (npmClient === "yarn" || npmClient === "pnpm") {
    npmClientExec = `${npmClient} dlx`;
}

const parsedPackagesPathList = packagesPath;
if (!Array.isArray(parsedPackagesPathList)) {
    console.error("packages path should be an array");
    process.exit(1);
}



const [tsconfigFile, viteConfigFile, dtsBundleGenerator] = await Promise.all([
    fs.readFile(path.join(binPath, "tsconfig.json"), "utf-8"),
    fs.readFile(path.join(binPath, "vite.config.ts"), "utf-8"),
    fs.readFile(path.join(binPath, "dts-bundle-generator.config.ts"), "utf-8")
]);

for (let parsedPackagesPath of parsedPackagesPathList) {
    parsedPackagesPath = parsedPackagesPath.split("/")[0];
    console.log("[run exec]", `${npmClientExec} lerna create @${parsedPackagesPath}/${options.name} --yes`);
    await new Promise((resolve, reject) => {
        child_process.exec(`${npmClientExec} lerna create @${parsedPackagesPath}/${options.name} --yes`, {}, async(error, stdout, stderr) => {
            if (error) {
                console.error(stderr);
                reject(error);
            } else {
                const createdPackagePath = path.resolve(rootPath, "packages", options.name);
                const packageJsonPath = path.resolve(createdPackagePath, "package.json");
                const packageJson = await fs.readFile(packageJsonPath, "utf-8");
                const parsedPackageJson = JSON.parse(packageJson);
                parsedPackageJson.exports = {
                    '.': {
                        import: `./dist/${options.name}.js`,
                        require: `./dist/${options.name}.cjs`
                    },
                    './dist': {
                        import: `./dist/`,
                        require: `./dist/`
                    }
                }
                parsedPackageJson.types = `./dist/${options.name}.d.ts`;
                parsedPackageJson.devDependencies = {
                    "root": "file:../../",
                };
                parsedPackageJson.scripts = {
                    "dev": "vite --host",
                    "build": "del-cli build/**/* && tsc && vite build && dts-bundle-generator --config ./dts-bundle-generator.config.ts && copyfiles ./package.json build",
                    "test": "vitest",
                    "test:coverage": "vitest --coverage"
                };

                await fs.writeFile(packageJsonPath, JSON.stringify(parsedPackageJson, null, 2));
                await fs.writeFile(path.resolve(createdPackagePath, "tsconfig.json"), tsconfigFile);
                await fs.writeFile(path.resolve(createdPackagePath, "vite.config.ts"), viteConfigFile);
                await fs.writeFile(path.resolve(createdPackagePath, "dts-bundle-generator.config.ts"), dtsBundleGenerator);
                resolve();
            }
        });
    });
}