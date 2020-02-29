const gulp = require('gulp'); // сборщик проекта
const sass = require('gulp-sass'); // препроцессор sass
const sassGlob = require('gulp-sass-glob'); // дополнение к sass
// const sourcemaps = require('gulp-sourcemaps'); // карта исходной структуры файлов
const browserSync = require('browser-sync').create(); // создание локального сервера и синхронизация устройств
const gcmq = require('gulp-group-css-media-queries'); // объединение медиа-запросов и перенос в конец файла
const autoprefixer = require('gulp-autoprefixer'); // добавление стилей для улучшения кроссбраузерности
const prettify = require('gulp-html-prettify'); // форматирование html-файлов после шаблонизатора
const cleanCss = require('gulp-clean-css'); // минификация и оптимизация css-файлов
const plumber = require('gulp-plumber'); // определение ошибок при компиляции
const concat = require('gulp-concat'); // обьединение файлов в один
// const uglify = require('gulp-uglify'); // минификация js-файлов
const notify = require('gulp-notify'); // оповещения об ошибках
// const babel = require('gulp-babel'); // поддержка ES2015
const pug = require('gulp-pug'); // шаблонизатор pug
const del = require('del'); // очистка build

const srcStyleHelpers = [
	// './node_modules/slick-carousel/slick/ajax-loader.gif'
];

const srcStyleLibs = [
	'./node_modules/inputmask/css/inputmask.css',
	// './node_modules/slick-carousel/slick/slick.scss',
	// './node_modules/slick-carousel/slick/slick-theme.scss',
];

const srcFonts = [
	// './node_modules/slick-carousel/slick/fonts/*',
	'./src/static/fonts/**/*'
];

const srcIcons = [
	'./src/static/icons/**/*'
];

const srcScripts = [
	'./src/js/scripts.js'
];

const srcScriptLibs = [
	'./node_modules/jquery/dist/jquery.min.js',
	'./node_modules/inputmask/dist/min/jquery.inputmask.bundle.min.js',
	// './node_modules/slick-carousel/slick/slick.min.js',
	// './src/js/libs/jquery.table-scrolling.js',
];

const srcImages = [
	'./src/static/images/**/*.*'
];

const srcVideos = [
	'./src/static/videos/**/*.*'
];

function views () {
	return gulp.src('./src/pug/*.pug')
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Pug \n\n <%= error.message %>")
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(prettify({
			indent_char: '\t',
			indent_size: 1
		}))
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
}

function styles () {
	return gulp.src('./src/scss/styles.scss')
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Style \n\n <%= error.message %>")
		}))
		// .pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(gcmq())
		.pipe(autoprefixer({
			overrideBrowserslist: ['> 0.1%'],
			cascade: false
		}))
		.pipe(cleanCss({
			format: 'keep-breaks',
			level: {
				2: {
					removeDuplicateRules: true
				}
			}
		}))
		// .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
}

function stylesProduction () {
	return gulp.src('./src/scss/styles.scss')
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Style \n\n <%= error.message %>")
		}))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(gcmq())
		.pipe(autoprefixer({
			overrideBrowserslist: ['> 0.1%'],
			cascade: false
		}))
		.pipe(cleanCss({
			format: 'keep-breaks',
			level: {
				2: {
					removeDuplicateRules: true
				}
			}
		}))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
}

function styleHelpers () {
	return gulp.src(srcStyleHelpers)
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Lib CSS \n\n <%= error.message %>")
		}))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
}

function styleLibs () {
	return gulp.src(srcStyleLibs)
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Lib CSS \n\n <%= error.message %>")
		}))
		.pipe(concat('libs.scss'))
		.pipe(gulp.dest('./src/scss/vendors'))
		.pipe(browserSync.stream());
}

function fonts () {
	return gulp.src(srcFonts)
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Lib Fonts \n\n <%= error.message %>")
		}))
		.pipe(gulp.dest('./build/css/fonts'))
		.pipe(browserSync.stream());
}

function icons () {
	return gulp.src(srcIcons)
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Lib Fonts \n\n <%= error.message %>")
		}))
		.pipe(gulp.dest('./build/css/icons'))
		.pipe(browserSync.stream());
}

