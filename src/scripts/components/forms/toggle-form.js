const toggleForm = function(btnSelector, formSelector) {
	const btn = document.querySelector(btnSelector);

	if (!btn) return false;

	btn.addEventListener('click', function() {
		const name = this.getAttribute('data-name-element');
		const form = document.querySelector(formSelector + '[data-name-element="'+name+'"]');

		if (this.classList.contains('open')) {
			hideElement(form);
			form.classList.remove('open');
			this.classList.remove('open');
		} else {
			showElement(form);
			form.classList.add('open');
			this.classList.add('open');
		}
	});
}