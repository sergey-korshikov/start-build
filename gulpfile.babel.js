const gulp = require('gulp');

import clean    from './gulp/tasks/clean';
import icons    from './gulp/tasks/icons';
import images   from './gulp/tasks/images';
import statics  from './gulp/tasks/statics';
import views    from './gulp/tasks/views';
import styles   from './gulp/tasks/styles';
import scripts  from './gulp/tasks/scripts';
import server   from './gulp/tasks/server';
import settings from './gulp/config';

const {paths} = settings;

const watch = () => {
	gulp.watch(paths.icons.src, icons);
	gulp.watch(paths.images.src, images);
	gulp.watch(paths.statics.src, statics);
	gulp.watch(paths.src + 'pug/**/*.*', views);
	gulp.watch(paths.src + 'scss/**/*.*', styles);
	gulp.watch(paths.src + 'js/**/*.*', scripts);
};

gulp.task('clean', clean);
gulp.task('icons', icons);
gulp.task('images', images);
gulp.task('statics', statics);
gulp.task('views', views);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('server', server);

gulp.task('setDev', function(done) {
	settings.mode = 'development';
	done();
});

gulp.task('setProd', function(done) {
	settings.mode = 'production';
	done();
});

gulp.task(
	'dev', gulp.series(
		'setDev',
		'clean',
		'icons',
		'images',
		'statics',
		gulp.parallel(
			'views',
			'styles',
			'scripts',
		)
	)
);

gulp.task(
	'prod', gulp.series(
		'setProd',
		'clean',
		'icons',
		'images',
		'statics',
		gulp.parallel(
			'views',
			'styles',
			'scripts',
		)
	)
);

gulp.task(
	'default', gulp.series(
		'dev',
		gulp.parallel(
			'watch',
			'server',
		)
	)
);

/*
	commands:
		gulp
		gulp dev
		gulp prod
*/