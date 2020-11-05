const PATHS = {
	src: './src/',
	public: './public/',
}

export default {
	paths: {
		src: PATHS.src,
		public: PATHS.public,

		icons: {
			src: [
				PATHS.src + 'static/svg/*.svg',
			],
			dist: [
				PATHS.src + 'static/svg/',
			],
		},

		images: {
			src: [
				PATHS.src + 'static/images/**/*.{jpg,jpeg,png,svg,gif}',
			],
			dist: [
				PATHS.public + 'static/images/',
			],
		},

		statics: {
			src: [
				PATHS.src + 'static/fonts/**/*.*',
				PATHS.src + 'static/icons/**/*.*',
				PATHS.src + 'static/svg/symbol/svg/sprite.symbol.svg',

				'./node_modules/normalize.css/normalize.css',
				'./node_modules/jquery/dist/jquery.min.js',
				'./node_modules/imask/dist/imask.min.js',
			],
			dist: [
				PATHS.public + 'static/fonts/',
				PATHS.public + 'static/icons/',
				PATHS.public + 'static/icons/',

				PATHS.public + 'styles/vendors/',
				PATHS.public + 'scripts/vendors/',
				PATHS.public + 'scripts/vendors/',
			]
		},

		templates: [
			{
				files: PATHS.src + 'pug/pages/*.pug',
				appoint: 'pages'
			},
			{
				files: PATHS.src + 'pug/ajax/*.pug',
				appoint: 'ajax'
			}
		],

		styles: [
			{
				files: PATHS.src + 'scss/*.*',
				appoint: 'general'
			},
			{
				files: PATHS.src + 'scss/pages/*.*',
				appoint: 'pages'
			}
		],

		scripts: [
			{
				files: PATHS.src + 'js/*.*',
				appoint: 'general'
			},
			{
				files: PATHS.src + 'js/pages/*.*',
				appoint: 'pages'
			}
		],
	},

	mode: 'production',

	browsers: ['> 0.1%'],
	// browsers: ['ie >= 10', 'ff >= 29', 'Opera >= 12', 'iOS >= 6', 'Chrome >= 28', 'Android >= 2'],
}