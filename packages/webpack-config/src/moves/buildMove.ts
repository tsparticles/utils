import type { ExternalData } from "../common/ExternalData.js";
import { getConfig } from "../common/getConfig.js";

interface MoveParams {
    additionalExternals?: ExternalData[];
    dir: string;
    moduleName: string;
    pluginName: string;
    version: string;
}

/**
 * @param params -
 * @returns the webpack config
 */
function loadParticlesMove(params: MoveParams): unknown {
    const { moduleName, pluginName, version, dir, additionalExternals } = params,
        banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${pluginName} Move v${version} by Matteo Bruni`;

    return getConfig({
        entry: {
            format: "move",
            name: moduleName,
            bundle: false,
        },
        version,
        banner,
        minBanner: minBanner,
        dir,
        bundle: false,
        additionalExternals,
    });
}

export { loadParticlesMove };
