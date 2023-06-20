import { getConfig } from '../common/getConfig.js';
import { getUpdaterEntry } from './getUpdaterEntry.js';

/**
 * @param moduleName -
 * @param updaterName -
 * @param version -
 * @param dir -
 * @returns the webpack config
 */
function loadParticlesUpdater(moduleName: string, updaterName: string, version: string, dir: string): unknown {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${updaterName} Updater v${version} by Matteo Bruni`;

    return [getConfig(getUpdaterEntry(moduleName, false), version, banner, minBanner, dir, false)];
}

export { loadParticlesUpdater };
