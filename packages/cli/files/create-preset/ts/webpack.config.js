const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const getEntry = (name, bundle) => {
    const obj = {};
    const fileName = bundle ? "bundle" : "index";

    obj[`tsparticles.preset.${name}`] = `./dist/browser/${fileName}.js`;
    obj[`tsparticles.preset.${name}.min`] = `./dist/browser/${fileName}.js`;

    return obj;
}

const getExternals = (bundle) => {
    if (bundle) {
        return [];
    }

    return [
        {
            "tsparticles": {
                commonjs: "tsparticles",
                commonjs2: "tsparticles",
                amd: "tsparticles",
                root: "window"
            }
        }
    ];
};

const getConfig = (entry, bannerInput, minBannerInput, dir, bundle) => {
    return {
        entry: entry,
        output: {
            path: path.resolve(dir, "dist"),
            filename: "[name].js",
            libraryTarget: "umd",
            globalObject: "this"
        },
        resolve: {
            extensions: [ ".js", ".json" ]
        },
        externals: getExternals(bundle),
        module: {
            rules: [
                {
                    // Include ts, tsx, js, and jsx files.
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                }
            ]
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: bannerInput,
                exclude: /\.min\.js$/
            }),
            new webpack.BannerPlugin({
                banner: minBannerInput,
                include: /\.min\.js$/
            }),
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: "static",
                exclude: /\.min\.js$/,
                reportFilename: "report.html"
            })
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    include: /\.min\.js$/,
                    terserOptions: {
                        output: {
                            comments: minBanner
                        }
                    },
                    extractComments: false
                })
            ]
        }
    };
};

const { author, version } = require("./package.json");

const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`;

const minBanner = `tsParticles Template Preset v${version} by ${author}`;

module.exports = [
    getConfig(getEntry("template", false), banner, minBanner, __dirname, false),
    getConfig(getEntry("template.bundle", true), banner, minBanner, __dirname, true)
];
