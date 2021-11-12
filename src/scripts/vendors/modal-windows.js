class ModalWindow {
	constructor(options = {}) {
		const fn = function() {};

		const defaultClasses = {
			js: 'js-modal-window',
			loading: 'loading',
			opened: 'opened',
			closed: 'closed',
			added: ''
		};

		const defaultLazyLoad = {
			options: {},
			submit: function(data, self) {
				if (data) {
					self.options.data = data;
					self.content.innerHTML = data;
				}
			},
			error: function(error) {
				console.error(error);
			}
		};

		const defaultTransitionModal = {
			display: 'flex',
			timeout: 200,
			height: false
		};

		const defaultTransitionPopup = {
			timeout: 200,
			opacity: false
		};

		const defaultOptions = {
			name: 'modal-window',
			unique: true,
			data: '',
			logo: true,

			transitions: {},

			template: function(self) {
				const options = self.options;
				const classes = options.classes;

				const logo = options.logo ? '<div class="modalWindow__logo"><img src="/images/cheviplus.svg" alt="Chevi plus"></div>' : '';

				return `
					<div class="modalWindow ${classes.js} ${classes.closed} ${classes.added}" data-modal-window="${options.name}" data-modal-close data-id="${self.id}">
						<div class="modalWindow__popup ${classes.closed}" data-modal-popup>
							${logo}
							<button class="modalWindow__close" data-modal-close type="button" aria-label="Закрыть окно">
								<svg width="24" height="24" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.3 0.70875C12.91 0.31875 12.28 0.31875 11.89 0.70875L7 5.58875L2.11 0.69875C1.72 0.30875 1.09 0.30875 0.700001 0.69875C0.310001 1.08875 0.310001 1.71875 0.700001 2.10875L5.59 6.99875L0.700001 11.8887C0.310001 12.2787 0.310001 12.9087 0.700001 13.2987C1.09 13.6887 1.72 13.6887 2.11 13.2987L7 8.40875L11.89 13.2987C12.28 13.6887 12.91 13.6887 13.3 13.2987C13.69 12.9087 13.69 12.2787 13.3 11.8887L8.41 6.99875L13.3 2.10875C13.68 1.72875 13.68 1.08875 13.3 0.70875Z"/></svg>
							</button>
							<div class="modalWindow__content" data-modal-content>${options.data}</div>
						</div>
					</div>
				`;
			},

			onInit: fn,
			onInited: fn,
			onLoad: fn,
			onLoaded: fn,
			onLoadedError: fn,
			onCreate: fn,
			onCreated: fn,
			onModalOpen: fn,
			onModalOpened: fn,
			onModalClose: fn,
			onModalClosed: fn,
			onPopupOpen: fn,
			onPopupOpened: fn,
			onPopupClose: fn,
			onPopupClosed: fn,
		};

		if (!options.transitions) options.transitions = {};

		this.options = Object.assign(defaultOptions, options);
		this.options.classes = Object.assign(defaultClasses, options.classes);
		this.options.lazyLoad = Object.assign(defaultLazyLoad, options.lazyLoad);
		this.options.transitions.modal = Object.assign(defaultTransitionModal, options.transitions.modal);
		this.options.transitions.popup = Object.assign(defaultTransitionPopup, options.transitions.popup);
		this.states = {
			init: false,
			load: false,
			create: false,
			modal: 'closed',
			popup: 'closed',
		}

		this.init();
	}

	init() {
		this.setState('init');

		this.id = Date.now();

		if (this.options.unique) {
			this.options.name = this.options.name + '-' + this.id;
		}

		let modal = document.querySelector('.'+this.options.classes.js+'[data-modal-window="'+this.options.name+'"]');

		if (!modal) {
			this.create();
			modal = document.querySelector('.'+this.options.classes.js+'[data-modal-window="'+this.options.name+'"]');
		}

		this.modal = modal;
		this.popup = modal.querySelector('[data-modal-popup]');
		this.content = modal.querySelector('[data-modal-content]');

		this.events();

		this.setState('inited');
	}

	create() {
		this.setState('create');

		const html = this.options.template(this);
		document.body.insertAdjacentHTML('beforeend', html);

		this.setState('created');
	}

	open() {
		const goodReq = function(self) {
			if (self.states.modal === 'opened') self.openElement('popup');
		};

		const errorReq = function(self) {
			if (self.states.modal === 'opened') self.close();
		}

		if (this.options.lazyLoad && this.states.load !== 'loaded') {
			this.loadContent(goodReq, errorReq);
		}

		this.openElement('modal', function(self) {
			if (!self.options.lazyLoad || self.states.load === 'loaded') {
				self.openElement('popup');
			} else if (self.states.load === 'loaded-error') {
				self.close();
			}
		});
	}

	close() {
		const closing = this.closeElement('popup', function(self) {
			self.closeElement('modal');
		});

		if (!closing) {
			this.closeElement('modal', function(self) {
				self.closeElement('popup');
			});
		}
	}

	openElement(name, callback) {
		const self = this;

		if (self.states[name] !== 'closed') return false;

		self.setState(name+'-open');

		window.requestAnimationFrame(function() {
			showElement(self[name], self.options.transitions[name], function() {
				self.setState(name+'-opened');
				typeof callback === 'function' && callback(self);
			});
		});

		return self;
	}

	closeElement(name, callback) {
		const self = this;

		if (self.states[name] !== 'opened') return false;

		self.setState(name+'-close');

		window.requestAnimationFrame(function() {
			hideElement(self[name], self.options.transitions[name], function() {
				self.setState(name+'-closed');
				typeof callback === 'function' && callback(self);
			});
		});

		return self;
	}

	loadContent(goodCallback, errorCallback) {
		const self = this;
		const lazyLoad = self.options.lazyLoad;

		self.setState('load');

		sendRequest(lazyLoad.options)
		.fetch
		.then(function(data) {
			lazyLoad.submit(data, self);
			self.setState('loaded');

			typeof goodCallback === 'function' && goodCallback(self);
		})
		.catch(function(error) {
			lazyLoad.error(error, self);
			self.setState('loaded-error');

			typeof errorCallback === 'function' && errorCallback(self);
		});

		return self;
	}

	events() {
		const self = this;

		self.modal.addEventListener('click', function(e) {
			const element = e.target;

			if (element.hasAttribute('data-modal-close') || element.closest('[data-modal-close]:not(.'+self.options.classes.js+')')) {
				self.close();
			}
		});
	}

	setState(name) {
		const options = this.options;
		const states = this.states;
		const modal = this.modal;
		const popup = this.popup;
		const classLoading = options.classes.loading;
		const classOpened = options.classes.opened;
		const classClosed = options.classes.closed;

		if (name === 'init') {
			options.onInit(this);
			states.init = 'init';
		}
		if (name === 'inited') {
			states.init = 'inited';
			options.onInited(this);
		}

		if (name === 'load') {
			options.onLoad(this);
			states.load = 'load';
			modal.classList.add(classLoading);
		}
		if (name === 'loaded') {
			states.load = 'loaded';
			modal.classList.remove(classLoading);
			options.onLoaded(this);
		}
		if (name === 'loaded-error') {
			states.load = 'loaded-error';
			modal.classList.remove(classLoading);
			options.onLoadedError(this);
		}

		if (name === 'create') {
			options.onCreate(this);
			states.create = 'create';
		}
		if (name === 'created') {
			states.create = 'created';
			options.onCreated(this);
		}

		if (name === 'modal-open') {
			options.onModalOpen(this);
			states.modal = 'open';
			modal.classList.remove(classClosed);
		}
		if (name === 'modal-opened') {
			states.modal = 'opened';
			modal.classList.add(classOpened);
			options.onModalOpened(this);
		}

		if (name === 'modal-close') {
			options.onModalClose(this);
			states.modal = 'close';
			modal.classList.remove(classOpened);
		}
		if (name === 'modal-closed') {
			states.modal = 'closed';
			modal.classList.add(classClosed);
			options.onModalClosed(this);
		}

		if (name === 'popup-open') {
			options.onPopupOpen(this);
			states.popup = 'open';
			popup.classList.remove(classClosed);
		}
		if (name === 'popup-opened') {
			states.popup = 'opened';
			popup.classList.add(classOpened);
			options.onPopupOpened(this);
		}

		if (name === 'popup-close') {
			options.onPopupClose(this);
			states.popup = 'close';
			popup.classList.remove(classOpened);
			modal.classList.remove(classLoading);
		}
		if (name === 'popup-closed') {
			states.popup = 'closed';
			popup.classList.add(classClosed);
			options.onPopupClosed(this);
		}
	}
}
