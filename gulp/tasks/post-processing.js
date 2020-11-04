const gulp     = require('gulp');
const gulpif   = require('gulp-if');
const notify   = require('gulp-notify');
const plumber  = require('gulp-plumber');
const concat   = require('gulp-concat');
const gcmq     = require('gulp-group-css-media-queries');

const postProcessing = (done) => {
	gulp.src('./public/**/*.html')
		.pipe(gulp.dest('./public-concat/'));

	gulp.src('./public/**/*.js')
		.pipe(concat('general.js'))
		.pipe(gulp.dest('./public-concat/scripts/'));

	gulp.src('./public/**/*.css')
		.pipe(concat('general.css'))
		.pipe(gcmq())
		.pipe(gulp.dest('./public-concat/styles/general.css'));

	gulp.src('./public/static/**/*.*')
		.pipe(gulp.dest('./public-concat/static/'));

	done();
}

export default postProcessing;