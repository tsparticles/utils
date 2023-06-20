import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import TerserPlugin from "terser-webpack-plugin";
import { getExternals } from "./getExternals.js";
import path from "path";
import webpack from "webpack";

const getConfig = (
    entry: unknown,
    version: string,
    bannerInput: string,
    minBannerInput: string,
    dir: string,
    bundle: boolean
): unknown => {
    return {
        entry: entry,
        mode: "production",
        output: {
            path: path.resolve(dir, "dist"),
            filename: "[name].js",
            library: {
                type: "umd2",
            },
            globalObject: "this",
            chunkFilename: "[name].js",
        },
        resolve: {
            extensions: [".js", ".json"],
        },
        externals: getExternals(bundle),
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
                banner: bannerInput,
                exclude: /\.min\.js$/,
            }),
            new webpack.BannerPlugin({
                banner: minBannerInput,
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
                }),
            ],
        },
        performance: {
            hints: false,
        },
    };
};

export { getConfig };
