/* help functions */
function initPhoneMask() {
	$('.js-form-phone').inputmask({
		mask: ['+7 (999) 999-99-99', '8 (999) 999-99-99']
	});
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

function checkValue(item, noError) {
	let value = $.trim(item.val());

 if (value === '' && (!noError || item.hasClass('error'))) {
	 item.addClass('error');
	 return true;
 } else {
	 item.removeClass('error');
	 return false;
 }
}

function completePhone(item, noError) {
 if (!item.inputmask("isComplete") && (!noError || item.hasClass('error'))) {
	 item.addClass('error');
	 return true;
 } else {
	 item.removeClass('error');
	 return false;
 }
}

function validateEmail(item, noError) {
 let email = $.trim(item.val());
 let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

 if (reg.test(email) == false && (!noError || item.hasClass('error'))) {
	 item.addClass('error');
	 return true;
 } else {
	 item.removeClass('error');
	 return false;
 }
}

/* modal windows and forms functions */
function checkModal(selector) {
	let modalName = $(selector).attr('data-modal-name');
	let modal = $('.js-modal[data-modal-name="' + modalName + '"]');

	if (modal[0]) {
		openModal(modal);
	} else if (!$(selector).hasClass('sending')) {
		$(selector).addClass('sending');
		$.ajax({
			url: $(selector).attr('href'),
			success: function(formHtml) {
				$(selector).removeClass('sending');
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

function checkForm(form, input, noError) {
	let error = false;
	let _form = form ? form : $(input).parents('.js-form');
	let inputs = input ? $(input) : _form.find('input, textarea');
	let btn = _form.find('.js-form-send');

	for (let i = 0; i < inputs.length; i++) {
		let item = $(inputs).eq(i);

		if (
			(item.hasClass('js-form-text') && checkValue(item, noError)) ||
			(item.hasClass('js-form-mail') && validateEmail(item, noError)) ||
			(item.hasClass('js-form-phone') && completePhone(item, noError))
		) {
			error = true;
		}
	}

	if (_form.find('.error')[0] && !noError) {
		btn.addClass('disabled');
	} else {
		btn.removeClass('disabled');
	}

	return error;
}

function sendForm(btnSend) {
	let form = $(btnSend).parents('.js-form');
	let error = checkForm(form);

	if (!error) {
		ajaxSend(btnSend, function (btnSend, errorSend) {
			let form = btnSend.parents('.js-form');
			let inputs = form.find('input, textarea');

			if (!errorSend) {
				inputs.val('');
				form.removeClass('error');
				btnSend.removeClass('disabled').removeClass('sending');
				closeModal(btnSend, false, true);
				checkModal(btnSend);

				setTimeout(function () {
					closeModal(btnSend, true);
				}, 5000);
			} else {
				form.addClass('error');
				btnSend.removeClass('disabled').removeClass('sending');
			}
		});
	}
}

function ajaxSend(btn, callback) {
	let btnSend = $(btn);
	let form = btnSend.parents('.js-form');
	let action = form.attr('action');

	if (!btnSend.hasClass('disabled') && !btnSend.hasClass('sending')) {
		btnSend.addClass('disabled').addClass('sending');

		/* включить при работе на сервере, вместо setTimeout(...) */
		// $.post(action, form.serializeArray(), function (dataResponsive) {
		// 	// console.log(form.serializeArray());
		// 	// console.log(dataResponsive);

		// 	if (dataResponsive) {
		// 		callback(btnSend);
		// 	} else {
		// 		callback(btnSend, true);
		// 	}
		// });

		/* DELETE! (временная замена ajax запроса) *всегда первый запрос с ошибкой, второй корректный */
		setTimeout(function () {
			if (form.hasClass('error')) {
				callback(btnSend);
			} else {
				callback(btnSend, true);
			}
		}, 1500);
	}
}

$(function () {
	/* init and events for modal windows and forms */
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
		checkForm(false, this, true);
	});

	$(document).on('blur', 'input, textarea', function () {
		checkForm(false, this);
	});
});