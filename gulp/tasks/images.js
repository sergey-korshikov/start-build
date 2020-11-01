const gulp = require('gulp');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
// const changed = require('gulp-changed');
const minification = require('gulp-image');
// const imagemin = require('gulp-imagemin');

import settings from '../config';

const {paths} = settings;

const options = {
	optimizationLevel: 5,
	pngquant: true,
	optipng: true,
	zopflipng: false,
	jpegRecompress: true,
	jpegoptim: true,
	mozjpeg: true,
	gifsicle: true,
	svgo: true,
	concurrent: 5
};

const images = (done) => {
	gulp.src(paths.images.src)
		.pipe(plumber({
			errorHandler: notify.onError('Error: Incorrect Lib CSS \n\n <%= error.message %>')
		}))
		// .pipe(gulpif(settings.mode === 'development', minification(options), changed(paths.img.built)))
		.pipe(minification(options))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.images.dist));

	done();
}

export default images;