function scripts () {
	return gulp.src(srcScripts)
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Script \n\n <%= error.message %>")
		}))
		// .pipe(sourcemaps.init())
		// .pipe(babel({
		// 	presets: ['@babel/preset-env']
		// }))
		.pipe(concat('scripts.js'))
		// .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

function scriptsProduction () {
	return gulp.src(srcScripts)
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Script \n\n <%= error.message %>")
		}))
		// .pipe(babel({
		// 	presets: ['@babel/preset-env']
		// }))
		.pipe(concat('scripts.js'))
		// .pipe(uglify({
		// 	toplevel: true
		// }))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

function scriptLibs () {
	return gulp.src(srcScriptLibs)
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Lib JS \n\n <%= error.message %>")
		}))
		.pipe(concat('libs.js'))
		// .pipe(uglify({
		// 	toplevel: true
		// }))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

function images () {
	return gulp.src(srcImages)
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Image \n\n <%= error.message %>")
		}))
		.pipe(gulp.dest('./build/images'))
		.pipe(browserSync.stream());
}

function videos () {
	return gulp.src(srcVideos)
		.pipe(plumber({
			errorHandler: notify.onError("Error: Incorrect Image \n\n <%= error.message %>")
		}))
		.pipe(gulp.dest('./build/videos'))
		.pipe(browserSync.stream());
}

function cleanFiles () {
	return del('./build/*');
}

function watch () {
	browserSync.init({
		server: {
			baseDir: './build/'
		},
		middleware: [
			{
				route: "/ajax",
				handle: function (req, res, next) {
					let resData;
					console.log(req.url);

					req.setEncoding('utf8');

					req.on('data', (chunk) => {
						resData = JSON.parse(chunk);
						console.log(resData);
					});

					req.on('end', () => {
						try {
							const data = JSON.stringify(resData);
							res.write(data);
							res.end();
						} catch (error) {
							res.statusCode = 400;
							return res.end(`error: ${error.message}`);
						}
					});
				}
			}
		],
		ghostMode: {
			clicks: false,
			forms: false,
			scroll: false
		}, // синхронизация между браузерами
		// tunnel: true,
		notify: true
	});

	gulp.watch('./src/pug/**/*.*', views);
	gulp.watch('./src/scss/**/*.*', styles);
	gulp.watch(srcStyleHelpers, styleHelpers);
	gulp.watch(srcStyleLibs, styleLibs);
	gulp.watch(srcFonts, fonts);
	gulp.watch(srcIcons, icons);
	gulp.watch(srcScripts, scripts);
	gulp.watch(srcScriptLibs, scriptLibs);
	gulp.watch(srcImages, images);
	gulp.watch(srcVideos, videos);
	gulp.watch('./build/*.html', browserSync.reload);
}

gulp.task('views', views);
gulp.task('styles', styles);
gulp.task('stylesProduction', stylesProduction);
gulp.task('styleHelpers', styleHelpers);
gulp.task('styleLibs', styleLibs);
gulp.task('fonts', fonts);
gulp.task('icons', icons);
gulp.task('scripts', scripts);
gulp.task('scriptsProduction', scriptsProduction);
gulp.task('scriptLibs', scriptLibs);
gulp.task('images', images);
gulp.task('videos', videos);
gulp.task('cleanFiles', cleanFiles);
gulp.task('watch', watch);

gulp.task(
	'dev', gulp.series(
		'cleanFiles',
		// 'styleLibs',
		gulp.parallel(
			'views',
			'styles',
			// 'styleHelpers',
			'fonts',
			'icons',
			'scripts',
			'scriptLibs',
			'images',
			'videos',
		)
	)
);

gulp.task(
	'prod', gulp.series(
		'cleanFiles',
		// 'styleLibs',
		gulp.parallel(
			'views',
			'stylesProduction',
			// 'styleHelpers',
			'fonts',
			'icons',
			'scriptsProduction',
			'scriptLibs',
			'images',
			'videos',
		)
	)
);

gulp.task(
	'default', gulp.series(
		'dev',
		'watch'
	)
);

// commands: gulp, gulp prod, gulp build, gulp watch