const browserSync = require('browser-sync').create();

import settings from '../config';

const {paths} = settings;

const server = () => browserSync.init({
	open: true,
	server: {
		baseDir: paths.public,
		directory: false
	},
	// middleware: [
	// 	{
	// 		route: '/ajax',
	// 		handle: function (req, res, next) {
	// 			let resData = true;
	// 			console.log(req.url);

	// 			req.setEncoding('utf8');

	// 			req.on('data', (chunk) => {
	// 				// resData = JSON.parse(chunk);
	// 				console.log(chunk);
	// 			});

	// 			req.on('end', () => {
	// 				try {
	// 					const data = JSON.stringify(resData);
	// 					res.write(data);
	// 					res.end();
	// 				} catch (error) {
	// 					res.statusCode = 400;
	// 					return res.end(`error: ${error.message}`);
	// 				}
	// 			});
	// 		}
	// 	}
	// ],
	ghostMode: {
		clicks: false,
		forms: false,
		scroll: false
	}, // синхронизация между браузерами
	// tunnel: true,
	notify: true,
	files: paths.public + '**/*.*',
});

export default server;