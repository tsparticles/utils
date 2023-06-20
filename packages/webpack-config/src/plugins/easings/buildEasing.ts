import { getConfig } from '../../common/getConfig.js';
import { getPluginEasingEntry } from './getPluginEasingEntry.js';

/**
 * @param moduleName -
 * @param pluginName -
 * @param version -
 * @param dir -
 * @param bundle -
 * @returns the webpack config
 */
function loadParticlesPluginEasing(
    moduleName: string,
    pluginName: string,
    version: string,
    dir: string,
    bundle: boolean
): unknown {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles Easing ${pluginName} Plugin v${version} by Matteo Bruni`;

    return bundle
        ? [
              getConfig(getPluginEasingEntry(moduleName, false), version, banner, minBanner, dir, false),
              getConfig(getPluginEasingEntry(moduleName, true), version, banner, minBanner, dir, true),
          ]
        : [getConfig(getPluginEasingEntry(moduleName, false), version, banner, minBanner, dir, false)];
}

export { loadParticlesPluginEasing };
