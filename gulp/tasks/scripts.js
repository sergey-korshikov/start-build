const gulp       = require('gulp');
const gulpif     = require('gulp-if');
const rename     = require('gulp-rename');
const notify     = require('gulp-notify');
const plumber    = require('gulp-plumber');
// const uglify     = require('gulp-uglify');
// const concat     = require('gulp-concat');
const babel      = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

import settings from '../config';

const {paths} = settings;

const scripts = (done) => {
	for (let i = 0; i < paths.scripts.length; i++) {
		const files = paths.scripts[i].files;
		const appoint = paths.scripts[i].appoint;

		gulp.src(files)
			.pipe(plumber({
				errorHandler: notify.onError('Error: Incorrect Script \n\n <%= error.message %>')
			}))
			.pipe(gulpif(settings.mode !== 'production', sourcemaps.init()))
			.pipe(babel({
				presets: ['@babel/preset-env'],
				// plugins: ["@babel/plugin-syntax-dynamic-import"],
			}))
			// .pipe(concat('scripts.js'))
			// .pipe(uglify({
			// 	toplevel: true
			// }))
			.pipe(gulpif(appoint === 'pages', rename(function (path) {
				if (path.basename !== 'index') {
					path.dirname += '/' + path.basename;
				}
				path.basename = 'script';
			})))
			.pipe(gulpif(settings.mode !== 'production', sourcemaps.write('./')))
			.pipe(gulpif(appoint === 'pages', gulp.dest(paths.public)))
			.pipe(gulpif(appoint === 'general', gulp.dest(paths.public + 'scripts')))
			.pipe(plumber.stop());
	}
	done();
}

export default scripts;