'use strict';

const projectOptions = {
	states: {},
};

//=require helpers/send-request.js
//=require helpers/toggle-aria-label.js
//=require helpers/toggle-view.js
//=require helpers/toggle-page-fix.js

//=require components/phone-mask.js
//=require components/check-opened.js


const pageReady = function() {
	initPhoneMask();
	initCheckOpenedElements();
}

document.addEventListener("DOMContentLoaded", pageReady);
