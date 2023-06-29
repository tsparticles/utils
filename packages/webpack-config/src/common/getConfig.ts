import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import type { ExternalData } from "./ExternalData";
import TerserPlugin from "terser-webpack-plugin";
import { getExternals } from "./getExternals";
import path from "path";
import webpack from "webpack";

interface ConfigParams {
    additionalExternals?: ExternalData[];
    banner: string;
    bundle?: boolean;
    dir: string;
    entry: unknown;
    minBanner: string;
    version: string;
}

const getConfig = (params: ConfigParams): unknown => {
    const { additionalExternals, banner, bundle, dir, entry, minBanner, version } = params;

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
                }),
            ],
        },
        performance: {
            hints: false,
        },
    };
};

export { getConfig };
