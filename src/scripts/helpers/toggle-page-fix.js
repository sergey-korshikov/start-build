const pageFix = function() {
	if (!document.body.classList.contains('disable-scroll')) {
		const pagePosition = window.scrollY;
		const widthScroll = window.innerWidth - document.body.offsetWidth;

		document.body.classList.add('disable-scroll');
		document.body.dataset.position = pagePosition;
		document.body.style.top = -pagePosition + 'px';
		if (widthScroll > 0) document.body.style.paddingRight = widthScroll + 'px';
	}
}

const pageUnfix = function() {
	if (document.body.classList.contains('disable-scroll')) {
		const pagePosition = parseInt(document.body.dataset.position, 10);

		document.body.removeAttribute('data-position');
		document.body.style.overflowY = 'auto';
		document.body.style.top = 'auto';
		document.body.style.paddingRight = 0;
		document.body.classList.remove('disable-scroll');
		window.scroll({ top: pagePosition, left: 0 });
	}
}