#!/usr/bin/env node
import { Option, program } from "commander";
import { prettifyReadme, prettifySrc } from "./build-prettier";
import { buildDistFiles } from "./build-distfiles";
import { buildTS } from "./build-tsc";
import { bundle } from "./build-bundle";
import { clearDist } from "./build-clear";
import fs from "fs-extra";
import { lint } from "./build-eslint";
import path from "path";
import pkgInfo from "../package.json";

program.name("tsparticles-build");
program.description("tsParticles Builder");
program.version(pkgInfo.version, "-v, --version", "output the current version");
program.addOption(
    new Option(
        "-a, --all",
        "Do all build steps (default if no flags are specified) (same as -b -c -d -l -p -t)"
    ).default(true)
);
program.addOption(new Option("-b, --bundle", "Bundle the library using Webpack").default(false));
program.addOption(new Option("-c, --clean", "Clean the dist folder").default(false));
program.addOption(
    new Option(
        "--ci",
        "Do all build steps for CI, no fixing files, only checking if they are formatted correctly"
    ).default(false)
);
program.addOption(new Option("-d, --dist", "Build the dist files").default(false));
program.addOption(new Option("-l, --lint", "Lint the source files").default(false));
program.addOption(new Option("-p, --prettify", "Prettify the source files").default(false));
program.addOption(new Option("-t, --tsc", "Build the library using TypeScript").default(false));

program.argument("[path]", `Path to the project root folder, default is "src"`);
program.action(async (argPath: string) => {
    const opts = program.opts();

    const ci = !!opts.ci,
        all = !!opts.all,
        doBundle = all || !!opts.bundle,
        clean = all || !!opts.clean,
        distfiles = all || !!opts.dist,
        doLint = all || !!opts.lint,
        prettier = all || !!opts.prettify,
        tsc = all || !!opts.tsc;

    const basePath = process.cwd();

    if (clean) {
        await clearDist(basePath);
    }

    const srcPath = path.join(basePath, argPath);

    if (!(await fs.pathExists(srcPath))) {
        throw new Error("Provided path does not exist");
    }

    let canContinue = true;

    if (canContinue && prettier) {
        canContinue = await prettifySrc(basePath, srcPath, ci);
    }

    if (canContinue && doLint) {
        canContinue = await lint(ci);
    }

    if (canContinue && tsc) {
        canContinue = await buildTS(basePath);
    }

    if (canContinue && doBundle) {
        canContinue = await bundle(basePath);
    }

    if (canContinue && prettier) {
        canContinue = await prettifyReadme(basePath, ci);
    }

    if (canContinue && distfiles) {
        canContinue = await buildDistFiles(basePath);
    }

    if (!canContinue) {
        process.exitCode = 1;
    }
});

program.parse(process.argv);
