const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const rollup = require('gulp-rollup-each');
const uglify = require('gulp-uglify');
const util = require('gulp-util');
const babel = require('rollup-plugin-babel');
const pump = require('pump');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const browserSync = require('browser-sync').create();

const PRODUCTION = process.env.NODE_ENV === 'production';

//
// === Sass ===
//

let postCssPlugins = [
	autoprefixer({browsers: ['last 1 version']}),
];

if (PRODUCTION) {
	postCssPlugins = postCssPlugins.concat([
		cssnano()
	]);
}

//
// === Rollup Config ===
//

const rollupConfig = {
	output: {
		format: 'iife'
	},
	sourcemap: !PRODUCTION && 'inline',
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		resolve(),
		commonjs(),
	]
};

//
// === Pack Assets ===
//

gulp.task('sass', callback => {
	pump([
		gulp.src('./src/styles/*.scss'),
		sass().on('error', sass.logError),
		postcss(postCssPlugins),
		gulp.dest('./web/dist'),
		browserSync.stream()
	], callback);
});

gulp.task('rollup', callback => {
	pump([
		gulp.src('./src/*.js'),
		rollup(rollupConfig),
		PRODUCTION ? uglify() : util.noop(),
		gulp.dest('./web/dist'),
		browserSync.stream()
	], callback);
});

//
// === Root Tasks ===
//

gulp.task('default', ['sass', 'rollup']);
gulp.task('watch', ['default'], () => {
	browserSync.init({
		proxy: 'screens.local',
		https: true,
		port: 3000
	});

	gulp.watch('./src/styles/**/*.scss', ['sass']);
	gulp.watch('./src/**/*.js', ['rollup']);
	gulp.watch('./templates/**/*').on('change', browserSync.reload);
});