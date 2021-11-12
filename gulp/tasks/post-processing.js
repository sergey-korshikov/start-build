const gulp     = require('gulp');
const concat   = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const gcmq     = require('gulp-group-css-media-queries');
const del      = require('del');

const postProcessing = (done) => {
	// clear
	del.sync('./build-concat/');

	// html
	gulp.src('./build/**/*.html')
		.pipe(gulp.dest('./build-concat/'));

	// js
	gulp.src('./build/scripts/vendors/*.js')
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest('./build-concat/scripts/'))

	gulp.src('./build/scripts/*.js')
		.pipe(gulp.src(['./build/**/*.js', '!./build/scripts/**/*.js']))
		.pipe(concat('general.js'))
		.pipe(gulp.dest('./build-concat/scripts/'));

	// css
	gulp.src('./build/styles/vendors/*.css')
		.pipe(concat('vendors.css'))
		.pipe(gulp.dest('./build-concat/styles/'))

	gulp.src('./build/styles/*.css')
		.pipe(gulp.src(['./build/**/*.css', '!./build/styles/**/*.css']))
		.pipe(concat('general.css'))
		.pipe(gcmq())
		.pipe(cleanCss({
			format: 'keep-breaks',
			level: {
				2: {
					removeDuplicateRules: true
				}
			}
		}))
		.pipe(gulp.dest('./build-concat/styles/'));

	// static
	gulp.src('./build/static/**/*.*')
		.pipe(gulp.dest('./build-concat/static/'));

	done();
}

export default postProcessing;