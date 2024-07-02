import os from 'os';
import fs from 'fs/promises';
import child_process from 'child_process';
import path from 'node:path';

const platform = os.platform();
const arch = os.arch();

const isWindows = platform === 'win32';
const isRustInstalled = await hasRustInstalled() || false;
const installedRustVersion = isRustInstalled ? await getInstalledRustVersion() : "0.0.1";
const installedRustTargets = isRustInstalled ? await getInstalledRustTargets() : "No Rust installed";
const replaceInstalledRustTargets = installedRustTargets.map((v) => v.replace(" (installed)", ""));

const requiredInstalledRustTargets = [
    "x86_64-unknown-linux-gnu",
    "aarch64-unknown-linux-gnu",
    "x86_64-pc-windows-msvc",
    "x86_64-apple-darwin",
    "aarch64-apple-darwin",
]

const targetsNpmFolder = {
    "x86_64-unknown-linux-gnu": "linux-x64-gnu",
    "aarch64-unknown-linux-gnu": 'linux-arm64-gnu',
    "x86_64-pc-windows-msvc": 'win32-x64-msvc',
    "x86_64-apple-darwin": 'darwin-x64',
    "aarch64-apple-darwin": 'darwin-arm64',
}

if (!isRustInstalled) {
    console.error("Rust is not installed.");
    process.exit(1);
}

let isAllowed = true;
for (const requiredInstalledRustTarget of requiredInstalledRustTargets) {
    if (!replaceInstalledRustTargets.includes(requiredInstalledRustTarget)) {
        isAllowed = false;
        console.log(`해당 명령어를 실행하여 cross build 타겟을 추가하세요. rustup target add ${requiredInstalledRustTarget}`);
    }
}

if (!isAllowed) {
    console.error("Required Rust targets are not installed.");
    process.exit(1);
}
const isRequiredInstalledRustTargets = requiredInstalledRustTargets.every((target) => replaceInstalledRustTargets.includes(target));
if (!isRequiredInstalledRustTargets) {
    console.error("Required Rust targets are not installed.");
    process.exit(1);
}

// 서버에서 사용하는 빌드를 실행합니다.
const parrallelBuild = requiredInstalledRustTargets.map((target) => napiBuild(target));

await Promise.all(parrallelBuild);

for (const requiredInstalledRustTarget of requiredInstalledRustTargets) {
    const targetNpmFolder      = targetsNpmFolder[requiredInstalledRustTarget];
    const currentBuildFileName = `hicare_napi.${ targetNpmFolder }.node`;
    const isExist              = await fs.access(`${ currentBuildFileName }`).then(() => true).catch(() => false);
    if (isExist) {
        await fs.rename(currentBuildFileName, path.join('npm', targetNpmFolder, currentBuildFileName));
    }
}

console.log("Build completed.");

async function hasRustInstalled() {
    return new Promise((resolve) => {
        try {
            child_process.exec('rustc --version', (error, stdout, stderr) => {
                if (error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        } catch (error) {
            resolve(false);
        }
    });
}
/* @returns {string} */
async function getInstalledRustVersion() {
    return new Promise((resolve, reject) => {
        child_process.exec('rustc --version', (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                const trimString = stdout.trim();
                const removedRustc = trimString.replace('rustc', '').trim();
                const version = removedRustc.split(' ')[0];
                resolve(version);
            }
        });
    });
}
function grep(pattern, input, options = {}) {
    const {
              ignoreCase = false,
              invertMatch = false,
              onlyMatching = false,
              lineNumber = false
          } = options;

    const flags = ignoreCase ? 'gi' : 'g';
    const regex = new RegExp(pattern, flags);

    const lines = input.split('\n');
    const results = [];

    lines.forEach((line, index) => {
        const matches = line.match(regex);
        const shouldInclude = invertMatch ? !matches : matches;

        if (shouldInclude) {
            let result = '';
            if (lineNumber) {
                result += `${index + 1}:`;
            }
            if (onlyMatching && matches) {
                result += matches.join('\n');
            } else {
                result += line;
            }
            results.push(result);
        }
    });

    return results;
}
async function getInstalledRustTargets() {
    return new Promise((resolve, reject) => {
        child_process.exec('rustup target list', (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(grep("installed", stdout));
            }
        });
    });
}

async function napiBuild(target) {
    return new Promise((resolve, reject) => {
        const buildCommand = [
            "napi",
            "build",
            "--platform",
            "--release",
        ]

        if (target) {
            buildCommand.push(`--target ${target}`);
        }

        const crossCompileList = [
            "x86_64-pc-windows-msvc",
            "x86_64-apple-darwin",
            "aarch64-apple-darwin",
            "aarch64-unknown-linux-gnu",
        ];
        const isCrossCompile = crossCompileList.includes(target);

        if (isCrossCompile) {
            buildCommand.push("--cross-compile");
        }

        // console.log(buildCommand.join(" "));
        child_process.exec(buildCommand.join(" "),(error, stdout, stderr) => {
            if (error) {
                console.log("error", error);
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}
