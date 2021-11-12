const gulp     = require('gulp');
const rename   = require('gulp-rename');
const gulpif   = require('gulp-if');
const notify   = require('gulp-notify');
const plumber  = require('gulp-plumber');
const cleanCss = require('gulp-clean-css');
const uglify   = require('gulp-uglify');

import settings from '../config';

const {paths} = settings;

const staticFiles = (done) => {
	for (let i = 0; i < paths.static.length; i++) {
		const src = paths.static[i][0];
		const dist = paths.static[i][1];
		let conditionCSS = () => src.indexOf('.css') !== -1 && src.indexOf('.min.') === -1;
		let conditionJS = () => src.indexOf('.js') !== -1 && src.indexOf('.min.') === -1;

		gulp.src(src)
			.pipe(plumber({
				errorHandler: notify.onError('Error: Incorrect Lib CSS \n\n <%= error.message %>')
			}))
			.pipe(gulpif(conditionCSS, cleanCss()))
			.pipe(gulpif(conditionJS, uglify({
				// compress: {
				// 	unused: false
				// },
				// toplevel: true,
				output: {
					comments: `/^!/`
				}
			})))
			.pipe(gulpif(conditionJS, rename({suffix: '.min'})))
			.pipe(plumber.stop())
			.pipe(gulp.dest(dist));
	}
	done();
}

export default staticFiles;