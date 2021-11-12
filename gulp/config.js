const PATHS = {
	src: './src/',
	build: './build/',
}

const sources = {
	templates: PATHS.src + 'templates',
	scripts: PATHS.src + 'scripts',
	styles: PATHS.src + 'styles',
	static: PATHS.src + 'static',
}

export default {
	paths: {
		src: PATHS.src,
		build: PATHS.build,

		watch: sources,

		icons: {
			src: [
				sources.static + '/svg/*.svg',
			],
			dist: [
				PATHS.build + 'icons/',
			],
		},

		images: {
			src: [
				sources.static + '/images/**/*.{jpg,jpeg,png,svg,gif}',
			],
			dist: [
				PATHS.build + 'images/',
			],
		},

		static: [
			[sources.static + '/fonts/**/*.*', PATHS.build + 'fonts/'],
			[sources.static + '/icons/**/*.*', PATHS.build + 'icons/'],

			['./node_modules/normalize.css/normalize.css', PATHS.build + 'styles/vendors/'],
			['./node_modules/swiper/swiper-bundle.min.css', PATHS.build + 'styles/vendors/'],

			['./node_modules/swiper/swiper-bundle.min.js', PATHS.build + 'scripts/vendors/'],
			['./node_modules/focus-visible/dist/focus-visible.min.js', PATHS.build + 'scripts/vendors/'],
			['./node_modules/imask/dist/imask.min.js', PATHS.build + 'scripts/vendors/'],

			[sources.static + '/data/ajax/**/*.*', PATHS.build + 'ajax/'],
		],

		templates: [
			{
				files: sources.templates + '/pages/*.pug',
				appoint: 'pages'
			},
			{
				files: sources.templates + '/ajax/*.pug',
				appoint: 'ajax'
			}
		],

		styles: [
			{
				files: sources.styles + '/*.*',
				appoint: 'general',
				dest: PATHS.build + 'styles'
			},
			{
				files: sources.styles + '/pages/*.*',
				appoint: 'pages',
				dest: PATHS.build
			},
			{
				files: sources.styles + '/vendors/*.*',
				appoint: 'vendors',
				dest: PATHS.build + 'styles/vendors'
			}
		],

		scripts: [
			{
				files: sources.scripts + '/*.*',
				appoint: 'general',
				dest: PATHS.build + 'scripts'
			},
			{
				files: sources.scripts + '/pages/*.*',
				appoint: 'pages',
				dest: PATHS.build
			},
			{
				files: sources.scripts + '/vendors/*.*',
				appoint: 'vendors',
				dest: PATHS.build + 'scripts/vendors'
			}
		],
	},

	mode: 'production',

	browsers: ['> 0.1%'],
	// browsers: ['ie >= 10', 'ff >= 29', 'Opera >= 12', 'iOS >= 6', 'Chrome >= 28', 'Android >= 2'],
}