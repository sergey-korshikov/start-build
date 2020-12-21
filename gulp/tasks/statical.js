const gulp     = require('gulp');
const gulpif   = require('gulp-if');
const notify   = require('gulp-notify');
const plumber  = require('gulp-plumber');
const cleanCss = require('gulp-clean-css');
const uglify   = require('gulp-uglify');

import settings from '../config';

const {paths} = settings;

const statical = (done) => {
	for (let i = 0; i < paths.statical.src.length; i++) {
		const src = paths.statical.src[i];
		const dist = paths.statical.dist[i];
		let conditionCSS = () => src.indexOf('.css') !== -1 && src.indexOf('.min.') === -1;
		let conditionJS = () => src.indexOf('.js') !== -1 && src.indexOf('.min.') === -1;

		gulp.src(src)
			.pipe(plumber({
				errorHandler: notify.onError('Error: Incorrect Lib CSS \n\n <%= error.message %>')
			}))
			.pipe(gulpif(conditionCSS, cleanCss()))
			.pipe(gulpif(conditionJS, uglify({toplevel: true})))
			.pipe(plumber.stop())
			.pipe(gulp.dest(dist));
	}
	done();
}

export default statical;