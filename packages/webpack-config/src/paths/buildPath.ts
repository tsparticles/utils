import { getConfig } from '../common/getConfig.js';
import { getPathEntry } from './getPathEntry.js';

/**
 * @param moduleName -
 * @param pluginName -
 * @param version -
 * @param dir -
 * @returns the webpack config
 */
function loadParticlesPath(moduleName: string, pluginName: string, version: string, dir: string): unknown {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${pluginName} Path v${version} by Matteo Bruni`;

    return [getConfig(getPathEntry(moduleName, false), version, banner, minBanner, dir, false)];
}

export { loadParticlesPath };
