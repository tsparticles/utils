import { getConfig } from "../common/getConfig.js";
import { getTemplateEntry } from "./getTemplateEntry.js";

/**
 * @param moduleName -
 * @param templateName -
 * @param version -
 * @param dir -
 * @returns the webpack config
 */
function loadParticlesTemplate(moduleName: string, templateName: string, version: string, dir: string): unknown {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${templateName} Template v${version} by Matteo Bruni`;

    return [
        getConfig(getTemplateEntry(moduleName, false), version, banner, minBanner, dir, false),
        getConfig(getTemplateEntry(`${moduleName}.bundle`, true), version, banner, minBanner, dir, true),
    ];
}

export { loadParticlesTemplate };
