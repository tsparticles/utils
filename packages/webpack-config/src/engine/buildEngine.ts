import type { ExternalData } from "../common/ExternalData";
import { getConfig } from "../common/getConfig";
import { getEngineEntry } from "./getEngineEntry";

interface EngineParams {
    additionalExternals?: ExternalData[];
    dir: string;
    version: string;
}

/**
 * @param params -
 * @returns the webpack config
 */
function loadParticlesEngine(params: EngineParams): unknown {
    const { additionalExternals, dir, version } = params,
        banner = `tsParticles Engine v${version}
Author: Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Website: https://particles.js.org/
Confetti Website: https://confetti.js.org
GitHub: https://www.github.com/matteobruni/tsparticles
How to use?: Check the GitHub README
------------------------------------------------------`,
        minBanner = `tsParticles Engine v${version} by Matteo Bruni`;

    return [
        getConfig({
            entry: getEngineEntry(),
            version,
            banner,
            minBanner: minBanner,
            dir,
            bundle: false,
            additionalExternals,
        }),
    ];
}

export { loadParticlesEngine };
