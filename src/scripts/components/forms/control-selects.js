const updateSelect = function(name, values = [], isDisable) {
	const select = projectOptions.selects[name];
	const currentValue = select.config.choices[0];
	const basic = [
		{
			value: currentValue.value,
			label: currentValue.label,
			placeholder: true
		}
	];

	values = basic.concat(values);

	select.clearStore().setChoices(values).setChoiceByValue('');

	if (isDisable) {
		select.disable();
	} else {
		select.enable();
	}
}

const clearNextSelects = function(prevElement) {
	const element = document.querySelector(prevElement.getAttribute('data-next-load-element'));

	if (!element) return false;

	updateSelect(element.getAttribute('name'), [], true);
	clearNextSelects(element);
}

const loadSelect = function(element, data, url, selectOptions) {
	const name = element.getAttribute('name');
	const method = element.getAttribute('data-method');

	sendRequest({
		method: method,
		url: url,
		data: data
	}).fetch
	.then(function(data) {
		updateSelect(name, JSON.parse(data));
		clearNextSelects(element);
		if (selectOptions.onChange) selectOptions.onChange();
	})
	.catch(function(error) {
		console.error(error);
	});
}

const checkSelect = function(element, selectOptions) {
	const value = element.value;
	const name = element.getAttribute('name');
	const nextLoadElement = element.getAttribute('data-next-load-element');
	const targetElement = document.querySelector(nextLoadElement);
	const selectedElement = targetElement && targetElement.querySelector('option[selected]');
	const data = {};

	data[name] = value;

	if (targetElement && !selectedElement) {
		const url = targetElement.getAttribute('data-url-load');
		loadSelect(targetElement, data, url, selectOptions);
	}
}

const initSelect = function(element, selectOptions = {}) {
	const ariaLabel = element.getAttribute('aria-label');
	const name = element.getAttribute('name');
	const selectedElement = element.querySelector('option[selected]');
	const selectElement = selectedElement || element.querySelector('option[value=""]');

	if (selectedElement) element.disabled = false;
	if (selectElement) selectElement.selected = true;

	projectOptions.selects[name] = new Choices(element, {
		// searchEnabled: false,
		noResultsText: 'Не найдено',
		itemSelectText: '',
		callbackOnInit: function() {
			const choices = element.closest('.choices');
			choices.setAttribute('aria-label', ariaLabel);
		}
	});

	element.addEventListener('change', function(e) {
		projectOptions.selects[name].containerOuter.element.classList.remove('error');
		checkSelect(e.target, selectOptions);
	});

	if (selectedElement) checkSelect(element, selectOptions);
}
