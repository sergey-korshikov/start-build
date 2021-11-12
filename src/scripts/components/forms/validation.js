const checkForm = function(form, settings, isViewErrors, isUpdatePhone) {
	if (!form) return false;

	let error = false;

	const required = settings.required;

	const marks = required.marks;
	const textFields = required.texts;
	const phoneFields = required.phones;
	const emailFields = required.emails;
	const selectFields = required.selects;

	const btnSubmit = form.querySelector('[type="submit"]');

	if (marks) {
		for (let i = 0; i < marks.length; i++) {
			const element = form.querySelector(marks[i]);

			if (element) {
				element.classList.remove('error');

				if (!form.querySelector(marks[i] + ':checked')) {
					error = true;
					if (isViewErrors) element.classList.add('error');
				}
			}
		}
	}

	if (textFields) {
		for (let i = 0; i < textFields.length; i++) {
			const element = form.querySelector(textFields[i]);

			if (element) {
				element.classList.remove('error');

				if (element.value.trim() === '') {
					error = true;
					if (isViewErrors) element.classList.add('error');
				}
			}
		}
	}

	if (phoneFields) {
		for (let i = 0; i < phoneFields.length; i++) {
			const element = form.querySelector(phoneFields[i]);

			if (element) {
				element.classList.remove('error');

				if (element.value.replace(/\D+/g,"").length < 11) {
					error = true;
					if (isViewErrors) element.classList.add('error');
				}
			}
		}
	}

	if (emailFields) {
		for (let i = 0; i < emailFields.length; i++) {
			const element = form.querySelector(emailFields[i]);
			const email = element.value.trim();
			const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]){2,4}$/;

			if (element) {
				element.classList.remove('error');

				if (reg.test(email) == false) {
					error = true;
					if (isViewErrors) element.classList.add('error');
				}
			}
		}
	}

	if (selectFields) {
		for (let i = 0; i < selectFields.length; i++) {
			const element = form.querySelector(selectFields[i]);

			if (element) {
				if (element.value.trim() === '') {
					error = true;
					if (isViewErrors) element.closest('.choices').classList.add('error');
				} else {
					element.closest('.choices').classList.remove('error');
				}
			}
		}
	}

	if (isUpdatePhone) {
		const phones = form.querySelectorAll('.js-form-phone');

		for (let p = 0; p < phones.length; p++) {
			const phone = phones[p];
			const maskId = phone.getAttribute('data-mask-id');
			const mask = maskId && projectOptions.maskes[maskId];

			if (mask) mask.updateValue();
		}
	}

	if (error) {
		btnSubmit && btnSubmit.classList.add('disabled');
	} else {
		btnSubmit && btnSubmit.classList.remove('disabled');
	}

	return error;
}

const initForm = function(form, settings) {
	if (!form) return false;

	const inputs = form.querySelectorAll('input, textarea');
	const selects = form.querySelectorAll('select');

	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		input.addEventListener('input', function(e) {
			checkForm(form, settings);
		});
	}

	for (let i = 0; i < selects.length; i++) {
		const select = selects[i];
		select.addEventListener('change', function(e) {
			checkForm(form, settings);
		});
	}

	form.addEventListener('reset', function(e) {
		checkForm(form, settings);
	});

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		!checkForm(form, settings, true) && settings.submit && settings.submit(form);
	});
}
