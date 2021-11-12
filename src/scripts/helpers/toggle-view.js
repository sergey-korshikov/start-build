const setDefaultValue = function(property, defaultValue) {
	return property !== undefined ? property : defaultValue;
}

const showElement = function(element, params = {}, callback) {
	const display = setDefaultValue(params.display, 'block');
	const useOpacity = setDefaultValue(params.opacity, true);
	const useHeight = setDefaultValue(params.height, true);
	const timeout = setDefaultValue(params.timeout, 200);
	const animation = setDefaultValue(params.animation, 'ease-in-out');
	const transition = `all ${timeout}ms ${animation}`;

	let height;

	element.style.visibility = 'hidden';
	element.style.overflow = 'hidden';
	element.style.display = display;

	if (useOpacity) {
		element.style.opacity = '0';
	}

	if (useHeight) {
		element.style.height = 'auto';
		height = element.offsetHeight;
		element.style.height = '0';
	}

	element.style.transition = transition;
	element.style.visibility = 'visible';

	setTimeout(function() {
		if (useOpacity) {
			element.style.opacity = '1';
		}

		if (useHeight) {
			element.style.height = height + 'px';
		}
	}, 0);


	setTimeout(function() {
		element.setAttribute('style', 'display:' + display);
		callback && callback();
	}, timeout);
}

const hideElement = function(element, params = {}, callback) {
	const useOpacity = setDefaultValue(params.opacity, true);
	const useHeight = setDefaultValue(params.height, true);
	const timeout = setDefaultValue(params.timeout, 200);
	const animation = setDefaultValue(params.animation, 'ease-in-out');
	const transition = `all ${timeout}ms ${animation}`;

	if (useOpacity) {
		element.style.opacity = '1';
	}

	if (useHeight) {
		element.style.height = element.offsetHeight + 'px';
	}

	element.style.overflow = 'hidden';
	element.style.transition = transition;

	setTimeout(function() {
		if (useOpacity) {
			element.style.opacity = '0';
		}

		if (useHeight) {
			element.style.height = '0';
		}
	}, 0);

	setTimeout(function() {
		element.setAttribute('style', 'display:none');
		callback && callback();
	}, timeout);
}