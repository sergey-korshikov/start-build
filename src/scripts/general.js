'use strict';

const projectOptions = {
	states: {},
	selects: {},
	maskes: {}
};

//=require helpers/toggle-aria-label.js
//=require helpers/toggle-view.js
//=require helpers/toggle-page-fix.js
//=require helpers/phone-mask.js
//=require helpers/check-opened.js

const pageReady = function() {
	initPhoneMask();
}

document.addEventListener("DOMContentLoaded", pageReady);
