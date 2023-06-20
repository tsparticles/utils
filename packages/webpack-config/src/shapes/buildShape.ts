import { getConfig } from "../common/getConfig.js";
import { getShapeEntry } from "./getShapeEntry.js";

/**
 * @param moduleName -
 * @param shapeName -
 * @param version -
 * @param dir -
 * @returns the webpack config
 */
function loadParticlesShape(moduleName: string, shapeName: string, version: string, dir: string): unknown {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${shapeName} Shape v${version} by Matteo Bruni`;

    return [getConfig(getShapeEntry(moduleName, false), version, banner, minBanner, dir, false)];
}

export { loadParticlesShape };
