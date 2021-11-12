function initPhoneMask() {
	const id = Date.now();
	const inputs = document.querySelectorAll('.js-form-phone');

	const options = {
		mask: [
			{
				mask: '+7 (000) 000-00-00',
			},
			{
				mask: '8 (000) 000-00-00',
			},
		],
	}

	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		const maskId = id + '_' + i;

		if (!input.hasAttribute('data-mask-id')) {
			input.setAttribute('data-mask-id', maskId);
			projectOptions.maskes[maskId] = new IMask(input, options);
		}
	}
}
