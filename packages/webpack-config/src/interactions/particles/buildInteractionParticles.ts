import type { ExternalData } from "../../common/ExternalData";
import { getConfig } from "../../common/getConfig";
import { getInteractionParticlesEntry } from "./getInteractionParticlesEntry";

interface InteractionParticlesParams {
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
function loadParticlesInteractionParticles(params: InteractionParticlesParams): unknown {
    const { moduleName, pluginName, version, dir, additionalExternals } = params,
        banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${pluginName} Particles Interaction v${version} by Matteo Bruni`;

    return [
        getConfig({
            entry: getInteractionParticlesEntry(moduleName, false),
            version,
            banner,
            minBanner: minBanner,
            dir,
            bundle: false,
            additionalExternals,
        }),
    ];
}

export { loadParticlesInteractionParticles };
