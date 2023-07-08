import type { ExternalData } from "../../common/ExternalData";
import { getConfig } from "../../common/getConfig";
import { getPluginExportEntry } from "./getPluginExportEntry";

interface ExportParams {
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
function loadParticlesPluginExport(params: ExportParams): unknown {
    const { moduleName, pluginName, version, dir, bundle, additionalExternals } = params,
        banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles Export ${pluginName} Plugin v${version} by Matteo Bruni`;

    return bundle
        ? [
              getConfig({
                  entry: getPluginExportEntry(moduleName, false),
                  version,
                  banner,
                  minBanner: minBanner,
                  dir,
                  bundle: false,
                  additionalExternals,
              }),
              getConfig({
                  entry: getPluginExportEntry(moduleName, true),
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
                  entry: getPluginExportEntry(moduleName, false),
                  version,
                  banner,
                  minBanner: minBanner,
                  dir,
                  bundle: false,
                  additionalExternals,
              }),
          ];
}

export { loadParticlesPluginExport };
