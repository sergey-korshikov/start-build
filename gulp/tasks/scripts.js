const gulp          = require('gulp');
const gulpif        = require('gulp-if');
const rename        = require('gulp-rename');
const notify        = require('gulp-notify');
const plumber       = require('gulp-plumber');
const uglify        = require('gulp-uglify');
// const concat        = require('gulp-concat');
const babel         = require('gulp-babel');
// const sourcemaps    = require('gulp-sourcemaps');

import settings from '../config';

const {paths} = settings;

const scripts = (done) => {
	for (let i = 0; i < paths.scripts.length; i++) {
		const appoint = paths.scripts[i].appoint;
		const files = paths.scripts[i].files;
		const dest = paths.scripts[i].dest;

		gulp.src(files)
			.pipe(plumber({
				errorHandler: notify.onError('Error: Incorrect Script \n\n <%= error.message %>')
			}))
			// .pipe(gulpif(settings.mode !== 'production', sourcemaps.init()))
			.pipe(babel(
				{
					presets: [
						"@babel/preset-env"
					]
				}
			))
			// .pipe(concat('scripts.js'))
			.pipe(uglify({
				toplevel: true
			}))
			.pipe(gulpif(appoint === 'pages', rename(function (path) {
				if (path.basename !== 'index') {
					path.dirname += '/' + path.basename;
				}
				path.basename = 'script';
			})))
			// .pipe(gulpif(settings.mode !== 'production', sourcemaps.write('./')))
			.pipe(gulp.dest(dest))
			.pipe(plumber.stop());
	}
	done();
}

export default scripts;