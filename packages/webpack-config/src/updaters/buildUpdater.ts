import type { ExternalData } from "../common/ExternalData.js";
import { getConfig } from "../common/getConfig.js";

interface UpdaterParams {
    additionalExternals?: ExternalData[];
    dir: string;
    moduleName: string;
    updaterName: string;
    version: string;
}

/**
 * @param params -
 * @returns the webpack config
 */
function loadParticlesUpdater(params: UpdaterParams): unknown {
    const { moduleName, updaterName, version, dir, additionalExternals } = params,
        banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${updaterName} Updater v${version} by Matteo Bruni`;

    return getConfig({
        entry: { format: "updater", name: moduleName, bundle: false },
        version,
        banner,
        minBanner: minBanner,
        dir,
        bundle: false,
        additionalExternals,
    });
}

export { loadParticlesUpdater };
