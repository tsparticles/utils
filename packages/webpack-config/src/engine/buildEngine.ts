import { getConfig } from '../common/getConfig.js';
import { getEngineEntry } from './getEngineEntry.js';

/**
 * @param version -
 * @param dir -
 * @returns the webpack config
 */
function loadParticlesEngine(version: string, dir: string): unknown {
    const banner = `tsParticles Engine v${version}
Author: Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Website: https://particles.js.org/
Confetti Website: https://confetti.js.org
GitHub: https://www.github.com/matteobruni/tsparticles
How to use?: Check the GitHub README
------------------------------------------------------`,
        minBanner = `tsParticles Engine v${version} by Matteo Bruni`;

    return [getConfig(getEngineEntry(), version, banner, minBanner, dir, false)];
}

export { loadParticlesEngine };
