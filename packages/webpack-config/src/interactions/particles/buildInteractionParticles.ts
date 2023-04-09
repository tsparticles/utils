import { getConfig } from "../../common/getConfig";
import { getInteractionParticlesEntry } from "./getInteractionParticlesEntry";

/**
 *
 * @param moduleName
 * @param pluginName
 * @param version
 * @param dir
 */
function loadParticlesInteractionParticles(
    moduleName: string,
    pluginName: string,
    version: string,
    dir: string
): unknown {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${pluginName} Particles Interaction v${version} by Matteo Bruni`;

    return [getConfig(getInteractionParticlesEntry(moduleName, false), version, banner, minBanner, dir, false)];
}

export { loadParticlesInteractionParticles };
