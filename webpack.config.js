const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
const path = require('path');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin()
    ]
};

// plugins: [
//     new HtmlWebpackPlugin({
//         hash: true,
//         title: 'Webpack Example App',
//         header: 'Webpack Example Title',
//         metaDesc: 'Webpack Example Description',
//         template: './src/index.html',
//         filename: 'index.html',
//         inject: 'body'
//     })
// ]


// module.exports = {
//     plugins: [
//         new HtmlWebpackPlugin({
//             hash: true,
//             title: 'Webpack Example App',
//             header: 'Webpack Example Title',
//             metaDesc: 'Webpack Example Description',
//             template: './src/index.html',
//             filename: 'index.html',
//             inject: 'body'
//         })
//     ],
//     mode: 'development'
// };


// module.exports = {
//     plugins: [
//         new HtmlWebpackPlugin({
//             hash: true,
//             title: 'Webpack Example App',
//             header: 'Webpack Example Title',
//             metaDesc: 'Webpack Example Description',
//             template: './src/index.html',
//             filename: 'index.html',
//             inject: 'body'
//         })
//     ],
//     mode: 'development',
//     output: {
//         clean: true
//     }
// };



module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Webpack Example App',
            header: 'Webpack Example Title',
            metaDesc: 'Webpack Example Description',
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    mode: 'development',
    output: {
        clean: true
    },
    devServer: {
        contentBase: './dist',
        open: true
    }
};

module.exports = {
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        }, ],
    },
};


module.exports = {
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [{
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        }, ],
    },
};

// new MiniCssExtractPlugin
//     insert: "#some-element",


// new MiniCssExtractPlugin({
//     insert: function(linkTag) {
//         var reference = document.querySelector("#some-element");
//         if (reference) {
//             reference.parentNode.insertBefore(linkTag, reference);
//         }
//     },
// });

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        publicPath: "../",
                    },
                },
                "css-loader",
            ],
        }, ],
    },
};



module.exports = {
    module: {
        rules: [{
            test: /\.(jpe?g|png|gif|svg)$/i,
            type: "asset",
        }, ],
    },
    optimization: {
        minimizer: [
            "...",
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: extendDefaultPlugins([{
                                            name: "removeViewBox",
                                            active: false,
                                        },
                                        {
                                            name: "addAttributesToSVGElement",
                                            params: {
                                                attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                                            },
                                        },
                                    ]),
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },
};



// module.exports = {
//   module: {
//     rules: [
//       // You need this, if you are using `import file from "file.ext"`, for `new URL(...)` syntax you don't need it
//       {
//         test: /\.(jpe?g|png)$/i,
//         type: "asset",
//       },
//     ],
//   },
//   optimization: {
//     minimizer: [
//       new ImageMinimizerPlugin({
//         minimizer: {
//           implementation: ImageMinimizerPlugin.squooshMinify,
//           options: {
//             encodeOptions: {
//               mozjpeg: {
//                 // That setting might be close to lossless, but it’s not guaranteed
//                 quality: 100,
//               },
//               webp: {
//                 lossless: 1,
//               },
//               avif: {
//                 // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
//                 cqLevel: 0,
//               },
//             },
//           },
//         },
//       }),
//     ],
//   },
// };