const gulp     = require('gulp');
const gulpif   = require('gulp-if');
const rename   = require('gulp-rename');
const notify   = require('gulp-notify');
const plumber  = require('gulp-plumber');
const pug      = require('gulp-pug');
const prettify = require('gulp-html-prettify');

import settings from '../config';

const {paths} = settings;

const templates = (done) => {
	for (let i = 0; i < paths.templates.length; i++) {
		const files = paths.templates[i].files;
		const appoint = paths.templates[i].appoint;

		gulp.src(files)
			.pipe(plumber({
				errorHandler: notify.onError('Error: Incorrect Pug \n\n <%= error.message %>')
			}))
			.pipe(pug({
				pretty: true
			}))
			.pipe(prettify({
				indent_char: '\t',
				indent_size: 1
			}))
			.pipe(gulpif(appoint === 'pages', rename(function (path) {
				if (path.basename !== 'index') {
					path.dirname += '/' + path.basename;
					path.basename = 'index';
				}
			})))
			.pipe(gulpif(appoint === 'ajax', rename(function (path) {
				path.dirname += '/ajax';
			})))
			.pipe(plumber.stop())
			.pipe(gulp.dest(paths.build));
	}
	done();
}

export default templates;