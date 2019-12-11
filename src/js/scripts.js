'use strict';

// modal windows and forms functions

function openModal(self) {
	var modalName = $(self).attr('data-modal-name');
	var modal = $('.js-modal[data-modal-name="' + modalName + '"]');

	modal[0] && fixed();
	modal[0] && modal.fadeIn(200, function () {
		modal.addClass('open');
	});
}

function closeModal(self, otherForm, noUnfix) {
	if (otherForm) {
		var modalName = $(self).attr('data-modal-name');
		var modal = $('.js-modal[data-modal-name="' + modalName + '"]');
	} else {
		var modal = $(self).parents('.js-modal');
	}

	modal[0] && modal.fadeOut(200, function () {
		if (!noUnfix) unfixed();
		modal.removeClass('open');
	});
}

function sendForm(btnSend) {
	var first = true;
	var error = false;
	var form = $(btnSend).parents('.js-form');
	var inputs = form.find('input, textarea');

	for (var i = 0; i < inputs.length; i++) {
		var item = $(inputs).eq(i);

		if (
			(item.hasClass('js-form-text') && checkVal(item.val())) ||
			(item.hasClass('js-form-mail') && validateEmail(item.val())) // ||
			// (item.hasClass('js-form-phone') && !item.inputmask("isComplete"))
		) {
			if (first) item.focus();
			item.addClass('error');
			first = false;
			error = true;
		}
	}

	if (!error) {
		ajaxSend(btnSend, function (btnSend) {
			var form = btnSend.parents('.js-form');
			var inputs = form.find('input, textarea');

			inputs.val('');
			btnSend.removeClass('disabled');
			closeModal(btnSend, false, true);
			openModal(btnSend);

			setTimeout(function () {
				closeModal(btnSend, true);
			}, 5000);
		});
	}
}

function ajaxSend(btn, callback) {
	var btnSend = $(btn);
	var form = btnSend.parents('.js-form');
	var action = form.attr('action');

	if (!btnSend.hasClass('disabled')) {
		btnSend.addClass('disabled');

		// ! включить при работе на сервере вместо setTimeout(...)
		// $.post(action, form.serialize(), function (data) {
		// 	callback(btnSend);
		// });

		// ! DELETE (временная замена ajax запроса-ответа)
		setTimeout(function () {
			console.log(action);
			console.log(form.serialize());
			callback(btnSend);
		}, 1500);
	}
}

function initPhoneMask() {
	// $('.js-phone').inputmask({
	// 	mask: ['7 999 999 99 99', '8 999 999 99 99']
	// });
}

function checkVal(value) {
	value = $.trim(value);
	if (value === '') return true;
	return false;
}

function validateEmail(email) {
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if (reg.test(email) == false) return true;
	return false;
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

$(document).ready(function () {
	// init and events for modal windows and forms

	initPhoneMask();

	$(document).on('click', '.js-modal-open', function (e) {
		e.preventDefault();
		openModal(this);
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
		$(this).removeClass('error');
	});
});