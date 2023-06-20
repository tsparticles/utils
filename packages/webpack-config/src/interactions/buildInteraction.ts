import { getConfig } from '../common/getConfig.js';
import { getInteractionEntry } from './getInteractionEntry.js';

/**
 * @param moduleName -
 * @param pluginName -
 * @param version -
 * @param dir -
 * @returns the webpack config
 */
function loadParticlesInteraction(moduleName: string, pluginName: string, version: string, dir: string): unknown {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${pluginName} Interaction v${version} by Matteo Bruni`;

    return [getConfig(getInteractionEntry(moduleName, false), version, banner, minBanner, dir, false)];
}

export { loadParticlesInteraction };
