import { camelize, capitalize, dash } from "../../utils/string-utils";
import fs from "fs-extra";
import path from "path";

/**
 *
 * @param destPath -
 * @param name -
 */
async function updateBundleFile(destPath: string, name: string): Promise<void> {
    const bundlePath = path.resolve(destPath, "src", "bundle.ts"),
        bundle = await fs.readFile(bundlePath, "utf-8"),
        capitalizedName = capitalize(capitalize(name, "-"), " "),
        bundleRegex = /loadTemplatePreset/g,
        replacedText = bundle.replace(bundleRegex, `load${capitalizedName}Preset`);

    await fs.writeFile(bundlePath, replacedText);
}

/**
 *
 * @param destPath -
 * @param name -
 */
async function updateIndexFile(destPath: string, name: string): Promise<void> {
    const indexPath = path.resolve(destPath, "src", "index.ts"),
        index = await fs.readFile(indexPath, "utf-8"),
        capitalizedName = capitalize(capitalize(name, "-"), " "),
        camelizedName = camelize(capitalizedName),
        indexFunctionRegex = /loadTemplatePreset/g,
        replacedFuncText = index.replace(indexFunctionRegex, `load${capitalizedName}Preset`),
        indexNameRegex = /"template"/g,
        replacedNameText = replacedFuncText.replace(indexNameRegex, `"#${camelizedName}#"`);

    await fs.writeFile(indexPath, replacedNameText);
}

/**
 *
 * @param destPath -
 * @param name -
 * @param description -
 * @param repoUrl -
 */
async function updatePackageFile(destPath: string, name: string, description: string, repoUrl: string): Promise<void> {
    const packagePath = path.resolve(destPath, "package.json"),
        packageContents = await fs.readFile(packagePath, "utf-8"),
        camelizedName = camelize(camelize(name, "-"), " "),
        dashedName = dash(camelizedName),
        descriptionRegex = /"tsParticles empty template"/g,
        replacedDescriptionText = packageContents.replace(descriptionRegex, `"${description}"`),
        fileRegex = /"tsparticles.empty.template.min.js"/g,
        replacedFileText = replacedDescriptionText.replace(fileRegex, `"tsparticles.preset.${camelizedName}.min.js"`),
        privateRegex = /\s{4}"private": true,\r?\n?/g,
        replacedPrivateText = replacedFileText.replace(privateRegex, ""),
        nameRegex = /"@tsparticles\/empty-template"/g,
        nameReplacedText = replacedPrivateText.replace(nameRegex, `"tsparticles-preset-${dashedName}"`),
        repoUrlRegex = /"url": "git\+https:\/\/github\.com\/tsparticles\/empty-template\.git"/g,
        repoUrlReplacedText = nameReplacedText.replace(repoUrlRegex, `"url": "git+${repoUrl}"`),
        issuesUrlRegex = /"url": "https:\/\/github\.com\/tsparticles\/empty-template\/issues"/g,
        replacedText = repoUrlReplacedText.replace(issuesUrlRegex, `"url": "${repoUrl.replace(".git", "/issues")}"`);

    await fs.writeFile(packagePath, replacedText);
}

/**
 *
 * @param destPath -
 * @param name -
 * @param description -
 * @param repoUrl -
 */
async function updatePackageDistFile(
    destPath: string,
    name: string,
    description: string,
    repoUrl: string
): Promise<void> {
    const packagePath = path.resolve(destPath, "package.dist.json"),
        packageContents = await fs.readFile(packagePath, "utf-8"),
        camelizedName = camelize(camelize(name, "-"), " "),
        dashedName = dash(camelizedName),
        descriptionRegex = /"tsParticles empty template"/g,
        replacedDescriptionText = packageContents.replace(descriptionRegex, `"${description}"`),
        fileRegex = /"tsparticles.empty.template.min.js"/g,
        replacedFileText = replacedDescriptionText.replace(fileRegex, `"tsparticles.preset.${camelizedName}.min.js"`),
        privateRegex = /\s{4}"private": true,\r?\n?/g,
        replacedPrivateText = replacedFileText.replace(privateRegex, ""),
        nameRegex = /"@tsparticles\/empty-template"/g,
        nameReplacedText = replacedPrivateText.replace(nameRegex, `"tsparticles-preset-${dashedName}"`),
        repoUrlRegex = /"url": "git\+https:\/\/github\.com\/tsparticles\/empty-template\.git"/g,
        repoUrlReplacedText = nameReplacedText.replace(repoUrlRegex, `"url": "git+${repoUrl}"`),
        issuesUrlRegex = /"url": "https:\/\/github\.com\/tsparticles\/empty-template\/issues"/g,
        replacedText = repoUrlReplacedText.replace(issuesUrlRegex, `"url": "${repoUrl.replace(".git", "/issues")}"`);

    await fs.writeFile(packagePath, replacedText);
}

