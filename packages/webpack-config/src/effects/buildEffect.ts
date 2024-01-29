import type { ExternalData } from "../common/ExternalData";
import { getConfig } from "../common/getConfig";

interface EffectParams {
    additionalExternals?: ExternalData[];
    dir: string;
    effectName: string;
    moduleName: string;
    version: string;
}

/**
 * @param params -
 * @returns the webpack config
 */
function loadParticlesEffect(params: EffectParams): unknown {
    const { moduleName, effectName, version, dir, additionalExternals } = params,
        banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${effectName} Shape v${version} by Matteo Bruni`;

    return getConfig({
        entry: { format: "effect", name: moduleName, bundle: false },
        version,
        banner,
        minBanner: minBanner,
        dir,
        bundle: false,
        additionalExternals,
    });
}

export { loadParticlesEffect };
