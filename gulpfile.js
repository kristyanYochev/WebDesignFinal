const gulp = require('gulp');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
let replace = require('gulp-replace');

function scssTask() {
	return gulp.src("src/scss/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
}

function cacheBustTask() {
	let cbString = new Date().getTime();
	return gulp.src(['index.html'])
		.pipe(replace(/cb=\d+/g, 'cb=' + cbString))
		.pipe(gulp.dest('.'))
}

function watchTask() {
	gulp.watch(["src/scss/**/*.scss"], gulp.series(scssTask, cacheBustTask));
}

const buildAndWatch = gulp.series(scssTask, watchTask);

exports.default = buildAndWatch;
exports.watch = buildAndWatch;
exports.build = scssTask;