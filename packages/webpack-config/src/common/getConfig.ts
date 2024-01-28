import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import type { ExternalData } from "./ExternalData";
import TerserPlugin from "terser-webpack-plugin";
import { getEntry } from "./getEntry.js";
import { getExternals } from "./getExternals";
import path from "path";
import webpack from "webpack";

interface ConfigParams {
    additionalExternals?: ExternalData[];
    banner: string;
    bundle?: boolean;
    dir: string;
    entry: {
        bundle: boolean;
        format: string;
        name?: string;
    };
    minBanner: string;
    version: string;
}

/**
 *
 * @param params -
 * @param min -
 * @returns the webpack configuration
 */
function getSingleConfig(params: ConfigParams, min: boolean): unknown {
    const { additionalExternals, banner, bundle, dir, entry, minBanner, version } = params;

    return {
        entry: getEntry({ ...entry, min }),
        mode: min ? "production" : "development",
        output: {
            path: path.resolve(dir, "dist"),
            filename: "[name].js",
            library: {
                type: "umd2",
            },
            globalObject: "this",
            chunkFilename: min ? "[name].min.js" : "[name].js",
        },
        resolve: {
            extensions: [ ".cjs", ".mjs", ".js", ".json" ],
        },
        externals: getExternals({ bundle, additionalExternals }),
        module: {
            rules: [
                {
                    // Include ts, tsx, js, and jsx files.
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                __VERSION__: JSON.stringify(version),
            }),
            new webpack.BannerPlugin({
                banner,
                exclude: /\.min\.js$/,
            }),
            new webpack.BannerPlugin({
                banner: minBanner,
                include: /\.min\.js$/,
            }),
            new webpack.ProgressPlugin(),
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: "static",
                excludeAssets: /\.min\.js$/,
                reportFilename: "report.html",
            }),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    include: /\.min\.js$/,
                    parallel: true,
                    terserOptions: {
                        ecma: 2019,
                        module: true,
                    },
                }),
            ],
        },
        performance: {
            hints: false,
        },
    };
}

const getConfig = (params: ConfigParams): unknown[] => {
    return [ getSingleConfig(params, false), getSingleConfig(params, true) ];
};

export { getConfig };
