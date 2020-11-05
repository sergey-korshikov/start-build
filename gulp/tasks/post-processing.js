const gulp     = require('gulp');
const concat   = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const gcmq     = require('gulp-group-css-media-queries');
const del      = require('del');

const postProcessing = (done) => {
	// clear
	del.sync('./public-concat/');

	// html
	gulp.src('./public/**/*.html')
		.pipe(gulp.dest('./public-concat/'));

	// js
	gulp.src('./public/scripts/vendors/*.js')
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest('./public-concat/scripts/'))

	gulp.src('./public/scripts/*.js')
		.pipe(gulp.src(['./public/**/*.js', '!./public/scripts/**/*.js']))
		.pipe(concat('general.js'))
		.pipe(gulp.dest('./public-concat/scripts/'));

	// css
	gulp.src('./public/styles/vendors/*.css')
		.pipe(concat('vendors.css'))
		.pipe(gulp.dest('./public-concat/styles/'))

	gulp.src('./public/styles/*.css')
		.pipe(gulp.src(['./public/**/*.css', '!./public/styles/**/*.css']))
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
		.pipe(gulp.dest('./public-concat/styles/'));

	// static
	gulp.src('./public/static/**/*.*')
		.pipe(gulp.dest('./public-concat/static/'));

	done();
}

export default postProcessing;