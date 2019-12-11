var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */

var settings = {
	outputStyle: 'scss', /* less || scss || sass || styl */
	columns: 12, /* number of grid columns */
	offset: '30px', /* gutter width px || % || rem */
	mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
	container: {
		maxWidth: '1860px', /* max-width оn very large screen */
		fields: '30px', /* side fields */
	},
	breakPoints: {
		max1889: {
			width: '1889px',
		},
		max1439: {
			width: '1439px',
		},
		max1229: {
			width: '1229px',
		},
		max991: {
			width: '991px',
		},
		max767: {
			width: '767px',
		},
		max575: {
			width: '575px',
		}

		// start: max-width:    max - 1890px (1860px)
		//   xxl: max-width: 1889px - 1440px (1410px) 450px
		//    xl: max-width: 1439px - 1230px (1200px) 210px
		//     l: max-width: 1229px -  992px  (960px) 240px
		//     m: max-width:  991px -  768px  (740px) 220px
		//     s: max-width:  767px -  576px  (540px) 200px
		//    xs: max-width:  575px -  320px   (full) 220px

		// some_name: {
		// 	width: 'Npx',
		// 	fields: 'N(px|%|rem)',
		// 	offset: 'N(px|%|rem)'
		// }
	}
};

smartgrid('./src/scss/vendors', settings);

// После настройки файла, запустить его с помощью node.js - node smart-grid-config.js