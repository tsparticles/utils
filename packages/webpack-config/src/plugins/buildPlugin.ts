import type { ExternalData } from "../common/ExternalData";
import { getConfig } from "../common/getConfig";
import { getPluginEntry } from "./getPluginEntry";

interface PluginParams {
    additionalExternals?: ExternalData[];
    bundle: boolean;
    dir: string;
    moduleName: string;
    pluginName: string;
    version: string;
}

/**
 * @param params -
 * @returns the webpack config
 */
function loadParticlesPlugin(params: PluginParams): unknown {
    const { moduleName, pluginName, version, dir, bundle, additionalExternals } = params,
        banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${pluginName} Plugin v${version} by Matteo Bruni`;

    return bundle
        ? [
              getConfig({
                  entry: getPluginEntry(moduleName, false),
                  version,
                  banner,
                  minBanner: minBanner,
                  dir,
                  bundle: false,
                  additionalExternals,
              }),
              getConfig({
                  entry: getPluginEntry(moduleName, true),
                  version,
                  banner,
                  minBanner: minBanner,
                  dir,
                  bundle: true,
                  additionalExternals,
              }),
          ]
        : [
              getConfig({
                  entry: getPluginEntry(moduleName, false),
                  version,
                  banner,
                  minBanner: minBanner,
                  dir,
                  bundle: false,
                  additionalExternals,
              }),
          ];
}

export { loadParticlesPlugin };
