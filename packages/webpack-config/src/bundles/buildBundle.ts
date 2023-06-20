import { getBundleEntry } from './getBundleEntry.js';
import { getConfig } from '../common/getConfig.js';

/**
 * @param moduleName -
 * @param bundleName -
 * @param version -
 * @param dir -
 * @param bundle -
 * @returns the webpack config
 */
function loadParticlesBundle(
    moduleName: string,
    bundleName: string,
    version: string,
    dir: string,
    bundle = true
): unknown {
    const fixBundleName = bundleName ? `${bundleName} ` : "",
        banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${fixBundleName}v${version} by Matteo Bruni`,
        configs = [getConfig(getBundleEntry(moduleName, false), version, banner, minBanner, dir, false)];

    if (bundle) {
        configs.push(getConfig(getBundleEntry(`${moduleName}.bundle`, true), version, banner, minBanner, dir, true));
    }

    return configs;
}

export { loadParticlesBundle };
