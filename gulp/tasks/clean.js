const del = require('del');

import settings from '../config';

const {paths} = settings;

const clean = () => {
	// return del([paths.public + '*', '!' + paths.public + 'static']);
	return del([paths.public + '*']);
}

export default clean;