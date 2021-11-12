const toggleAriaLabel = function(element, action) {
	const ariaLabelOther = element.getAttribute('aria-label-other');
	const ariaLabel = element.getAttribute('aria-label');

	let ariaLabelOriginal = element.getAttribute('aria-label-original');

	if (!ariaLabel || !ariaLabelOther) return false;

	if (!ariaLabelOriginal) {
		element.setAttribute('aria-label-original', ariaLabel);
		ariaLabelOriginal = ariaLabel;
	}

	if (action && action == 'other' || !action && ariaLabel === ariaLabelOriginal) {
		element.setAttribute('aria-label', ariaLabelOther);
	} else {
		element.setAttribute('aria-label', ariaLabelOriginal);
	}
}