/**
 *
 * @param destPath -
 * @param name -
 * @param description -
 * @param repoUrl -
 */
async function updateReadmeFile(destPath: string, name: string, description: string, repoUrl: string): Promise<void> {
    const readmePath = path.resolve(destPath, "README.md"),
        readme = await fs.readFile(readmePath, "utf-8"),
        capitalizedName = capitalize(capitalize(name, "-"), " "),
        camelizedName = camelize(capitalizedName),
        dashedName = dash(camelizedName),
        readmeDescriptionRegex = /tsParticles Template Preset/g,
        replacedDescriptionText = readme.replace(readmeDescriptionRegex, `tsParticles ${description} Preset`),
        readmePackageNameRegex = /tsparticles-preset-template/g,
        replacedPackageNameText = replacedDescriptionText.replace(
            readmePackageNameRegex,
            `tsparticles-preset-${dashedName}`
        ),
        readmeFileNameRegex = /tsparticles\.preset\.template(\.bundle)?\.min\.js/g,
        replacedFileNameText = replacedPackageNameText.replace(
            readmeFileNameRegex,
            `tsparticles.preset.${camelizedName}$1.min.js`
        ),
        readmeFunctionNameRegex = /loadTemplatePreset/g,
        replacedFunctionNameText = replacedFileNameText.replace(
            readmeFunctionNameRegex,
            `load${capitalizedName}Preset`
        ),
        readmeMiniDescriptionRegex =
            /\[tsParticles\]\(https:\/\/github.com\/matteobruni\/tsparticles\) preset template\./g,
        replacedMiniDescriptionText = replacedFunctionNameText.replace(
            readmeMiniDescriptionRegex,
            `[tsParticles](https://github.com/matteobruni/tsparticles) preset ${name}.`
        ),
        readmeUsageRegex = /preset: "template"/g,
        replacedUsageText = replacedMiniDescriptionText.replace(readmeUsageRegex, `preset: "${camelizedName}`),
        sampleImageRegex =
            /!\[demo\]\(https:\/\/raw.githubusercontent.com\/tsparticles\/preset-template\/main\/images\/sample.png\)/g,
        repoPath = repoUrl.includes("github.com")
            ? repoUrl.substring(repoUrl.indexOf("github.com/") + 11, repoUrl.indexOf(".git"))
            : "tsparticles/preset-template",
        replacedText = replacedUsageText.replace(
            sampleImageRegex,
            `![demo](https://raw.githubusercontent.com/${repoPath}/main/images/sample.png)`
        );

    await fs.writeFile(readmePath, replacedText);
}

/**
 *
 * @param destPath -
 * @param name -
 * @param description -
 */
async function updateWebpackFile(destPath: string, name: string, description: string): Promise<void> {
    const webpackPath = path.resolve(destPath, "webpack.config.js"),
        webpack = await fs.readFile(webpackPath, "utf-8"),
        capitalizedName = capitalize(capitalize(name, "-"), " "),
        camelizedName = camelize(capitalizedName),
        webpackDescriptionRegex = /tsParticles Empty Template/g,
        replacedDescriptionText = webpack.replace(webpackDescriptionRegex, `tsParticles ${description} Preset`),
        webpackEntryRegex = /"template(\.bundle)?"/g,
        replacedNameText = replacedDescriptionText.replace(webpackEntryRegex, `"${camelizedName}$1"`);

    await fs.writeFile(webpackPath, replacedNameText);
}

/**
 *
 * @param name -
 * @param description -
 * @param repoUrl -
 * @param destPath -
 */
export async function createPresetTemplate(
    name: string,
    description: string,
    repoUrl: string,
    destPath: string
): Promise<void> {
    const emptyPath = path.resolve(__dirname, "..", "..", "..", "files", "empty-project"),
        sourcePath = path.resolve(__dirname, "..", "..", "..", "files", "create-preset"),
        copyFilter = (src: string): boolean => {
            if (src.endsWith("node_modules") || src.endsWith("dist")) {
                return false;
            }

            return true;
        };

    await fs.copy(emptyPath, destPath, {
        overwrite: true,
        filter: copyFilter,
    });

    await fs.copy(sourcePath, destPath, {
        overwrite: true,
        filter: copyFilter,
    });

    await updateBundleFile(destPath, name);
    await updateIndexFile(destPath, name);
    await updatePackageFile(destPath, name, description, repoUrl);
    await updatePackageDistFile(destPath, name, description, repoUrl);
    await updateReadmeFile(destPath, name, description, repoUrl);
    await updateWebpackFile(destPath, name, description);
}
