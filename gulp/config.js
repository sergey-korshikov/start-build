const PATHS = {
	src: './src/',
	public: './public/',
}

const sources = {
	templates: PATHS.src + 'templates',
	statical: PATHS.src + 'statical',
	scripts: PATHS.src + 'scripts',
	styles: PATHS.src + 'styles',
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
				PATHS.public + 'statical/icons/',
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

				'./node_modules/normalize.css/normalize.css',
				'./node_modules/jquery/dist/jquery.min.js',
				'./node_modules/imask/dist/imask.min.js',
			],
			dist: [
				PATHS.public + 'statical/fonts/',
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
				appoint: 'general',
				dest: PATHS.public + 'styles'
			},
			{
				files: sources.styles + '/pages/*.*',
				appoint: 'pages',
				dest: PATHS.public
			},
			{
				files: sources.styles + '/vendors/*.*',
				appoint: 'vendors',
				dest: PATHS.public + 'styles/vendors'
			}
		],

		scripts: [
			{
				files: sources.scripts + '/*.*',
				appoint: 'general',
				dest: PATHS.public + 'scripts'
			},
			{
				files: sources.scripts + '/pages/*.*',
				appoint: 'pages',
				dest: PATHS.public
			},
			{
				files: sources.scripts + '/vendors/*.*',
				appoint: 'vendors',
				dest: PATHS.public + 'scripts/vendors'
			}
		],
	},

	mode: 'production',

	browsers: ['> 0.1%'],
	// browsers: ['ie >= 10', 'ff >= 29', 'Opera >= 12', 'iOS >= 6', 'Chrome >= 28', 'Android >= 2'],
}