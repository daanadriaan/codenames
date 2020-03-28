const mix = require('laravel-mix');
var tailwindcss = require('tailwindcss');
const path = require('path');

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g) || [];
    }
}

let config = {
    resolve: {
        alias: {
            'config': 'js/config',
            'lang': 'js/lang',
            'plugins': 'js/plugins',
            'vendor': 'js/vendor',
            'dashboard': 'js/dashboard',
            'home': 'js/home',
            'js': 'js',
        },
        modules: [
            'node_modules',
            path.resolve(__dirname, "resources")
        ]
    },
}

if (!process.argv.includes('--hot')) {
    config = Object.assign(config, {
        output: {
            publicPath: "/",
            chunkFilename: 'js/[name].[chunkhash].js'
        }
    })
}

mix.webpackConfig(config);

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false,
        postCss:        [
            tailwindcss('./tailwind.js'),
        ]
    });

if (mix.inProduction()) {
    mix.version()
}
