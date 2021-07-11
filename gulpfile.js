let { watch, series, src, dest } = require('gulp');
var uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    _clean = require("gulp-clean"),
    batch = require('gulp-batch');

function js() {
    return src(['./src/blockrain.jquery.libs.js', './src/blockrain.jquery.src.js', './src/blockrain.jquery.themes.js'])
        .pipe(concat('blockrain.jquery.js'))
        .pipe(dest('./dist'))
        .pipe(uglify({ preserveComments:'none' }))
        .pipe(concat('blockrain.jquery.min.js'))
        .pipe(dest('./dist'));
}

function css() {
    return src(['./src/blockrain.css'])
        .pipe(dest('./dist'));
}

function blocks() {
    return src(['./assets/blocks/custom/*.*'])
        .pipe(dest('./dist/assets/blocks/custom'));
}

function readme() {
    return src(['./README.md'])
        .pipe(dest('./dist'));
}

function clean() {
    return src('./dist', { read: false })
       .pipe(_clean());
}

function build() {
    return series(clean, js, css, blocks, readme);
}

function dev() {
    watch(['./src/*.js', './src/*.css'], series(js, css, blocks));
}

exports.default = build;
exports.watch = dev;
