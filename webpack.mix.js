let mix = require('laravel-mix');

mix.setPublicPath('./')
    .sass('assets/sass/popup.scss', 'dist/css')
    .js('assets/js/background.js', 'dist/js')
    .js('assets/js/popup.js', 'dist/js').vue()
    .js('assets/js/dashboard.js', 'dist/js').vue()
    .copy('assets/images/', 'dist/images')
    .copy('assets/sass/fonts', 'dist/css/fonts')
    .options({
        processCssUrls: false,
        // hmrOptions: {
        //     host: 'localhost',
        //     port: 3000
        // }
    });

// mix.options({
//     processCssUrls: false,
//     hmrOptions: {
//         host: 'localhost',
//         port: 3000
//     }
// });
//
// mix.webpackConfig({
//     mode: "development",
//     devtool: "inline-source-map",
//     devServer: {
//         disableHostCheck: true,
//         headers: {
//             'Access-Control-Allow-Origin': '*'
//         },
//         host: "web",
//         port: 80
//     },
// });