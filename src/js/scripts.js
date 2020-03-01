'use strict';
// modal windows and forms functions

function checkModal(selector) {
	let modalName = $(selector).attr('data-modal-name');
	let modal = $('.js-modal[data-modal-name="' + modalName + '"]');

	if (modal[0]) {

		openModal(modal);

	} else {
		$.ajax({
			url: $(selector).attr('data-modal-url'),
			success: function(formHtml) {

				$('.js-forms').append(formHtml);
				initPhoneMask();
				modal = $('.js-modal[data-modal-name="' + modalName + '"]');
				openModal(modal);

			}
		});
	}
}

function openModal(modal) {
	modal[0] && fixed();
	modal[0] && modal.fadeIn(200, function () {
		modal.addClass('open');
	});
}

function closeModal(selector, linkForm, noUnfix) {
	let modal;

	if (linkForm) {
		let modalName = $(selector).attr('data-modal-name');
		modal = $('.js-modal[data-modal-name="' + modalName + '"]');
	} else {
		modal = $(selector).parents('.js-modal');
	}

	modal[0] && modal.fadeOut(200, function () {
		if (!noUnfix) unfixed();
		modal.removeClass('open');
	});
}

function sendForm(btnSend) {
	let form = $(btnSend).parents('.js-form');
	let error = checkForm(form);

	if (!error) {
		ajaxSend(btnSend, function (btnSend) {
			let form = btnSend.parents('.js-form');
			let inputs = form.find('input, textarea');

			inputs.val('');
			// btnSend.removeClass('disabled');
			closeModal(btnSend, false, true);
			checkModal(btnSend);

			setTimeout(function () {
				closeModal(btnSend, true);
			}, 5000);
		});
	}
}

function checkForm(form, input) {
	let error = false;
	let _form = form ? form : $(input).parents('.js-form');
	let inputs = input ? $(input) : _form.find('input, textarea');
	let btn = _form.find('.js-form-send');

	for (let i = 0; i < inputs.length; i++) {
		let item = $(inputs).eq(i);

		if (
			(item.hasClass('js-form-text') && checkValue(item)) ||
			(item.hasClass('js-form-mail') && validateEmail(item)) ||
			(item.hasClass('js-form-phone') && completePhone(item))
		) {
			error = true;
		}
	}

	if (_form.find('.error')[0]) {
		btn.addClass('disabled');
	} else {
		btn.removeClass('disabled');
	}

	return error;
}

function ajaxSend(btn, callback) {
	let btnSend = $(btn);
	let form = btnSend.parents('.js-form');
	let action = form.attr('action');
	let dataRequest = {};

	form.find('input, textarea, select').each(function() {
		dataRequest[this.name] = $(this).val();
	})

	if (!btnSend.hasClass('disabled')) {
		btnSend.addClass('disabled');

		// ! включить при работе на сервере, вместо setTimeout(...)
		$.post(action, dataRequest, function (dataResponsive) {
			console.log(dataRequest);
			console.log(dataResponsive);

			callback(btnSend);
		});

		// ! DELETE (временная замена ajax запроса-ответа)
		// setTimeout(function () {
		// 	callback(btnSend);
		// }, 1500);
	}
}

function checkValue(item) {
	 let value = $.trim(item.val());

	if (value === '') {
		item.addClass('error');
		return true;
	} else {
		item.removeClass('error');
		return false;
	}
}

function completePhone(item) {
	if (!item.inputmask("isComplete")) {
		item.addClass('error');
		return true;
	} else {
		item.removeClass('error');
		return false;
	}
}

function validateEmail(item) {
	let email = item.val();
	let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	if (reg.test(email) == false) {
		item.addClass('error');
		return true;
	} else {
		item.removeClass('error');
		return false;
	}
}

function fixed() {
	if ($(window).outerHeight(true) < $(document).outerHeight(true)) {
		$('html').addClass('fixed');
		$('body').addClass('fixed');
	}
}

function unfixed() {
	$('html').removeClass('fixed');
	$('body').removeClass('fixed');
}

function initPhoneMask() {
	$('.js-form-phone').inputmask({
		mask: ['+7 (999) 999-99-99', '8 (999) 999-99-99']
	});
}

$(document).ready(function () {
	// init and events for modal windows and forms
	initPhoneMask();

	$(document).on('click', '.js-modal-open', function (e) {
		e.preventDefault();
		checkModal(this);
	});

	$(document).on('click', '.js-modal-close', function (e) {
		e.preventDefault();
		closeModal(this);
	});

	$(document).on('click', '.js-form-send', function (e) {
		e.preventDefault();
		sendForm(this);
	});

	$(document).on('input', 'input, textarea', function () {
	// 	$(this).removeClass('error');
		checkForm(false, this);
	});

	$(document).on('blur', 'input, textarea', function () {
		checkForm(false, this);
	});
});