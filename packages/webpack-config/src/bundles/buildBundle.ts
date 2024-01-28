import type { ExternalData } from "../common/ExternalData";
import { getConfig } from "../common/getConfig";

interface BundleParams {
    additionalExternals?: ExternalData[];
    bundle?: boolean;
    bundleName: string;
    dir: string;
    moduleName: string;
    version: string;
}

/**
 * @param params -
 * @returns the webpack config
 */
function loadParticlesBundle(params: BundleParams): unknown {
    const { additionalExternals, bundle, bundleName, dir, moduleName, version } = params,
        fixBundleName = bundleName ? `${bundleName} ` : "",
        banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${fixBundleName}v${version} by Matteo Bruni`,
        configs = getConfig({
            entry: { format: "", name: moduleName, bundle: false },
            version,
            banner,
            minBanner: minBanner,
            dir,
            bundle: false,
            additionalExternals,
        });

    if (bundle ?? true) {
        configs.push(
            ...getConfig({
                entry: { format: "", name: `${moduleName}.bundle`, bundle: true },
                version,
                banner,
                minBanner: minBanner,
                dir,
                bundle: true,
                additionalExternals,
            }),
        );
    }

    return configs;
}

export { loadParticlesBundle };
