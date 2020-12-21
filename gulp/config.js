const PATHS = {
	src: './src/',
	public: './public/',
}

const sources = {
	templates: PATHS.src + 'templates',
	styles: PATHS.src + 'styles',
	scripts: PATHS.src + 'scripts',
	statical: PATHS.src + 'statical'
}

export default {
	paths: {
		src: PATHS.src,
		public: PATHS.public,

		watch: sources,

		icons: {
			src: [
				sources.statical + '/svg/*.svg',
			],
			dist: [
				sources.statical + '/svg/',
			],
		},

		images: {
			src: [
				sources.statical + '/images/**/*.{jpg,jpeg,png,svg,gif}',
			],
			dist: [
				PATHS.public + 'statical/images/',
			],
		},

		statical: {
			src: [
				sources.statical + '/fonts/**/*.*',
				sources.statical + '/icons/**/*.*',
				sources.statical + '/svg/symbol/svg/sprite.symbol.svg',

				'./node_modules/normalize.css/normalize.css',
				'./node_modules/jquery/dist/jquery.min.js',
				'./node_modules/imask/dist/imask.min.js',
			],
			dist: [
				PATHS.public + 'statical/fonts/',
				PATHS.public + 'statical/icons/',
				PATHS.public + 'statical/icons/',

				PATHS.public + 'styles/vendors/',
				PATHS.public + 'scripts/vendors/',
				PATHS.public + 'scripts/vendors/',
			]
		},

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
				appoint: 'general'
			},
			{
				files: sources.styles + '/pages/*.*',
				appoint: 'pages'
			}
		],

		scripts: [
			{
				files: sources.scripts + '/*.*',
				appoint: 'general'
			},
			{
				files: sources.scripts + '/pages/*.*',
				appoint: 'pages'
			}
		],
	},

	mode: 'production',

	browsers: ['> 0.1%'],
	// browsers: ['ie >= 10', 'ff >= 29', 'Opera >= 12', 'iOS >= 6', 'Chrome >= 28', 'Android >= 2'],
}