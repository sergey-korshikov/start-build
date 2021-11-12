const initCheckOpenedElements = function() {
	const click = function(e) {
		if (!projectOptions.states) return false;

		for (const key in projectOptions.states) {
			if (Object.hasOwnProperty.call(projectOptions.states, key)) {
				const close = projectOptions.states[key];
				const hasClosest = e.target.closest(key);

				if (!hasClosest && close) close(e);
			}
		}
	}

	document.addEventListener('click', click);
}