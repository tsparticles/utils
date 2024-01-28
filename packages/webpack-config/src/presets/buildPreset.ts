import type { ExternalData } from "../common/ExternalData";
import { getConfig } from "../common/getConfig";

interface PresetParams {
    additionalExternals?: ExternalData[];
    dir: string;
    moduleName: string;
    presetName: string;
    version: string;
}

/**
 * @param params -
 * @returns the webpack config
 */
function loadParticlesPreset(params: PresetParams): unknown {
    const { moduleName, presetName, version, dir, additionalExternals } = params,
        banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${presetName} Preset v${version} by Matteo Bruni`;

    return [
        ...getConfig({
            entry: { format: "preset", name: moduleName, bundle: false },
            version,
            banner,
            minBanner: minBanner,
            dir,
            bundle: false,
            additionalExternals,
        }),
        ...getConfig({
            entry: { format: "preset", name: moduleName, bundle: true },
            version,
            banner,
            minBanner: minBanner,
            dir,
            bundle: true,
            additionalExternals,
        }),
    ];
}

export { loadParticlesPreset };
