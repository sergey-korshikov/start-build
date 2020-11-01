const gulp = require('gulp');
// const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sprite = require('gulp-svg-sprite');

import settings from '../config';

const {paths} = settings;

const config = {
	mode: {
		// stack: {
		// 	sprite: "../sprite.svg"
		// },
		symbol: true
	},
};

const icons = (done) => {
	gulp.src(paths.icons.src)
		.pipe(plumber({
			errorHandler: notify.onError('Error: Incorrect Lib CSS \n\n <%= error.message %>')
		}))
		.pipe(sprite(config))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.icons.dist));

	done();
}

export default icons;