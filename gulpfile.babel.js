const gulp = require('gulp');

import clean     from './gulp/tasks/clean';
import icons     from './gulp/tasks/icons';
import images    from './gulp/tasks/images';
import statics   from './gulp/tasks/statics';
import templates from './gulp/tasks/templates';
import styles    from './gulp/tasks/styles';
import scripts   from './gulp/tasks/scripts';
import server    from './gulp/tasks/server';
import settings  from './gulp/config';

import postProcessing from './gulp/tasks/post-processing';

const {paths} = settings;

const watch = () => {
	gulp.watch(paths.icons.src, icons);
	gulp.watch(paths.images.src, images);
	gulp.watch(paths.statics.src, statics);
	gulp.watch(paths.src + 'pug/**/*.*', templates);
	gulp.watch(paths.src + 'scss/**/*.*', styles);
	gulp.watch(paths.src + 'js/**/*.*', scripts);
};

const setDev = (done) => {
	settings.mode = 'development';
	done();
};

const setProd = (done) => {
	settings.mode = 'production';
	done();
};

gulp.task('build',
	gulp.series(
		clean,
		icons,
		images,
		statics,
		gulp.parallel(
			templates,
			styles,
			scripts,
		)
	)
);

gulp.task('dev',
	gulp.series(
		setDev,
		'build'
	)
);

gulp.task('prod',
	gulp.series(
		setProd,
		'build'
	)
);

gulp.task('default',
	gulp.series(
		'dev',
		gulp.parallel(
			watch,
			server,
		)
	)
);

gulp.task('post',
	postProcessing
);

/*
	commands:
		gulp
		gulp dev
		gulp prod
*/