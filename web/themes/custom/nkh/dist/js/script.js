/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(18);
	module.exports = __webpack_require__(43);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

	/**
	 * Owl Carousel v2.2.0
	 * Copyright 2013-2016 David Deutsch
	 * Licensed under MIT (https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE)
	 */
	/**
	 * Owl carousel
	 * @version 2.1.6
	 * @author Bartosz Wojciechowski
	 * @author David Deutsch
	 * @license The MIT License (MIT)
	 * @todo Lazy Load Icon
	 * @todo prevent animationend bubling
	 * @todo itemsScaleUp
	 * @todo Test Zepto
	 * @todo stagePadding calculate wrong active classes
	 */
	;(function($, window, document, undefined) {

		/**
		 * Creates a carousel.
		 * @class The Owl Carousel.
		 * @public
		 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
		 * @param {Object} [options] - The options
		 */
		function Owl(element, options) {

			/**
			 * Current settings for the carousel.
			 * @public
			 */
			this.settings = null;

			/**
			 * Current options set by the caller including defaults.
			 * @public
			 */
			this.options = $.extend({}, Owl.Defaults, options);

			/**
			 * Plugin element.
			 * @public
			 */
			this.$element = $(element);

			/**
			 * Proxied event handlers.
			 * @protected
			 */
			this._handlers = {};

			/**
			 * References to the running plugins of this carousel.
			 * @protected
			 */
			this._plugins = {};

			/**
			 * Currently suppressed events to prevent them from beeing retriggered.
			 * @protected
			 */
			this._supress = {};

			/**
			 * Absolute current position.
			 * @protected
			 */
			this._current = null;

			/**
			 * Animation speed in milliseconds.
			 * @protected
			 */
			this._speed = null;

			/**
			 * Coordinates of all items in pixel.
			 * @todo The name of this member is missleading.
			 * @protected
			 */
			this._coordinates = [];

			/**
			 * Current breakpoint.
			 * @todo Real media queries would be nice.
			 * @protected
			 */
			this._breakpoint = null;

			/**
			 * Current width of the plugin element.
			 */
			this._width = null;

			/**
			 * All real items.
			 * @protected
			 */
			this._items = [];

			/**
			 * All cloned items.
			 * @protected
			 */
			this._clones = [];

			/**
			 * Merge values of all items.
			 * @todo Maybe this could be part of a plugin.
			 * @protected
			 */
			this._mergers = [];

			/**
			 * Widths of all items.
			 */
			this._widths = [];

			/**
			 * Invalidated parts within the update process.
			 * @protected
			 */
			this._invalidated = {};

			/**
			 * Ordered list of workers for the update process.
			 * @protected
			 */
			this._pipe = [];

			/**
			 * Current state information for the drag operation.
			 * @todo #261
			 * @protected
			 */
			this._drag = {
				time: null,
				target: null,
				pointer: null,
				stage: {
					start: null,
					current: null
				},
				direction: null
			};

			/**
			 * Current state information and their tags.
			 * @type {Object}
			 * @protected
			 */
			this._states = {
				current: {},
				tags: {
					'initializing': [ 'busy' ],
					'animating': [ 'busy' ],
					'dragging': [ 'interacting' ]
				}
			};

			$.each([ 'onResize', 'onThrottledResize' ], $.proxy(function(i, handler) {
				this._handlers[handler] = $.proxy(this[handler], this);
			}, this));

			$.each(Owl.Plugins, $.proxy(function(key, plugin) {
				this._plugins[key.charAt(0).toLowerCase() + key.slice(1)]
					= new plugin(this);
			}, this));

			$.each(Owl.Workers, $.proxy(function(priority, worker) {
				this._pipe.push({
					'filter': worker.filter,
					'run': $.proxy(worker.run, this)
				});
			}, this));

			this.setup();
			this.initialize();
		}

		/**
		 * Default options for the carousel.
		 * @public
		 */
		Owl.Defaults = {
			items: 3,
			loop: false,
			center: false,
			rewind: false,

			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			freeDrag: false,

			margin: 0,
			stagePadding: 0,

			merge: false,
			mergeFit: true,
			autoWidth: false,

			startPosition: 0,
			rtl: false,

			smartSpeed: 250,
			fluidSpeed: false,
			dragEndSpeed: false,

			responsive: {},
			responsiveRefreshRate: 200,
			responsiveBaseElement: window,

			fallbackEasing: 'swing',

			info: false,

			nestedItemSelector: false,
			itemElement: 'div',
			stageElement: 'div',

			refreshClass: 'owl-refresh',
			loadedClass: 'owl-loaded',
			loadingClass: 'owl-loading',
			rtlClass: 'owl-rtl',
			responsiveClass: 'owl-responsive',
			dragClass: 'owl-drag',
			itemClass: 'owl-item',
			stageClass: 'owl-stage',
			stageOuterClass: 'owl-stage-outer',
			grabClass: 'owl-grab'
		};

		/**
		 * Enumeration for width.
		 * @public
		 * @readonly
		 * @enum {String}
		 */
		Owl.Width = {
			Default: 'default',
			Inner: 'inner',
			Outer: 'outer'
		};

		/**
		 * Enumeration for types.
		 * @public
		 * @readonly
		 * @enum {String}
		 */
		Owl.Type = {
			Event: 'event',
			State: 'state'
		};

		/**
		 * Contains all registered plugins.
		 * @public
		 */
		Owl.Plugins = {};

		/**
		 * List of workers involved in the update process.
		 */
		Owl.Workers = [ {
			filter: [ 'width', 'settings' ],
			run: function() {
				this._width = this.$element.width();
			}
		}, {
			filter: [ 'width', 'items', 'settings' ],
			run: function(cache) {
				cache.current = this._items && this._items[this.relative(this._current)];
			}
		}, {
			filter: [ 'items', 'settings' ],
			run: function() {
				this.$stage.children('.cloned').remove();
			}
		}, {
			filter: [ 'width', 'items', 'settings' ],
			run: function(cache) {
				var margin = this.settings.margin || '',
					grid = !this.settings.autoWidth,
					rtl = this.settings.rtl,
					css = {
						'width': 'auto',
						'margin-left': rtl ? margin : '',
						'margin-right': rtl ? '' : margin
					};

				!grid && this.$stage.children().css(css);

				cache.css = css;
			}
		}, {
			filter: [ 'width', 'items', 'settings' ],
			run: function(cache) {
				var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
					merge = null,
					iterator = this._items.length,
					grid = !this.settings.autoWidth,
					widths = [];

				cache.items = {
					merge: false,
					width: width
				};

				while (iterator--) {
					merge = this._mergers[iterator];
					merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

					cache.items.merge = merge > 1 || cache.items.merge;

					widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
				}

				this._widths = widths;
			}
		}, {
			filter: [ 'items', 'settings' ],
			run: function() {
				var clones = [],
					items = this._items,
					settings = this.settings,
					view = Math.max(settings.items * 2, 4),
					size = Math.ceil(items.length / 2) * 2,
					repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
					append = '',
					prepend = '';

				repeat /= 2;

				while (repeat--) {
					clones.push(this.normalize(clones.length / 2, true));
					append = append + items[clones[clones.length - 1]][0].outerHTML;
					clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
					prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
				}

				this._clones = clones;

				$(append).addClass('cloned').appendTo(this.$stage);
				$(prepend).addClass('cloned').prependTo(this.$stage);
			}
		}, {
			filter: [ 'width', 'items', 'settings' ],
			run: function() {
				var rtl = this.settings.rtl ? 1 : -1,
					size = this._clones.length + this._items.length,
					iterator = -1,
					previous = 0,
					current = 0,
					coordinates = [];

				while (++iterator < size) {
					previous = coordinates[iterator - 1] || 0;
					current = this._widths[this.relative(iterator)] + this.settings.margin;
					coordinates.push(previous + current * rtl);
				}

				this._coordinates = coordinates;
			}
		}, {
			filter: [ 'width', 'items', 'settings' ],
			run: function() {
				var padding = this.settings.stagePadding,
					coordinates = this._coordinates,
					css = {
						'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
						'padding-left': padding || '',
						'padding-right': padding || ''
					};

				this.$stage.css(css);
			}
		}, {
			filter: [ 'width', 'items', 'settings' ],
			run: function(cache) {
				var iterator = this._coordinates.length,
					grid = !this.settings.autoWidth,
					items = this.$stage.children();

				if (grid && cache.items.merge) {
					while (iterator--) {
						cache.css.width = this._widths[this.relative(iterator)];
						items.eq(iterator).css(cache.css);
					}
				} else if (grid) {
					cache.css.width = cache.items.width;
					items.css(cache.css);
				}
			}
		}, {
			filter: [ 'items' ],
			run: function() {
				this._coordinates.length < 1 && this.$stage.removeAttr('style');
			}
		}, {
			filter: [ 'width', 'items', 'settings' ],
			run: function(cache) {
				cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
				cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
				this.reset(cache.current);
			}
		}, {
			filter: [ 'position' ],
			run: function() {
				this.animate(this.coordinates(this._current));
			}
		}, {
			filter: [ 'width', 'position', 'items', 'settings' ],
			run: function() {
				var rtl = this.settings.rtl ? 1 : -1,
					padding = this.settings.stagePadding * 2,
					begin = this.coordinates(this.current()) + padding,
					end = begin + this.width() * rtl,
					inner, outer, matches = [], i, n;

				for (i = 0, n = this._coordinates.length; i < n; i++) {
					inner = this._coordinates[i - 1] || 0;
					outer = Math.abs(this._coordinates[i]) + padding * rtl;

					if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
						|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
						matches.push(i);
					}
				}

				this.$stage.children('.active').removeClass('active');
				this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

				if (this.settings.center) {
					this.$stage.children('.center').removeClass('center');
					this.$stage.children().eq(this.current()).addClass('center');
				}
			}
		} ];

		/**
		 * Initializes the carousel.
		 * @protected
		 */
		Owl.prototype.initialize = function() {
			this.enter('initializing');
			this.trigger('initialize');

			this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

			if (this.settings.autoWidth && !this.is('pre-loading')) {
				var imgs, nestedSelector, width;
				imgs = this.$element.find('img');
				nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
				width = this.$element.children(nestedSelector).width();

				if (imgs.length && width <= 0) {
					this.preloadAutoWidthImages(imgs);
				}
			}

			this.$element.addClass(this.options.loadingClass);

			// create stage
			this.$stage = $('<' + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>')
				.wrap('<div class="' + this.settings.stageOuterClass + '"/>');

			// append stage
			this.$element.append(this.$stage.parent());

			// append content
			this.replace(this.$element.children().not(this.$stage.parent()));

			// check visibility
			if (this.$element.is(':visible')) {
				// update view
				this.refresh();
			} else {
				// invalidate width
				this.invalidate('width');
			}

			this.$element
				.removeClass(this.options.loadingClass)
				.addClass(this.options.loadedClass);

			// register event handlers
			this.registerEventHandlers();

			this.leave('initializing');
			this.trigger('initialized');
		};

		/**
		 * Setups the current settings.
		 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
		 * @todo Support for media queries by using `matchMedia` would be nice.
		 * @public
		 */
		Owl.prototype.setup = function() {
			var viewport = this.viewport(),
				overwrites = this.options.responsive,
				match = -1,
				settings = null;

			if (!overwrites) {
				settings = $.extend({}, this.options);
			} else {
				$.each(overwrites, function(breakpoint) {
					if (breakpoint <= viewport && breakpoint > match) {
						match = Number(breakpoint);
					}
				});

				settings = $.extend({}, this.options, overwrites[match]);
				if (typeof settings.stagePadding === 'function') {
					settings.stagePadding = settings.stagePadding();
				}
				delete settings.responsive;

				// responsive class
				if (settings.responsiveClass) {
					this.$element.attr('class',
						this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
					);
				}
			}

			this.trigger('change', { property: { name: 'settings', value: settings } });
			this._breakpoint = match;
			this.settings = settings;
			this.invalidate('settings');
			this.trigger('changed', { property: { name: 'settings', value: this.settings } });
		};

		/**
		 * Updates option logic if necessery.
		 * @protected
		 */
		Owl.prototype.optionsLogic = function() {
			if (this.settings.autoWidth) {
				this.settings.stagePadding = false;
				this.settings.merge = false;
			}
		};

		/**
		 * Prepares an item before add.
		 * @todo Rename event parameter `content` to `item`.
		 * @protected
		 * @returns {jQuery|HTMLElement} - The item container.
		 */
		Owl.prototype.prepare = function(item) {
			var event = this.trigger('prepare', { content: item });

			if (!event.data) {
				event.data = $('<' + this.settings.itemElement + '/>')
					.addClass(this.options.itemClass).append(item)
			}

			this.trigger('prepared', { content: event.data });

			return event.data;
		};

		/**
		 * Updates the view.
		 * @public
		 */
		Owl.prototype.update = function() {
			var i = 0,
				n = this._pipe.length,
				filter = $.proxy(function(p) { return this[p] }, this._invalidated),
				cache = {};

			while (i < n) {
				if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
					this._pipe[i].run(cache);
				}
				i++;
			}

			this._invalidated = {};

			!this.is('valid') && this.enter('valid');
		};

		/**
		 * Gets the width of the view.
		 * @public
		 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
		 * @returns {Number} - The width of the view in pixel.
		 */
		Owl.prototype.width = function(dimension) {
			dimension = dimension || Owl.Width.Default;
			switch (dimension) {
				case Owl.Width.Inner:
				case Owl.Width.Outer:
					return this._width;
				default:
					return this._width - this.settings.stagePadding * 2 + this.settings.margin;
			}
		};

		/**
		 * Refreshes the carousel primarily for adaptive purposes.
		 * @public
		 */
		Owl.prototype.refresh = function() {
			this.enter('refreshing');
			this.trigger('refresh');

			this.setup();

			this.optionsLogic();

			this.$element.addClass(this.options.refreshClass);

			this.update();

			this.$element.removeClass(this.options.refreshClass);

			this.leave('refreshing');
			this.trigger('refreshed');
		};

		/**
		 * Checks window `resize` event.
		 * @protected
		 */
		Owl.prototype.onThrottledResize = function() {
			window.clearTimeout(this.resizeTimer);
			this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
		};

		/**
		 * Checks window `resize` event.
		 * @protected
		 */
		Owl.prototype.onResize = function() {
			if (!this._items.length) {
				return false;
			}

			if (this._width === this.$element.width()) {
				return false;
			}

			if (!this.$element.is(':visible')) {
				return false;
			}

			this.enter('resizing');

			if (this.trigger('resize').isDefaultPrevented()) {
				this.leave('resizing');
				return false;
			}

			this.invalidate('width');

			this.refresh();

			this.leave('resizing');
			this.trigger('resized');
		};

		/**
		 * Registers event handlers.
		 * @todo Check `msPointerEnabled`
		 * @todo #261
		 * @protected
		 */
		Owl.prototype.registerEventHandlers = function() {
			if ($.support.transition) {
				this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
			}

			if (this.settings.responsive !== false) {
				this.on(window, 'resize', this._handlers.onThrottledResize);
			}

			if (this.settings.mouseDrag) {
				this.$element.addClass(this.options.dragClass);
				this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
				this.$stage.on('dragstart.owl.core selectstart.owl.core', function() { return false });
			}

			if (this.settings.touchDrag){
				this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
				this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
			}
		};

		/**
		 * Handles `touchstart` and `mousedown` events.
		 * @todo Horizontal swipe threshold as option
		 * @todo #261
		 * @protected
		 * @param {Event} event - The event arguments.
		 */
		Owl.prototype.onDragStart = function(event) {
			var stage = null;

			if (event.which === 3) {
				return;
			}

			if ($.support.transform) {
				stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
				stage = {
					x: stage[stage.length === 16 ? 12 : 4],
					y: stage[stage.length === 16 ? 13 : 5]
				};
			} else {
				stage = this.$stage.position();
				stage = {
					x: this.settings.rtl ?
						stage.left + this.$stage.width() - this.width() + this.settings.margin :
						stage.left,
					y: stage.top
				};
			}

			if (this.is('animating')) {
				$.support.transform ? this.animate(stage.x) : this.$stage.stop()
				this.invalidate('position');
			}

			this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

			this.speed(0);

			this._drag.time = new Date().getTime();
			this._drag.target = $(event.target);
			this._drag.stage.start = stage;
			this._drag.stage.current = stage;
			this._drag.pointer = this.pointer(event);

			$(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

			$(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
				var delta = this.difference(this._drag.pointer, this.pointer(event));

				$(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

				if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
					return;
				}

				event.preventDefault();

				this.enter('dragging');
				this.trigger('drag');
			}, this));
		};

		/**
		 * Handles the `touchmove` and `mousemove` events.
		 * @todo #261
		 * @protected
		 * @param {Event} event - The event arguments.
		 */
		Owl.prototype.onDragMove = function(event) {
			var minimum = null,
				maximum = null,
				pull = null,
				delta = this.difference(this._drag.pointer, this.pointer(event)),
				stage = this.difference(this._drag.stage.start, delta);

			if (!this.is('dragging')) {
				return;
			}

			event.preventDefault();

			if (this.settings.loop) {
				minimum = this.coordinates(this.minimum());
				maximum = this.coordinates(this.maximum() + 1) - minimum;
				stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
			} else {
				minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
				maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
				pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
				stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
			}

			this._drag.stage.current = stage;

			this.animate(stage.x);
		};

		/**
		 * Handles the `touchend` and `mouseup` events.
		 * @todo #261
		 * @todo Threshold for click event
		 * @protected
		 * @param {Event} event - The event arguments.
		 */
		Owl.prototype.onDragEnd = function(event) {
			var delta = this.difference(this._drag.pointer, this.pointer(event)),
				stage = this._drag.stage.current,
				direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

			$(document).off('.owl.core');

			this.$element.removeClass(this.options.grabClass);

			if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
				this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
				this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
				this.invalidate('position');
				this.update();

				this._drag.direction = direction;

				if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
					this._drag.target.one('click.owl.core', function() { return false; });
				}
			}

			if (!this.is('dragging')) {
				return;
			}

			this.leave('dragging');
			this.trigger('dragged');
		};

		/**
		 * Gets absolute position of the closest item for a coordinate.
		 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
		 * @protected
		 * @param {Number} coordinate - The coordinate in pixel.
		 * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
		 * @return {Number} - The absolute position of the closest item.
		 */
		Owl.prototype.closest = function(coordinate, direction) {
			var position = -1,
				pull = 30,
				width = this.width(),
				coordinates = this.coordinates();

			if (!this.settings.freeDrag) {
				// check closest item
				$.each(coordinates, $.proxy(function(index, value) {
					// on a left pull, check on current index
					if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
						position = index;
					// on a right pull, check on previous index
					// to do so, subtract width from value and set position = index + 1
					} else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
						position = index + 1;
					} else if (this.op(coordinate, '<', value)
						&& this.op(coordinate, '>', coordinates[index + 1] || value - width)) {
						position = direction === 'left' ? index + 1 : index;
					}
					return position === -1;
				}, this));
			}

			if (!this.settings.loop) {
				// non loop boundries
				if (this.op(coordinate, '>', coordinates[this.minimum()])) {
					position = coordinate = this.minimum();
				} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
					position = coordinate = this.maximum();
				}
			}

			return position;
		};

		/**
		 * Animates the stage.
		 * @todo #270
		 * @public
		 * @param {Number} coordinate - The coordinate in pixels.
		 */
		Owl.prototype.animate = function(coordinate) {
			var animate = this.speed() > 0;

			this.is('animating') && this.onTransitionEnd();

			if (animate) {
				this.enter('animating');
				this.trigger('translate');
			}

			if ($.support.transform3d && $.support.transition) {
				this.$stage.css({
					transform: 'translate3d(' + coordinate + 'px,0px,0px)',
					transition: (this.speed() / 1000) + 's'
				});
			} else if (animate) {
				this.$stage.animate({
					left: coordinate + 'px'
				}, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
			} else {
				this.$stage.css({
					left: coordinate + 'px'
				});
			}
		};

		/**
		 * Checks whether the carousel is in a specific state or not.
		 * @param {String} state - The state to check.
		 * @returns {Boolean} - The flag which indicates if the carousel is busy.
		 */
		Owl.prototype.is = function(state) {
			return this._states.current[state] && this._states.current[state] > 0;
		};

		/**
		 * Sets the absolute position of the current item.
		 * @public
		 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
		 * @returns {Number} - The absolute position of the current item.
		 */
		Owl.prototype.current = function(position) {
			if (position === undefined) {
				return this._current;
			}

			if (this._items.length === 0) {
				return undefined;
			}

			position = this.normalize(position);

			if (this._current !== position) {
				var event = this.trigger('change', { property: { name: 'position', value: position } });

				if (event.data !== undefined) {
					position = this.normalize(event.data);
				}

				this._current = position;

				this.invalidate('position');

				this.trigger('changed', { property: { name: 'position', value: this._current } });
			}

			return this._current;
		};

		/**
		 * Invalidates the given part of the update routine.
		 * @param {String} [part] - The part to invalidate.
		 * @returns {Array.<String>} - The invalidated parts.
		 */
		Owl.prototype.invalidate = function(part) {
			if ($.type(part) === 'string') {
				this._invalidated[part] = true;
				this.is('valid') && this.leave('valid');
			}
			return $.map(this._invalidated, function(v, i) { return i });
		};

		/**
		 * Resets the absolute position of the current item.
		 * @public
		 * @param {Number} position - The absolute position of the new item.
		 */
		Owl.prototype.reset = function(position) {
			position = this.normalize(position);

			if (position === undefined) {
				return;
			}

			this._speed = 0;
			this._current = position;

			this.suppress([ 'translate', 'translated' ]);

			this.animate(this.coordinates(position));

			this.release([ 'translate', 'translated' ]);
		};

		/**
		 * Normalizes an absolute or a relative position of an item.
		 * @public
		 * @param {Number} position - The absolute or relative position to normalize.
		 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
		 * @returns {Number} - The normalized position.
		 */
		Owl.prototype.normalize = function(position, relative) {
			var n = this._items.length,
				m = relative ? 0 : this._clones.length;

			if (!this.isNumeric(position) || n < 1) {
				position = undefined;
			} else if (position < 0 || position >= n + m) {
				position = ((position - m / 2) % n + n) % n + m / 2;
			}

			return position;
		};

		/**
		 * Converts an absolute position of an item into a relative one.
		 * @public
		 * @param {Number} position - The absolute position to convert.
		 * @returns {Number} - The converted position.
		 */
		Owl.prototype.relative = function(position) {
			position -= this._clones.length / 2;
			return this.normalize(position, true);
		};

		/**
		 * Gets the maximum position for the current item.
		 * @public
		 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
		 * @returns {Number}
		 */
		Owl.prototype.maximum = function(relative) {
			var settings = this.settings,
				maximum = this._coordinates.length,
				iterator,
				reciprocalItemsWidth,
				elementWidth;

			if (settings.loop) {
				maximum = this._clones.length / 2 + this._items.length - 1;
			} else if (settings.autoWidth || settings.merge) {
				iterator = this._items.length;
				reciprocalItemsWidth = this._items[--iterator].width();
				elementWidth = this.$element.width();
				while (iterator--) {
					reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
					if (reciprocalItemsWidth > elementWidth) {
						break;
					}
				}
				maximum = iterator + 1;
			} else if (settings.center) {
				maximum = this._items.length - 1;
			} else {
				maximum = this._items.length - settings.items;
			}

			if (relative) {
				maximum -= this._clones.length / 2;
			}

			return Math.max(maximum, 0);
		};

		/**
		 * Gets the minimum position for the current item.
		 * @public
		 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
		 * @returns {Number}
		 */
		Owl.prototype.minimum = function(relative) {
			return relative ? 0 : this._clones.length / 2;
		};

		/**
		 * Gets an item at the specified relative position.
		 * @public
		 * @param {Number} [position] - The relative position of the item.
		 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
		 */
		Owl.prototype.items = function(position) {
			if (position === undefined) {
				return this._items.slice();
			}

			position = this.normalize(position, true);
			return this._items[position];
		};

		/**
		 * Gets an item at the specified relative position.
		 * @public
		 * @param {Number} [position] - The relative position of the item.
		 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
		 */
		Owl.prototype.mergers = function(position) {
			if (position === undefined) {
				return this._mergers.slice();
			}

			position = this.normalize(position, true);
			return this._mergers[position];
		};

		/**
		 * Gets the absolute positions of clones for an item.
		 * @public
		 * @param {Number} [position] - The relative position of the item.
		 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
		 */
		Owl.prototype.clones = function(position) {
			var odd = this._clones.length / 2,
				even = odd + this._items.length,
				map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

			if (position === undefined) {
				return $.map(this._clones, function(v, i) { return map(i) });
			}

			return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
		};

		/**
		 * Sets the current animation speed.
		 * @public
		 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
		 * @returns {Number} - The current animation speed in milliseconds.
		 */
		Owl.prototype.speed = function(speed) {
			if (speed !== undefined) {
				this._speed = speed;
			}

			return this._speed;
		};

		/**
		 * Gets the coordinate of an item.
		 * @todo The name of this method is missleanding.
		 * @public
		 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
		 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
		 */
		Owl.prototype.coordinates = function(position) {
			var multiplier = 1,
				newPosition = position - 1,
				coordinate;

			if (position === undefined) {
				return $.map(this._coordinates, $.proxy(function(coordinate, index) {
					return this.coordinates(index);
				}, this));
			}

			if (this.settings.center) {
				if (this.settings.rtl) {
					multiplier = -1;
					newPosition = position + 1;
				}

				coordinate = this._coordinates[position];
				coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
			} else {
				coordinate = this._coordinates[newPosition] || 0;
			}

			coordinate = Math.ceil(coordinate);

			return coordinate;
		};

		/**
		 * Calculates the speed for a translation.
		 * @protected
		 * @param {Number} from - The absolute position of the start item.
		 * @param {Number} to - The absolute position of the target item.
		 * @param {Number} [factor=undefined] - The time factor in milliseconds.
		 * @returns {Number} - The time in milliseconds for the translation.
		 */
		Owl.prototype.duration = function(from, to, factor) {
			if (factor === 0) {
				return 0;
			}

			return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
		};

		/**
		 * Slides to the specified item.
		 * @public
		 * @param {Number} position - The position of the item.
		 * @param {Number} [speed] - The time in milliseconds for the transition.
		 */
		Owl.prototype.to = function(position, speed) {
			var current = this.current(),
				revert = null,
				distance = position - this.relative(current),
				direction = (distance > 0) - (distance < 0),
				items = this._items.length,
				minimum = this.minimum(),
				maximum = this.maximum();

			if (this.settings.loop) {
				if (!this.settings.rewind && Math.abs(distance) > items / 2) {
					distance += direction * -1 * items;
				}

				position = current + distance;
				revert = ((position - minimum) % items + items) % items + minimum;

				if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
					current = revert - distance;
					position = revert;
					this.reset(current);
				}
			} else if (this.settings.rewind) {
				maximum += 1;
				position = (position % maximum + maximum) % maximum;
			} else {
				position = Math.max(minimum, Math.min(maximum, position));
			}

			this.speed(this.duration(current, position, speed));
			this.current(position);

			if (this.$element.is(':visible')) {
				this.update();
			}
		};

		/**
		 * Slides to the next item.
		 * @public
		 * @param {Number} [speed] - The time in milliseconds for the transition.
		 */
		Owl.prototype.next = function(speed) {
			speed = speed || false;
			this.to(this.relative(this.current()) + 1, speed);
		};

		/**
		 * Slides to the previous item.
		 * @public
		 * @param {Number} [speed] - The time in milliseconds for the transition.
		 */
		Owl.prototype.prev = function(speed) {
			speed = speed || false;
			this.to(this.relative(this.current()) - 1, speed);
		};

		/**
		 * Handles the end of an animation.
		 * @protected
		 * @param {Event} event - The event arguments.
		 */
		Owl.prototype.onTransitionEnd = function(event) {

			// if css2 animation then event object is undefined
			if (event !== undefined) {
				event.stopPropagation();

				// Catch only owl-stage transitionEnd event
				if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
					return false;
				}
			}

			this.leave('animating');
			this.trigger('translated');
		};

		/**
		 * Gets viewport width.
		 * @protected
		 * @return {Number} - The width in pixel.
		 */
		Owl.prototype.viewport = function() {
			var width;
			if (this.options.responsiveBaseElement !== window) {
				width = $(this.options.responsiveBaseElement).width();
			} else if (window.innerWidth) {
				width = window.innerWidth;
			} else if (document.documentElement && document.documentElement.clientWidth) {
				width = document.documentElement.clientWidth;
			} else {
				throw 'Can not detect viewport width.';
			}
			return width;
		};

		/**
		 * Replaces the current content.
		 * @public
		 * @param {HTMLElement|jQuery|String} content - The new content.
		 */
		Owl.prototype.replace = function(content) {
			this.$stage.empty();
			this._items = [];

			if (content) {
				content = (content instanceof jQuery) ? content : $(content);
			}

			if (this.settings.nestedItemSelector) {
				content = content.find('.' + this.settings.nestedItemSelector);
			}

			content.filter(function() {
				return this.nodeType === 1;
			}).each($.proxy(function(index, item) {
				item = this.prepare(item);
				this.$stage.append(item);
				this._items.push(item);
				this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
			}, this));

			this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

			this.invalidate('items');
		};

		/**
		 * Adds an item.
		 * @todo Use `item` instead of `content` for the event arguments.
		 * @public
		 * @param {HTMLElement|jQuery|String} content - The item content to add.
		 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
		 */
		Owl.prototype.add = function(content, position) {
			var current = this.relative(this._current);

			position = position === undefined ? this._items.length : this.normalize(position, true);
			content = content instanceof jQuery ? content : $(content);

			this.trigger('add', { content: content, position: position });

			content = this.prepare(content);

			if (this._items.length === 0 || position === this._items.length) {
				this._items.length === 0 && this.$stage.append(content);
				this._items.length !== 0 && this._items[position - 1].after(content);
				this._items.push(content);
				this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
			} else {
				this._items[position].before(content);
				this._items.splice(position, 0, content);
				this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
			}

			this._items[current] && this.reset(this._items[current].index());

			this.invalidate('items');

			this.trigger('added', { content: content, position: position });
		};

		/**
		 * Removes an item by its position.
		 * @todo Use `item` instead of `content` for the event arguments.
		 * @public
		 * @param {Number} position - The relative position of the item to remove.
		 */
		Owl.prototype.remove = function(position) {
			position = this.normalize(position, true);

			if (position === undefined) {
				return;
			}

			this.trigger('remove', { content: this._items[position], position: position });

			this._items[position].remove();
			this._items.splice(position, 1);
			this._mergers.splice(position, 1);

			this.invalidate('items');

			this.trigger('removed', { content: null, position: position });
		};

		/**
		 * Preloads images with auto width.
		 * @todo Replace by a more generic approach
		 * @protected
		 */
		Owl.prototype.preloadAutoWidthImages = function(images) {
			images.each($.proxy(function(i, element) {
				this.enter('pre-loading');
				element = $(element);
				$(new Image()).one('load', $.proxy(function(e) {
					element.attr('src', e.target.src);
					element.css('opacity', 1);
					this.leave('pre-loading');
					!this.is('pre-loading') && !this.is('initializing') && this.refresh();
				}, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
			}, this));
		};

		/**
		 * Destroys the carousel.
		 * @public
		 */
		Owl.prototype.destroy = function() {

			this.$element.off('.owl.core');
			this.$stage.off('.owl.core');
			$(document).off('.owl.core');

			if (this.settings.responsive !== false) {
				window.clearTimeout(this.resizeTimer);
				this.off(window, 'resize', this._handlers.onThrottledResize);
			}

			for (var i in this._plugins) {
				this._plugins[i].destroy();
			}

			this.$stage.children('.cloned').remove();

			this.$stage.unwrap();
			this.$stage.children().contents().unwrap();
			this.$stage.children().unwrap();

			this.$element
				.removeClass(this.options.refreshClass)
				.removeClass(this.options.loadingClass)
				.removeClass(this.options.loadedClass)
				.removeClass(this.options.rtlClass)
				.removeClass(this.options.dragClass)
				.removeClass(this.options.grabClass)
				.attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
				.removeData('owl.carousel');
		};

		/**
		 * Operators to calculate right-to-left and left-to-right.
		 * @protected
		 * @param {Number} [a] - The left side operand.
		 * @param {String} [o] - The operator.
		 * @param {Number} [b] - The right side operand.
		 */
		Owl.prototype.op = function(a, o, b) {
			var rtl = this.settings.rtl;
			switch (o) {
				case '<':
					return rtl ? a > b : a < b;
				case '>':
					return rtl ? a < b : a > b;
				case '>=':
					return rtl ? a <= b : a >= b;
				case '<=':
					return rtl ? a >= b : a <= b;
				default:
					break;
			}
		};

		/**
		 * Attaches to an internal event.
		 * @protected
		 * @param {HTMLElement} element - The event source.
		 * @param {String} event - The event name.
		 * @param {Function} listener - The event handler to attach.
		 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
		 */
		Owl.prototype.on = function(element, event, listener, capture) {
			if (element.addEventListener) {
				element.addEventListener(event, listener, capture);
			} else if (element.attachEvent) {
				element.attachEvent('on' + event, listener);
			}
		};

		/**
		 * Detaches from an internal event.
		 * @protected
		 * @param {HTMLElement} element - The event source.
		 * @param {String} event - The event name.
		 * @param {Function} listener - The attached event handler to detach.
		 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
		 */
		Owl.prototype.off = function(element, event, listener, capture) {
			if (element.removeEventListener) {
				element.removeEventListener(event, listener, capture);
			} else if (element.detachEvent) {
				element.detachEvent('on' + event, listener);
			}
		};

		/**
		 * Triggers a public event.
		 * @todo Remove `status`, `relatedTarget` should be used instead.
		 * @protected
		 * @param {String} name - The event name.
		 * @param {*} [data=null] - The event data.
		 * @param {String} [namespace=carousel] - The event namespace.
		 * @param {String} [state] - The state which is associated with the event.
		 * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
		 * @returns {Event} - The event arguments.
		 */
		Owl.prototype.trigger = function(name, data, namespace, state, enter) {
			var status = {
				item: { count: this._items.length, index: this.current() }
			}, handler = $.camelCase(
				$.grep([ 'on', name, namespace ], function(v) { return v })
					.join('-').toLowerCase()
			), event = $.Event(
				[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
				$.extend({ relatedTarget: this }, status, data)
			);

			if (!this._supress[name]) {
				$.each(this._plugins, function(name, plugin) {
					if (plugin.onTrigger) {
						plugin.onTrigger(event);
					}
				});

				this.register({ type: Owl.Type.Event, name: name });
				this.$element.trigger(event);

				if (this.settings && typeof this.settings[handler] === 'function') {
					this.settings[handler].call(this, event);
				}
			}

			return event;
		};

		/**
		 * Enters a state.
		 * @param name - The state name.
		 */
		Owl.prototype.enter = function(name) {
			$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
				if (this._states.current[name] === undefined) {
					this._states.current[name] = 0;
				}

				this._states.current[name]++;
			}, this));
		};

		/**
		 * Leaves a state.
		 * @param name - The state name.
		 */
		Owl.prototype.leave = function(name) {
			$.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
				this._states.current[name]--;
			}, this));
		};

		/**
		 * Registers an event or state.
		 * @public
		 * @param {Object} object - The event or state to register.
		 */
		Owl.prototype.register = function(object) {
			if (object.type === Owl.Type.Event) {
				if (!$.event.special[object.name]) {
					$.event.special[object.name] = {};
				}

				if (!$.event.special[object.name].owl) {
					var _default = $.event.special[object.name]._default;
					$.event.special[object.name]._default = function(e) {
						if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
							return _default.apply(this, arguments);
						}
						return e.namespace && e.namespace.indexOf('owl') > -1;
					};
					$.event.special[object.name].owl = true;
				}
			} else if (object.type === Owl.Type.State) {
				if (!this._states.tags[object.name]) {
					this._states.tags[object.name] = object.tags;
				} else {
					this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
				}

				this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
					return $.inArray(tag, this._states.tags[object.name]) === i;
				}, this));
			}
		};

		/**
		 * Suppresses events.
		 * @protected
		 * @param {Array.<String>} events - The events to suppress.
		 */
		Owl.prototype.suppress = function(events) {
			$.each(events, $.proxy(function(index, event) {
				this._supress[event] = true;
			}, this));
		};

		/**
		 * Releases suppressed events.
		 * @protected
		 * @param {Array.<String>} events - The events to release.
		 */
		Owl.prototype.release = function(events) {
			$.each(events, $.proxy(function(index, event) {
				delete this._supress[event];
			}, this));
		};

		/**
		 * Gets unified pointer coordinates from event.
		 * @todo #261
		 * @protected
		 * @param {Event} - The `mousedown` or `touchstart` event.
		 * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
		 */
		Owl.prototype.pointer = function(event) {
			var result = { x: null, y: null };

			event = event.originalEvent || event || window.event;

			event = event.touches && event.touches.length ?
				event.touches[0] : event.changedTouches && event.changedTouches.length ?
					event.changedTouches[0] : event;

			if (event.pageX) {
				result.x = event.pageX;
				result.y = event.pageY;
			} else {
				result.x = event.clientX;
				result.y = event.clientY;
			}

			return result;
		};

		/**
		 * Determines if the input is a Number or something that can be coerced to a Number
		 * @protected
		 * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
		 * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
		 */
		Owl.prototype.isNumeric = function(number) {
			return !isNaN(parseFloat(number));
		};

		/**
		 * Gets the difference of two vectors.
		 * @todo #261
		 * @protected
		 * @param {Object} - The first vector.
		 * @param {Object} - The second vector.
		 * @returns {Object} - The difference.
		 */
		Owl.prototype.difference = function(first, second) {
			return {
				x: first.x - second.x,
				y: first.y - second.y
			};
		};

		/**
		 * The jQuery Plugin for the Owl Carousel
		 * @todo Navigation plugin `next` and `prev`
		 * @public
		 */
		$.fn.owlCarousel = function(option) {
			var args = Array.prototype.slice.call(arguments, 1);

			return this.each(function() {
				var $this = $(this),
					data = $this.data('owl.carousel');

				if (!data) {
					data = new Owl(this, typeof option == 'object' && option);
					$this.data('owl.carousel', data);

					$.each([
						'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
					], function(i, event) {
						data.register({ type: Owl.Type.Event, name: event });
						data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
							if (e.namespace && e.relatedTarget !== this) {
								this.suppress([ event ]);
								data[event].apply(this, [].slice.call(arguments, 1));
								this.release([ event ]);
							}
						}, data));
					});
				}

				if (typeof option == 'string' && option.charAt(0) !== '_') {
					data[option].apply(data, args);
				}
			});
		};

		/**
		 * The constructor for the jQuery Plugin
		 * @public
		 */
		$.fn.owlCarousel.Constructor = Owl;

	})(window.Zepto || window.jQuery, window, document);

	/**
	 * AutoRefresh Plugin
	 * @version 2.1.0
	 * @author Artus Kolanowski
	 * @author David Deutsch
	 * @license The MIT License (MIT)
	 */
	;(function($, window, document, undefined) {

		/**
		 * Creates the auto refresh plugin.
		 * @class The Auto Refresh Plugin
		 * @param {Owl} carousel - The Owl Carousel
		 */
		var AutoRefresh = function(carousel) {
			/**
			 * Reference to the core.
			 * @protected
			 * @type {Owl}
			 */
			this._core = carousel;

			/**
			 * Refresh interval.
			 * @protected
			 * @type {number}
			 */
			this._interval = null;

			/**
			 * Whether the element is currently visible or not.
			 * @protected
			 * @type {Boolean}
			 */
			this._visible = null;

			/**
			 * All event handlers.
			 * @protected
			 * @type {Object}
			 */
			this._handlers = {
				'initialized.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this._core.settings.autoRefresh) {
						this.watch();
					}
				}, this)
			};

			// set default options
			this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

			// register event handlers
			this._core.$element.on(this._handlers);
		};

		/**
		 * Default options.
		 * @public
		 */
		AutoRefresh.Defaults = {
			autoRefresh: true,
			autoRefreshInterval: 500
		};

		/**
		 * Watches the element.
		 */
		AutoRefresh.prototype.watch = function() {
			if (this._interval) {
				return;
			}

			this._visible = this._core.$element.is(':visible');
			this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
		};

		/**
		 * Refreshes the element.
		 */
		AutoRefresh.prototype.refresh = function() {
			if (this._core.$element.is(':visible') === this._visible) {
				return;
			}

			this._visible = !this._visible;

			this._core.$element.toggleClass('owl-hidden', !this._visible);

			this._visible && (this._core.invalidate('width') && this._core.refresh());
		};

		/**
		 * Destroys the plugin.
		 */
		AutoRefresh.prototype.destroy = function() {
			var handler, property;

			window.clearInterval(this._interval);

			for (handler in this._handlers) {
				this._core.$element.off(handler, this._handlers[handler]);
			}
			for (property in Object.getOwnPropertyNames(this)) {
				typeof this[property] != 'function' && (this[property] = null);
			}
		};

		$.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;

	})(window.Zepto || window.jQuery, window, document);

	/**
	 * Lazy Plugin
	 * @version 2.1.0
	 * @author Bartosz Wojciechowski
	 * @author David Deutsch
	 * @license The MIT License (MIT)
	 */
	;(function($, window, document, undefined) {

		/**
		 * Creates the lazy plugin.
		 * @class The Lazy Plugin
		 * @param {Owl} carousel - The Owl Carousel
		 */
		var Lazy = function(carousel) {

			/**
			 * Reference to the core.
			 * @protected
			 * @type {Owl}
			 */
			this._core = carousel;

			/**
			 * Already loaded items.
			 * @protected
			 * @type {Array.<jQuery>}
			 */
			this._loaded = [];

			/**
			 * Event handlers.
			 * @protected
			 * @type {Object}
			 */
			this._handlers = {
				'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function(e) {
					if (!e.namespace) {
						return;
					}

					if (!this._core.settings || !this._core.settings.lazyLoad) {
						return;
					}

					if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
						var settings = this._core.settings,
							n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
							i = ((settings.center && n * -1) || 0),
							position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
							clones = this._core.clones().length,
							load = $.proxy(function(i, v) { this.load(v) }, this);

						while (i++ < n) {
							this.load(clones / 2 + this._core.relative(position));
							clones && $.each(this._core.clones(this._core.relative(position)), load);
							position++;
						}
					}
				}, this)
			};

			// set the default options
			this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

			// register event handler
			this._core.$element.on(this._handlers);
		};

		/**
		 * Default options.
		 * @public
		 */
		Lazy.Defaults = {
			lazyLoad: false
		};

		/**
		 * Loads all resources of an item at the specified position.
		 * @param {Number} position - The absolute position of the item.
		 * @protected
		 */
		Lazy.prototype.load = function(position) {
			var $item = this._core.$stage.children().eq(position),
				$elements = $item && $item.find('.owl-lazy');

			if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
				return;
			}

			$elements.each($.proxy(function(index, element) {
				var $element = $(element), image,
					url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src');

				this._core.trigger('load', { element: $element, url: url }, 'lazy');

				if ($element.is('img')) {
					$element.one('load.owl.lazy', $.proxy(function() {
						$element.css('opacity', 1);
						this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
					}, this)).attr('src', url);
				} else {
					image = new Image();
					image.onload = $.proxy(function() {
						$element.css({
							'background-image': 'url(' + url + ')',
							'opacity': '1'
						});
						this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
					}, this);
					image.src = url;
				}
			}, this));

			this._loaded.push($item.get(0));
		};

		/**
		 * Destroys the plugin.
		 * @public
		 */
		Lazy.prototype.destroy = function() {
			var handler, property;

			for (handler in this.handlers) {
				this._core.$element.off(handler, this.handlers[handler]);
			}
			for (property in Object.getOwnPropertyNames(this)) {
				typeof this[property] != 'function' && (this[property] = null);
			}
		};

		$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

	})(window.Zepto || window.jQuery, window, document);

	/**
	 * AutoHeight Plugin
	 * @version 2.1.0
	 * @author Bartosz Wojciechowski
	 * @author David Deutsch
	 * @license The MIT License (MIT)
	 */
	;(function($, window, document, undefined) {

		/**
		 * Creates the auto height plugin.
		 * @class The Auto Height Plugin
		 * @param {Owl} carousel - The Owl Carousel
		 */
		var AutoHeight = function(carousel) {
			/**
			 * Reference to the core.
			 * @protected
			 * @type {Owl}
			 */
			this._core = carousel;

			/**
			 * All event handlers.
			 * @protected
			 * @type {Object}
			 */
			this._handlers = {
				'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this._core.settings.autoHeight) {
						this.update();
					}
				}, this),
				'changed.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this._core.settings.autoHeight && e.property.name == 'position'){
						this.update();
					}
				}, this),
				'loaded.owl.lazy': $.proxy(function(e) {
					if (e.namespace && this._core.settings.autoHeight
						&& e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
						this.update();
					}
				}, this)
			};

			// set default options
			this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

			// register event handlers
			this._core.$element.on(this._handlers);
		};

		/**
		 * Default options.
		 * @public
		 */
		AutoHeight.Defaults = {
			autoHeight: false,
			autoHeightClass: 'owl-height'
		};

		/**
		 * Updates the view.
		 */
		AutoHeight.prototype.update = function() {
			var start = this._core._current,
				end = start + this._core.settings.items,
				visible = this._core.$stage.children().toArray().slice(start, end),
				heights = [],
				maxheight = 0;

			$.each(visible, function(index, item) {
				heights.push($(item).height());
			});

			maxheight = Math.max.apply(null, heights);

			this._core.$stage.parent()
				.height(maxheight)
				.addClass(this._core.settings.autoHeightClass);
		};

		AutoHeight.prototype.destroy = function() {
			var handler, property;

			for (handler in this._handlers) {
				this._core.$element.off(handler, this._handlers[handler]);
			}
			for (property in Object.getOwnPropertyNames(this)) {
				typeof this[property] != 'function' && (this[property] = null);
			}
		};

		$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

	})(window.Zepto || window.jQuery, window, document);

	/**
	 * Video Plugin
	 * @version 2.1.0
	 * @author Bartosz Wojciechowski
	 * @author David Deutsch
	 * @license The MIT License (MIT)
	 */
	;(function($, window, document, undefined) {

		/**
		 * Creates the video plugin.
		 * @class The Video Plugin
		 * @param {Owl} carousel - The Owl Carousel
		 */
		var Video = function(carousel) {
			/**
			 * Reference to the core.
			 * @protected
			 * @type {Owl}
			 */
			this._core = carousel;

			/**
			 * Cache all video URLs.
			 * @protected
			 * @type {Object}
			 */
			this._videos = {};

			/**
			 * Current playing item.
			 * @protected
			 * @type {jQuery}
			 */
			this._playing = null;

			/**
			 * All event handlers.
			 * @todo The cloned content removale is too late
			 * @protected
			 * @type {Object}
			 */
			this._handlers = {
				'initialized.owl.carousel': $.proxy(function(e) {
					if (e.namespace) {
						this._core.register({ type: 'state', name: 'playing', tags: [ 'interacting' ] });
					}
				}, this),
				'resize.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
						e.preventDefault();
					}
				}, this),
				'refreshed.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this._core.is('resizing')) {
						this._core.$stage.find('.cloned .owl-video-frame').remove();
					}
				}, this),
				'changed.owl.carousel': $.proxy(function(e) {
					if (e.namespace && e.property.name === 'position' && this._playing) {
						this.stop();
					}
				}, this),
				'prepared.owl.carousel': $.proxy(function(e) {
					if (!e.namespace) {
						return;
					}

					var $element = $(e.content).find('.owl-video');

					if ($element.length) {
						$element.css('display', 'none');
						this.fetch($element, $(e.content));
					}
				}, this)
			};

			// set default options
			this._core.options = $.extend({}, Video.Defaults, this._core.options);

			// register event handlers
			this._core.$element.on(this._handlers);

			this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
				this.play(e);
			}, this));
		};

		/**
		 * Default options.
		 * @public
		 */
		Video.Defaults = {
			video: false,
			videoHeight: false,
			videoWidth: false
		};

		/**
		 * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
		 * @protected
		 * @param {jQuery} target - The target containing the video data.
		 * @param {jQuery} item - The item containing the video.
		 */
		Video.prototype.fetch = function(target, item) {
				var type = (function() {
						if (target.attr('data-vimeo-id')) {
							return 'vimeo';
						} else if (target.attr('data-vzaar-id')) {
							return 'vzaar'
						} else {
							return 'youtube';
						}
					})(),
					id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
					width = target.attr('data-width') || this._core.settings.videoWidth,
					height = target.attr('data-height') || this._core.settings.videoHeight,
					url = target.attr('href');

			if (url) {

				/*
						Parses the id's out of the following urls (and probably more):
						https://www.youtube.com/watch?v=:id
						https://youtu.be/:id
						https://vimeo.com/:id
						https://vimeo.com/channels/:channel/:id
						https://vimeo.com/groups/:group/videos/:id
						https://app.vzaar.com/videos/:id

						Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
				*/

				id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

				if (id[3].indexOf('youtu') > -1) {
					type = 'youtube';
				} else if (id[3].indexOf('vimeo') > -1) {
					type = 'vimeo';
				} else if (id[3].indexOf('vzaar') > -1) {
					type = 'vzaar';
				} else {
					throw new Error('Video URL not supported.');
				}
				id = id[6];
			} else {
				throw new Error('Missing video URL.');
			}

			this._videos[url] = {
				type: type,
				id: id,
				width: width,
				height: height
			};

			item.attr('data-video', url);

			this.thumbnail(target, this._videos[url]);
		};

		/**
		 * Creates video thumbnail.
		 * @protected
		 * @param {jQuery} target - The target containing the video data.
		 * @param {Object} info - The video info object.
		 * @see `fetch`
		 */
		Video.prototype.thumbnail = function(target, video) {
			var tnLink,
				icon,
				path,
				dimensions = video.width && video.height ? 'style="width:' + video.width + 'px;height:' + video.height + 'px;"' : '',
				customTn = target.find('img'),
				srcType = 'src',
				lazyClass = '',
				settings = this._core.settings,
				create = function(path) {
					icon = '<div class="owl-video-play-icon"></div>';

					if (settings.lazyLoad) {
						tnLink = '<div class="owl-video-tn ' + lazyClass + '" ' + srcType + '="' + path + '"></div>';
					} else {
						tnLink = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + path + ')"></div>';
					}
					target.after(tnLink);
					target.after(icon);
				};

			// wrap video content into owl-video-wrapper div
			target.wrap('<div class="owl-video-wrapper"' + dimensions + '></div>');

			if (this._core.settings.lazyLoad) {
				srcType = 'data-src';
				lazyClass = 'owl-lazy';
			}

			// custom thumbnail
			if (customTn.length) {
				create(customTn.attr(srcType));
				customTn.remove();
				return false;
			}

			if (video.type === 'youtube') {
				path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
				create(path);
			} else if (video.type === 'vimeo') {
				$.ajax({
					type: 'GET',
					url: '//vimeo.com/api/v2/video/' + video.id + '.json',
					jsonp: 'callback',
					dataType: 'jsonp',
					success: function(data) {
						path = data[0].thumbnail_large;
						create(path);
					}
				});
			} else if (video.type === 'vzaar') {
				$.ajax({
					type: 'GET',
					url: '//vzaar.com/api/videos/' + video.id + '.json',
					jsonp: 'callback',
					dataType: 'jsonp',
					success: function(data) {
						path = data.framegrab_url;
						create(path);
					}
				});
			}
		};

		/**
		 * Stops the current video.
		 * @public
		 */
		Video.prototype.stop = function() {
			this._core.trigger('stop', null, 'video');
			this._playing.find('.owl-video-frame').remove();
			this._playing.removeClass('owl-video-playing');
			this._playing = null;
			this._core.leave('playing');
			this._core.trigger('stopped', null, 'video');
		};

		/**
		 * Starts the current video.
		 * @public
		 * @param {Event} event - The event arguments.
		 */
		Video.prototype.play = function(event) {
			var target = $(event.target),
				item = target.closest('.' + this._core.settings.itemClass),
				video = this._videos[item.attr('data-video')],
				width = video.width || '100%',
				height = video.height || this._core.$stage.height(),
				html;

			if (this._playing) {
				return;
			}

			this._core.enter('playing');
			this._core.trigger('play', null, 'video');

			item = this._core.items(this._core.relative(item.index()));

			this._core.reset(item.index());

			if (video.type === 'youtube') {
				html = '<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' +
					video.id + '?autoplay=1&v=' + video.id + '" frameborder="0" allowfullscreen></iframe>';
			} else if (video.type === 'vimeo') {
				html = '<iframe src="//player.vimeo.com/video/' + video.id +
					'?autoplay=1" width="' + width + '" height="' + height +
					'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
			} else if (video.type === 'vzaar') {
				html = '<iframe frameborder="0"' + 'height="' + height + '"' + 'width="' + width +
					'" allowfullscreen mozallowfullscreen webkitAllowFullScreen ' +
					'src="//view.vzaar.com/' + video.id + '/player?autoplay=true"></iframe>';
			}

			$('<div class="owl-video-frame">' + html + '</div>').insertAfter(item.find('.owl-video'));

			this._playing = item.addClass('owl-video-playing');
		};

		/**
		 * Checks whether an video is currently in full screen mode or not.
		 * @todo Bad style because looks like a readonly method but changes members.
		 * @protected
		 * @returns {Boolean}
		 */
		Video.prototype.isInFullScreen = function() {
			var element = document.fullscreenElement || document.mozFullScreenElement ||
					document.webkitFullscreenElement;

			return element && $(element).parent().hasClass('owl-video-frame');
		};

		/**
		 * Destroys the plugin.
		 */
		Video.prototype.destroy = function() {
			var handler, property;

			this._core.$element.off('click.owl.video');

			for (handler in this._handlers) {
				this._core.$element.off(handler, this._handlers[handler]);
			}
			for (property in Object.getOwnPropertyNames(this)) {
				typeof this[property] != 'function' && (this[property] = null);
			}
		};

		$.fn.owlCarousel.Constructor.Plugins.Video = Video;

	})(window.Zepto || window.jQuery, window, document);

	/**
	 * Animate Plugin
	 * @version 2.1.0
	 * @author Bartosz Wojciechowski
	 * @author David Deutsch
	 * @license The MIT License (MIT)
	 */
	;(function($, window, document, undefined) {

		/**
		 * Creates the animate plugin.
		 * @class The Navigation Plugin
		 * @param {Owl} scope - The Owl Carousel
		 */
		var Animate = function(scope) {
			this.core = scope;
			this.core.options = $.extend({}, Animate.Defaults, this.core.options);
			this.swapping = true;
			this.previous = undefined;
			this.next = undefined;

			this.handlers = {
				'change.owl.carousel': $.proxy(function(e) {
					if (e.namespace && e.property.name == 'position') {
						this.previous = this.core.current();
						this.next = e.property.value;
					}
				}, this),
				'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
					if (e.namespace) {
						this.swapping = e.type == 'translated';
					}
				}, this),
				'translate.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
						this.swap();
					}
				}, this)
			};

			this.core.$element.on(this.handlers);
		};

		/**
		 * Default options.
		 * @public
		 */
		Animate.Defaults = {
			animateOut: false,
			animateIn: false
		};

		/**
		 * Toggles the animation classes whenever an translations starts.
		 * @protected
		 * @returns {Boolean|undefined}
		 */
		Animate.prototype.swap = function() {

			if (this.core.settings.items !== 1) {
				return;
			}

			if (!$.support.animation || !$.support.transition) {
				return;
			}

			this.core.speed(0);

			var left,
				clear = $.proxy(this.clear, this),
				previous = this.core.$stage.children().eq(this.previous),
				next = this.core.$stage.children().eq(this.next),
				incoming = this.core.settings.animateIn,
				outgoing = this.core.settings.animateOut;

			if (this.core.current() === this.previous) {
				return;
			}

			if (outgoing) {
				left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
				previous.one($.support.animation.end, clear)
					.css( { 'left': left + 'px' } )
					.addClass('animated owl-animated-out')
					.addClass(outgoing);
			}

			if (incoming) {
				next.one($.support.animation.end, clear)
					.addClass('animated owl-animated-in')
					.addClass(incoming);
			}
		};

		Animate.prototype.clear = function(e) {
			$(e.target).css( { 'left': '' } )
				.removeClass('animated owl-animated-out owl-animated-in')
				.removeClass(this.core.settings.animateIn)
				.removeClass(this.core.settings.animateOut);
			this.core.onTransitionEnd();
		};

		/**
		 * Destroys the plugin.
		 * @public
		 */
		Animate.prototype.destroy = function() {
			var handler, property;

			for (handler in this.handlers) {
				this.core.$element.off(handler, this.handlers[handler]);
			}
			for (property in Object.getOwnPropertyNames(this)) {
				typeof this[property] != 'function' && (this[property] = null);
			}
		};

		$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

	})(window.Zepto || window.jQuery, window, document);

	/**
	 * Autoplay Plugin
	 * @version 2.1.0
	 * @author Bartosz Wojciechowski
	 * @author Artus Kolanowski
	 * @author David Deutsch
	 * @license The MIT License (MIT)
	 */
	;(function($, window, document, undefined) {

		/**
		 * Creates the autoplay plugin.
		 * @class The Autoplay Plugin
		 * @param {Owl} scope - The Owl Carousel
		 */
		var Autoplay = function(carousel) {
			/**
			 * Reference to the core.
			 * @protected
			 * @type {Owl}
			 */
			this._core = carousel;

			/**
			 * The autoplay timeout.
			 * @type {Timeout}
			 */
			this._timeout = null;

			/**
			 * Indicates whenever the autoplay is paused.
			 * @type {Boolean}
			 */
			this._paused = false;

			/**
			 * All event handlers.
			 * @protected
			 * @type {Object}
			 */
			this._handlers = {
				'changed.owl.carousel': $.proxy(function(e) {
					if (e.namespace && e.property.name === 'settings') {
						if (this._core.settings.autoplay) {
							this.play();
						} else {
							this.stop();
						}
					} else if (e.namespace && e.property.name === 'position') {
						//console.log('play?', e);
						if (this._core.settings.autoplay) {
							this._setAutoPlayInterval();
						}
					}
				}, this),
				'initialized.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this._core.settings.autoplay) {
						this.play();
					}
				}, this),
				'play.owl.autoplay': $.proxy(function(e, t, s) {
					if (e.namespace) {
						this.play(t, s);
					}
				}, this),
				'stop.owl.autoplay': $.proxy(function(e) {
					if (e.namespace) {
						this.stop();
					}
				}, this),
				'mouseover.owl.autoplay': $.proxy(function() {
					if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
						this.pause();
					}
				}, this),
				'mouseleave.owl.autoplay': $.proxy(function() {
					if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
						this.play();
					}
				}, this),
				'touchstart.owl.core': $.proxy(function() {
					if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
						this.pause();
					}
				}, this),
				'touchend.owl.core': $.proxy(function() {
					if (this._core.settings.autoplayHoverPause) {
						this.play();
					}
				}, this)
			};

			// register event handlers
			this._core.$element.on(this._handlers);

			// set default options
			this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
		};

		/**
		 * Default options.
		 * @public
		 */
		Autoplay.Defaults = {
			autoplay: false,
			autoplayTimeout: 5000,
			autoplayHoverPause: false,
			autoplaySpeed: false
		};

		/**
		 * Starts the autoplay.
		 * @public
		 * @param {Number} [timeout] - The interval before the next animation starts.
		 * @param {Number} [speed] - The animation speed for the animations.
		 */
		Autoplay.prototype.play = function(timeout, speed) {
			this._paused = false;

			if (this._core.is('rotating')) {
				return;
			}

			this._core.enter('rotating');

			this._setAutoPlayInterval();
		};

		/**
		 * Gets a new timeout
		 * @private
		 * @param {Number} [timeout] - The interval before the next animation starts.
		 * @param {Number} [speed] - The animation speed for the animations.
		 * @return {Timeout}
		 */
		Autoplay.prototype._getNextTimeout = function(timeout, speed) {
			if ( this._timeout ) {
				window.clearTimeout(this._timeout);
			}
			return window.setTimeout($.proxy(function() {
				if (this._paused || this._core.is('busy') || this._core.is('interacting') || document.hidden) {
					return;
				}
				this._core.next(speed || this._core.settings.autoplaySpeed);
			}, this), timeout || this._core.settings.autoplayTimeout);
		};

		/**
		 * Sets autoplay in motion.
		 * @private
		 */
		Autoplay.prototype._setAutoPlayInterval = function() {
			this._timeout = this._getNextTimeout();
		};

		/**
		 * Stops the autoplay.
		 * @public
		 */
		Autoplay.prototype.stop = function() {
			if (!this._core.is('rotating')) {
				return;
			}

			window.clearTimeout(this._timeout);
			this._core.leave('rotating');
		};

		/**
		 * Stops the autoplay.
		 * @public
		 */
		Autoplay.prototype.pause = function() {
			if (!this._core.is('rotating')) {
				return;
			}

			this._paused = true;
		};

		/**
		 * Destroys the plugin.
		 */
		Autoplay.prototype.destroy = function() {
			var handler, property;

			this.stop();

			for (handler in this._handlers) {
				this._core.$element.off(handler, this._handlers[handler]);
			}
			for (property in Object.getOwnPropertyNames(this)) {
				typeof this[property] != 'function' && (this[property] = null);
			}
		};

		$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

	})(window.Zepto || window.jQuery, window, document);

	/**
	 * Navigation Plugin
	 * @version 2.1.0
	 * @author Artus Kolanowski
	 * @author David Deutsch
	 * @license The MIT License (MIT)
	 */
	;(function($, window, document, undefined) {
		'use strict';

		/**
		 * Creates the navigation plugin.
		 * @class The Navigation Plugin
		 * @param {Owl} carousel - The Owl Carousel.
		 */
		var Navigation = function(carousel) {
			/**
			 * Reference to the core.
			 * @protected
			 * @type {Owl}
			 */
			this._core = carousel;

			/**
			 * Indicates whether the plugin is initialized or not.
			 * @protected
			 * @type {Boolean}
			 */
			this._initialized = false;

			/**
			 * The current paging indexes.
			 * @protected
			 * @type {Array}
			 */
			this._pages = [];

			/**
			 * All DOM elements of the user interface.
			 * @protected
			 * @type {Object}
			 */
			this._controls = {};

			/**
			 * Markup for an indicator.
			 * @protected
			 * @type {Array.<String>}
			 */
			this._templates = [];

			/**
			 * The carousel element.
			 * @type {jQuery}
			 */
			this.$element = this._core.$element;

			/**
			 * Overridden methods of the carousel.
			 * @protected
			 * @type {Object}
			 */
			this._overrides = {
				next: this._core.next,
				prev: this._core.prev,
				to: this._core.to
			};

			/**
			 * All event handlers.
			 * @protected
			 * @type {Object}
			 */
			this._handlers = {
				'prepared.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this._core.settings.dotsData) {
						this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
							$(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
					}
				}, this),
				'added.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this._core.settings.dotsData) {
						this._templates.splice(e.position, 0, this._templates.pop());
					}
				}, this),
				'remove.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this._core.settings.dotsData) {
						this._templates.splice(e.position, 1);
					}
				}, this),
				'changed.owl.carousel': $.proxy(function(e) {
					if (e.namespace && e.property.name == 'position') {
						this.draw();
					}
				}, this),
				'initialized.owl.carousel': $.proxy(function(e) {
					if (e.namespace && !this._initialized) {
						this._core.trigger('initialize', null, 'navigation');
						this.initialize();
						this.update();
						this.draw();
						this._initialized = true;
						this._core.trigger('initialized', null, 'navigation');
					}
				}, this),
				'refreshed.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this._initialized) {
						this._core.trigger('refresh', null, 'navigation');
						this.update();
						this.draw();
						this._core.trigger('refreshed', null, 'navigation');
					}
				}, this)
			};

			// set default options
			this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

			// register event handlers
			this.$element.on(this._handlers);
		};

		/**
		 * Default options.
		 * @public
		 * @todo Rename `slideBy` to `navBy`
		 */
		Navigation.Defaults = {
			nav: false,
			navText: [ 'prev', 'next' ],
			navSpeed: false,
			navElement: 'div',
			navContainer: false,
			navContainerClass: 'owl-nav',
			navClass: [ 'owl-prev', 'owl-next' ],
			slideBy: 1,
			dotClass: 'owl-dot',
			dotsClass: 'owl-dots',
			dots: true,
			dotsEach: false,
			dotsData: false,
			dotsSpeed: false,
			dotsContainer: false
		};

		/**
		 * Initializes the layout of the plugin and extends the carousel.
		 * @protected
		 */
		Navigation.prototype.initialize = function() {
			var override,
				settings = this._core.settings;

			// create DOM structure for relative navigation
			this._controls.$relative = (settings.navContainer ? $(settings.navContainer)
				: $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');

			this._controls.$previous = $('<' + settings.navElement + '>')
				.addClass(settings.navClass[0])
				.html(settings.navText[0])
				.prependTo(this._controls.$relative)
				.on('click', $.proxy(function(e) {
					this.prev(settings.navSpeed);
				}, this));
			this._controls.$next = $('<' + settings.navElement + '>')
				.addClass(settings.navClass[1])
				.html(settings.navText[1])
				.appendTo(this._controls.$relative)
				.on('click', $.proxy(function(e) {
					this.next(settings.navSpeed);
				}, this));

			// create DOM structure for absolute navigation
			if (!settings.dotsData) {
				this._templates = [ $('<div>')
					.addClass(settings.dotClass)
					.append($('<span>'))
					.prop('outerHTML') ];
			}

			this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer)
				: $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

			this._controls.$absolute.on('click', 'div', $.proxy(function(e) {
				var index = $(e.target).parent().is(this._controls.$absolute)
					? $(e.target).index() : $(e.target).parent().index();

				e.preventDefault();

				this.to(index, settings.dotsSpeed);
			}, this));

			// override public methods of the carousel
			for (override in this._overrides) {
				this._core[override] = $.proxy(this[override], this);
			}
		};

		/**
		 * Destroys the plugin.
		 * @protected
		 */
		Navigation.prototype.destroy = function() {
			var handler, control, property, override;

			for (handler in this._handlers) {
				this.$element.off(handler, this._handlers[handler]);
			}
			for (control in this._controls) {
				this._controls[control].remove();
			}
			for (override in this.overides) {
				this._core[override] = this._overrides[override];
			}
			for (property in Object.getOwnPropertyNames(this)) {
				typeof this[property] != 'function' && (this[property] = null);
			}
		};

		/**
		 * Updates the internal state.
		 * @protected
		 */
		Navigation.prototype.update = function() {
			var i, j, k,
				lower = this._core.clones().length / 2,
				upper = lower + this._core.items().length,
				maximum = this._core.maximum(true),
				settings = this._core.settings,
				size = settings.center || settings.autoWidth || settings.dotsData
					? 1 : settings.dotsEach || settings.items;

			if (settings.slideBy !== 'page') {
				settings.slideBy = Math.min(settings.slideBy, settings.items);
			}

			if (settings.dots || settings.slideBy == 'page') {
				this._pages = [];

				for (i = lower, j = 0, k = 0; i < upper; i++) {
					if (j >= size || j === 0) {
						this._pages.push({
							start: Math.min(maximum, i - lower),
							end: i - lower + size - 1
						});
						if (Math.min(maximum, i - lower) === maximum) {
							break;
						}
						j = 0, ++k;
					}
					j += this._core.mergers(this._core.relative(i));
				}
			}
		};

		/**
		 * Draws the user interface.
		 * @todo The option `dotsData` wont work.
		 * @protected
		 */
		Navigation.prototype.draw = function() {
			var difference,
				settings = this._core.settings,
				disabled = this._core.items().length <= settings.items,
				index = this._core.relative(this._core.current()),
				loop = settings.loop || settings.rewind;

			this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

			if (settings.nav) {
				this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
				this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
			}

			this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

			if (settings.dots) {
				difference = this._pages.length - this._controls.$absolute.children().length;

				if (settings.dotsData && difference !== 0) {
					this._controls.$absolute.html(this._templates.join(''));
				} else if (difference > 0) {
					this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
				} else if (difference < 0) {
					this._controls.$absolute.children().slice(difference).remove();
				}

				this._controls.$absolute.find('.active').removeClass('active');
				this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
			}
		};

		/**
		 * Extends event data.
		 * @protected
		 * @param {Event} event - The event object which gets thrown.
		 */
		Navigation.prototype.onTrigger = function(event) {
			var settings = this._core.settings;

			event.page = {
				index: $.inArray(this.current(), this._pages),
				count: this._pages.length,
				size: settings && (settings.center || settings.autoWidth || settings.dotsData
					? 1 : settings.dotsEach || settings.items)
			};
		};

		/**
		 * Gets the current page position of the carousel.
		 * @protected
		 * @returns {Number}
		 */
		Navigation.prototype.current = function() {
			var current = this._core.relative(this._core.current());
			return $.grep(this._pages, $.proxy(function(page, index) {
				return page.start <= current && page.end >= current;
			}, this)).pop();
		};

		/**
		 * Gets the current succesor/predecessor position.
		 * @protected
		 * @returns {Number}
		 */
		Navigation.prototype.getPosition = function(successor) {
			var position, length,
				settings = this._core.settings;

			if (settings.slideBy == 'page') {
				position = $.inArray(this.current(), this._pages);
				length = this._pages.length;
				successor ? ++position : --position;
				position = this._pages[((position % length) + length) % length].start;
			} else {
				position = this._core.relative(this._core.current());
				length = this._core.items().length;
				successor ? position += settings.slideBy : position -= settings.slideBy;
			}

			return position;
		};

		/**
		 * Slides to the next item or page.
		 * @public
		 * @param {Number} [speed=false] - The time in milliseconds for the transition.
		 */
		Navigation.prototype.next = function(speed) {
			$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
		};

		/**
		 * Slides to the previous item or page.
		 * @public
		 * @param {Number} [speed=false] - The time in milliseconds for the transition.
		 */
		Navigation.prototype.prev = function(speed) {
			$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
		};

		/**
		 * Slides to the specified item or page.
		 * @public
		 * @param {Number} position - The position of the item or page.
		 * @param {Number} [speed] - The time in milliseconds for the transition.
		 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
		 */
		Navigation.prototype.to = function(position, speed, standard) {
			var length;

			if (!standard && this._pages.length) {
				length = this._pages.length;
				$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
			} else {
				$.proxy(this._overrides.to, this._core)(position, speed);
			}
		};

		$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

	})(window.Zepto || window.jQuery, window, document);

	/**
	 * Hash Plugin
	 * @version 2.1.0
	 * @author Artus Kolanowski
	 * @author David Deutsch
	 * @license The MIT License (MIT)
	 */
	;(function($, window, document, undefined) {
		'use strict';

		/**
		 * Creates the hash plugin.
		 * @class The Hash Plugin
		 * @param {Owl} carousel - The Owl Carousel
		 */
		var Hash = function(carousel) {
			/**
			 * Reference to the core.
			 * @protected
			 * @type {Owl}
			 */
			this._core = carousel;

			/**
			 * Hash index for the items.
			 * @protected
			 * @type {Object}
			 */
			this._hashes = {};

			/**
			 * The carousel element.
			 * @type {jQuery}
			 */
			this.$element = this._core.$element;

			/**
			 * All event handlers.
			 * @protected
			 * @type {Object}
			 */
			this._handlers = {
				'initialized.owl.carousel': $.proxy(function(e) {
					if (e.namespace && this._core.settings.startPosition === 'URLHash') {
						$(window).trigger('hashchange.owl.navigation');
					}
				}, this),
				'prepared.owl.carousel': $.proxy(function(e) {
					if (e.namespace) {
						var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

						if (!hash) {
							return;
						}

						this._hashes[hash] = e.content;
					}
				}, this),
				'changed.owl.carousel': $.proxy(function(e) {
					if (e.namespace && e.property.name === 'position') {
						var current = this._core.items(this._core.relative(this._core.current())),
							hash = $.map(this._hashes, function(item, hash) {
								return item === current ? hash : null;
							}).join();

						if (!hash || window.location.hash.slice(1) === hash) {
							return;
						}

						window.location.hash = hash;
					}
				}, this)
			};

			// set default options
			this._core.options = $.extend({}, Hash.Defaults, this._core.options);

			// register the event handlers
			this.$element.on(this._handlers);

			// register event listener for hash navigation
			$(window).on('hashchange.owl.navigation', $.proxy(function(e) {
				var hash = window.location.hash.substring(1),
					items = this._core.$stage.children(),
					position = this._hashes[hash] && items.index(this._hashes[hash]);

				if (position === undefined || position === this._core.current()) {
					return;
				}

				this._core.to(this._core.relative(position), false, true);
			}, this));
		};

		/**
		 * Default options.
		 * @public
		 */
		Hash.Defaults = {
			URLhashListener: false
		};

		/**
		 * Destroys the plugin.
		 * @public
		 */
		Hash.prototype.destroy = function() {
			var handler, property;

			$(window).off('hashchange.owl.navigation');

			for (handler in this._handlers) {
				this._core.$element.off(handler, this._handlers[handler]);
			}
			for (property in Object.getOwnPropertyNames(this)) {
				typeof this[property] != 'function' && (this[property] = null);
			}
		};

		$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

	})(window.Zepto || window.jQuery, window, document);

	/**
	 * Support Plugin
	 *
	 * @version 2.1.0
	 * @author Vivid Planet Software GmbH
	 * @author Artus Kolanowski
	 * @author David Deutsch
	 * @license The MIT License (MIT)
	 */
	;(function($, window, document, undefined) {

		var style = $('<support>').get(0).style,
			prefixes = 'Webkit Moz O ms'.split(' '),
			events = {
				transition: {
					end: {
						WebkitTransition: 'webkitTransitionEnd',
						MozTransition: 'transitionend',
						OTransition: 'oTransitionEnd',
						transition: 'transitionend'
					}
				},
				animation: {
					end: {
						WebkitAnimation: 'webkitAnimationEnd',
						MozAnimation: 'animationend',
						OAnimation: 'oAnimationEnd',
						animation: 'animationend'
					}
				}
			},
			tests = {
				csstransforms: function() {
					return !!test('transform');
				},
				csstransforms3d: function() {
					return !!test('perspective');
				},
				csstransitions: function() {
					return !!test('transition');
				},
				cssanimations: function() {
					return !!test('animation');
				}
			};

		function test(property, prefixed) {
			var result = false,
				upper = property.charAt(0).toUpperCase() + property.slice(1);

			$.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function(i, property) {
				if (style[property] !== undefined) {
					result = prefixed ? property : true;
					return false;
				}
			});

			return result;
		}

		function prefixed(property) {
			return test(property, true);
		}

		if (tests.csstransitions()) {
			/* jshint -W053 */
			$.support.transition = new String(prefixed('transition'))
			$.support.transition.end = events.transition.end[ $.support.transition ];
		}

		if (tests.cssanimations()) {
			/* jshint -W053 */
			$.support.animation = new String(prefixed('animation'))
			$.support.animation.end = events.animation.end[ $.support.animation ];
		}

		if (tests.csstransforms()) {
			/* jshint -W053 */
			$.support.transform = new String(prefixed('transform'));
			$.support.transform3d = tests.csstransforms3d();
		}

	})(window.Zepto || window.jQuery, window, document);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../css-loader/index.js!./owl.carousel.min.css", function() {
				var newContent = require("!!../../../css-loader/index.js!./owl.carousel.min.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "/**\n * Owl Carousel v2.2.0\n * Copyright 2013-2016 David Deutsch\n * Licensed under MIT (https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE)\n */\n.owl-carousel,.owl-carousel .owl-item{-webkit-tap-highlight-color:transparent;position:relative}.owl-carousel{display:none;width:100%;z-index:1}.owl-carousel .owl-stage{position:relative;-ms-touch-action:pan-Y}.owl-carousel .owl-stage:after{content:\".\";display:block;clear:both;visibility:hidden;line-height:0;height:0}.owl-carousel .owl-stage-outer{position:relative;overflow:hidden;-webkit-transform:translate3d(0,0,0)}.owl-carousel .owl-item{min-height:1px;float:left;-webkit-backface-visibility:hidden;-webkit-touch-callout:none}.owl-carousel .owl-item img{display:block;width:100%;-webkit-transform-style:preserve-3d}.owl-carousel .owl-dots.disabled,.owl-carousel .owl-nav.disabled{display:none}.no-js .owl-carousel,.owl-carousel.owl-loaded{display:block}.owl-carousel .owl-dot,.owl-carousel .owl-nav .owl-next,.owl-carousel .owl-nav .owl-prev{cursor:pointer;cursor:hand;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.owl-carousel.owl-loading{opacity:0;display:block}.owl-carousel.owl-hidden{opacity:0}.owl-carousel.owl-refresh .owl-item{visibility:hidden}.owl-carousel.owl-drag .owl-item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.owl-carousel.owl-grab{cursor:move;cursor:grab}.owl-carousel.owl-rtl{direction:rtl}.owl-carousel.owl-rtl .owl-item{float:right}.owl-carousel .animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.owl-carousel .owl-animated-in{z-index:0}.owl-carousel .owl-animated-out{z-index:1}.owl-carousel .fadeOut{-webkit-animation-name:fadeOut;animation-name:fadeOut}@-webkit-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@keyframes fadeOut{0%{opacity:1}100%{opacity:0}}.owl-height{transition:height .5s ease-in-out}.owl-carousel .owl-item .owl-lazy{opacity:0;transition:opacity .4s ease}.owl-carousel .owl-item img.owl-lazy{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.owl-carousel .owl-video-wrapper{position:relative;height:100%;background:#000}.owl-carousel .owl-video-play-icon{position:absolute;height:80px;width:80px;left:50%;top:50%;margin-left:-40px;margin-top:-40px;background:url(" + __webpack_require__(6) + ") no-repeat;cursor:pointer;z-index:1;-webkit-backface-visibility:hidden;transition:-webkit-transform .1s ease;transition:transform .1s ease}.owl-carousel .owl-video-play-icon:hover{-webkit-transform:scale(1.3,1.3);-ms-transform:scale(1.3,1.3);transform:scale(1.3,1.3)}.owl-carousel .owl-video-playing .owl-video-play-icon,.owl-carousel .owl-video-playing .owl-video-tn{display:none}.owl-carousel .owl-video-tn{opacity:0;height:100%;background-position:center center;background-repeat:no-repeat;background-size:contain;transition:opacity .4s ease}.owl-carousel .owl-video-frame{position:relative;z-index:1;height:100%;width:100%}", ""]);

	// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU1RTM0MEU5QzBCMDExRTM4MURCQTkwQzkyRUYxMzEzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU1RTM0MEVBQzBCMDExRTM4MURCQTkwQzkyRUYxMzEzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTVFMzQwRTdDMEIwMTFFMzgxREJBOTBDOTJFRjEzMTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTVFMzQwRThDMEIwMTFFMzgxREJBOTBDOTJFRjEzMTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6n647gAAAP5klEQVR42uxcCVRU1xl+82aGQWAQEcVAFI2gWCMqxDWYYOPCSQPxpNianLjHGJtdY2ubGI0naeBU20ZjTBQxotGKB6IhatVoIkQSRR1EQNFRBlllGZDNGRDof4f/6eP63jDMjqf3nCvOW+7yvX+//72S9vZ25v/F/CIj/0gkErMbMPcDNDU1+SkUilB4fwr0/wTUwVD7Q/Uw3l17dWtraxXUfJ1OlwntpGk0mtzJkyfXtJsxGEvmbnif9GkvAO/evfsM/JkilUrnQp+PWZMSWlpacuvr67dptdq0oKCgbLjUZgqglgLIWMrC5H1jVa/Xj4LJvd/W1lbUbqfS3NycU1lZ+U5CQkI/GCJrbHwWF1sBCKBFAMVta3dggf4rqqqqYk+fPj0UhirlOM6aAFqdhQG4MSzLvgVsutDYeyC/tDU1NWqQX5dycnLysrOzS86cOVOVmZlZT5oVeqdXr17sjBkzvEJCQvqGhYUNGTZs2OMDBgwY7enpGQD9uYn1BdRfW11d/eW0adM+hn7uwJjbnFIGwkDXAnhrjCiOCgDs159//jlt3759eSdPnqwgWGLVE/yhtpKmjI2ZsCUqQDlUxYoVKwIjIyPHjxw58pn+/fuHiYEJ4uQayMjNfn5+X5K+CJBOIQOB6iYDeL+KsVJFRcXFlJSUTyZNmjQTXgmFOgzqo1D7QlUS4kIwBNmMYjkOQPKsC1QCVm+o/aEGrFq1aoZKpfqisbGxWGw8wNbfzJw50xvbcCyAYE6sFBvorVu3VFu3bv0LPDYJ6igyQQTNHQFju1JCplQElYChwA/iO2vWrDEgDmKB6kuExgYi5HphYeFSfId1CIAAXqLQ4BoaGoqTkpI+hkcmQ30cqa03N1hrgGYCmISq+86bN29sfn5+PIz1jtBYCwoKPsIPytoNQHhHCSybKjSg3Nzcb8PDw5+Dx8YgxfVGVpPYEjgRMDkgfXbu3Pk8KK3zQmMuLS2NR8qV2hzAO3fuBAB4P9CDgOtVO3bsWA2PTEQZ5wPV1dYU1w0g3ceOHRtw9erVL4nyEJDTSfixpTYDEJ7tD+D9RHcOJkLe/PnzX0QFMYj7mo4GToC1idztk56e/idQfPX0PMrLy/d1G0RTAYTnZADefwXI/8yECROeRSXhi1QncSbwBKjR48CBA1HANaX0fIqKiuK7BaKpAAJ4KXRn169fP+Hv7/9buP0b1K5yZwaPosZeiYmJ4QCihp6XWq2OQy5irQIgaLA4uhMwAdI9PDyehtvBhC2IYevswAmAqABrIRx851v0/C5cuLCcUGqXIHYFIPiTiwXsu6zg4OAZcHsEgiftSeBRILqAR/QszPM2f45giGtCQ0MD0fQyD0BUGrcoG68IfMrn4fZIqN49jfLEKBEobh78buXPtaSk5ACKJqlZAALr7uQ3CL/1sbGxb6KN16+ng8ebu0EmAmCf0dyWlZVFTDNPUVYWAxBI+hW6sR9//HEL3BoH1R+NY+YhAdAAYlhYWO+6urrT/DkTVxA4bgRaF6YDCKybxW+orKzsHFx+Eupj6MBLLAEQPlCMKcEDOwJoMHGOHj0aBpzWyJ87cQVFWVkIQGhgBRWY1L/77rsLUe558cnZgsGTr5sEA34cQ1MSJwCQFDkoyVia+77++uto9JklRgGE33Kgvnz+yyqVKglZ9xG09RhrAIgfp7q4uPj96OhopSPcPqF449q1a310Ot1Vigp3wb0B3EKcKIBAfa/zX9Tr9bXTp08n6AcJfQFLAeSZDefz8vKetXfgQaRINRrNIlqBxsXFTX8AA7oRoL5s/ouZmZkE+TDUutLuLiqZCiA3TvCrdyQnJz9mL9tSrMydO9cdqDCH4sTPMXArFQQQHOxp/Bfgd+OcOXOIsA9ExcHYGECO6kuAAl63RzTHSGFBcb5BcUkJXB+KITJBAD+ifN3jcPmJB1C3MYBcqa+vPwUG7lO29LGNlT179viCjO7kSIDX8jf0vlihRaFO0YktW7asQF/X4wHtYwcASYEx6SoqKj7bvHnzAFuwdReFBbswnj8erVabjSE7RScAwaEeT5FraWBgYASG4+XmLqxbCiBvDeMalLk4cImdAGSKiooi6QCsu7v7KIzW3LfnJBLJFP6LN2/ePK9Wq2+T1UjimDg6iUehUMD3DEy8fft2cnp6eiiMVyaxeE2y63Lq1KkM0MDF/GsLFy4cwomVe18BHlLxUd67dy/xAYej2mYcTYGUYV8HAn7dggULvCxVMqasnYPBv4/fP3zA9WgTSrmG3KgB6ubPn/975HUXZwOQ56dmge04yxLb0ZRSU1PzJhWRuoEurauhEZB/Y/gP1NbW3vD09JxgTPs6A4CcngHBvic1NTXYHJfQlFJSUjIZOLSW32lUVFQ4idKwCMII/gsA4E3QPiTdormLNAtnKJI+ffq8GBkZmQZy+21CFSAaWWt2AHK3ALhSw782depUYg+6cB0N598Eb6AIwbsrlujjdJmiMlm/gQMHrgfr4QewHacCiHJrKZk1a9ZUAAV2AnDo0KEDiSJhUQMP4d+srKws4SX69Kji5uY2ecyYMUdgDp/v3r3bH+Zmcf7L/v37W8EeLeRf8/X1fYQPYD+KAmuQ+tqYHlgI9fn4+Lw6e/bs0zdu3FgIv12tQI1l/B+gI0h8UMaxsCfF8w1IfT06A93FxWXQkCFDtoFLeCAjI2OcJbYjcUL4v11dXQ1rxxyACip9g1MebcxDUDw8PGZOnDgxHVzCf5BAgDlKhriUneJdUqkLH0CWeritp1OfQHJlHbCzDiPqsu6+z7JsM/XbYDJxwHVSFnK5QTY+FACSGGNOTs6BWbNmvQJU+B9z50XkKkVkBvdWhp3c4d9UKpWuYtGXnlRAGebu2LFj68qVK88QhwJrvTm+Pb1/paWl5Q4fwFr+TS8vLyUC2CNBBM+qFvzVPTExMfvAKdAicCQwQpIszTLNgGV9+L/B3iTttbFIjuX8m/369fPhlhx7Gnhqtfr44sWLl06bNi0BwCMOAYmkVJI5mwseUuCj/N9VVVWkzVYZkmMBqOV7N8GG8kcA2Z4CHJheN8Dg3bZkyZKfiDcKVYvsqudvazBTjsrBlRvEv1ZaWlp2D0Ag+Xz+TW9v70EY73J6AGFiTefOndu/aNGi3ZcvX65AdiUAEhnVas7+ObrodDo/sCk7bU3Lysq6afDWSPvFxcXDqGh0WUhISCgXdXXWaExRUdHp5cuXL8B1G+Lce3c3Ym1KAQ59BsRcpyT14ODgCENMkDSyceNGBbUO0frpp5/OxgFJnA3AhoaGUtwFQLZPjMDgpps5ayYm2pAf8Puvqam5ynQkGvS9l+IFbHyW/1BaWlocI7QS70AAW1tbmy9evLg/IiKC2wUwCN1Qs1NDTKTAY/xxfP/99yQiPcrQN9dIZWXlEir3+RRcHsKIZSXZGUCyaWfdunWvQZfjmY4sCavsAjBBRPkCR9bwxzJlypTfwa3BBnHBNZKXlxdELarXzZs3L7wrOWhrAMmmxCNHjvxTJpORzDCS3OSH6zRSe6zKgZKawx8PaHsNfsT+BiXLa0QKbHyF//CJEyfWMiIpHXYAsC0/P//w7NmzSWZEKH5xL8bKi+wmAJhKLax/AZdD7kWw+FmaWq32r9SmvAtMx24jhT0BBBcsHxQbWdSfgNFy8rV7MTZI8+jCfAkE9m3ij2316tWLUOO70gAy8MVHU9q4LT4+/iWmY9+EzTMTyOYXUF5b/f39p6KQfhRFiM3yB7tQHhso7XsNP+p95Uo1IgWVfZZKtD6OckduSwALCwtPLVu27GW06YjRSvJPbJ7qJlaampr8gX60/DEeOnRoA37Y+wRF5wmXl5cvoaiwZdu2bTFICRJrAwhCuTAxMfFDnk3nizadXZItxQqYTJ9QyoOsiTz5gEgTaEQBvH+B2oiXIUaFFgy++cqVKwmhoaGR0Mxoa9h01gIQN1TWUAp1E46zTycXV6ARkhe3TCBD/22coFUyVDUazQtMx67OIKYjgVvBOGZLrBD1fUNTn1KpnIKWgOsDFCRQFCAwU6jtrGVLly4dTTdgwcAVaJZ4MA7c6SRgtkTTxHP8+PGNSH3eDwRYRABks7OznxbYmXkI7UKZFQDkdpY7zTYH9DqK6N2oTMfO+wBBr8yIIJXDy3+nQVSpVGsY3s6dh2WjDfxfIrQLPy4u7g1GYHuHKQASCnGvq6v7ic5WB9dqDmpKycMCIMzrAWJJT0+PR7dN1IzrMtH64MGDIdB4A3W0UuWuXbsiGCffXG0qgDC/1wTs0jQ0W4YyQhtsTATQsPBUUFDwjsAZCTe3b98+iXHQgRLWqqA05pKUSDpggLvwg9FoZo1GU7paT2E6djJuFABRk5yc/GRPBRHAI5tpWih3smn9+vVvo9b16XIR3sSgIvkCSjCo9wqclFYOsiKqp7Gz2IFBKSkpsRht9mO6yM7tDoAciJ4AYrJApLhRrVb/2Z4umAXVE8a7XQi8w4cP/wuDBQEY/ZFYE0AG7bbe5HgQkTOpkjZs2DCQcdIjAIBbnqC38XJLBd999x1JPJqIUXjTTzIyY9XPACJoqa+EQAS5eC03N/cPjnLNRKoLgLSKrEcZOTBoPLpq3TsGysxlUwKiJ3grH5B1WSEga2trk8+ePTuOceBeYFQUzwHVZYqts2AIjUS8B3IiqLur7uauNxsUy6ZNmyKqq6vPiqyiNYJJsBuAnmRnIFkA7nmoJ8Wi3pcuXUqG8YSjl3HvwCBz0hYsWbRnUdgOACWy1dh+N/BoDoIp9MekpCRvWykaYMfBIOfeAuDOGtlbUgGe1AaMPwZheEpudh6QFTIfJEhdXqmpqS+BIjltbL0DJlgIYH4FfvYLWVlZ/haCKdPpdMOgzUUAWgp8qNvG+iZUhwbyWNS05p3Yxp+8tY4AxbRZQo29MzMzXx0+fPhLSqUyqIu02VqY+BWouVCzwYgl+SZkx2gtUFMDy7J6aKNdLpe7gThQSqVSQr1+8DcQ+hsNf0fCM0FMF4fjXLt27Sho2UPvvffeGV7iEckDt3wfjDWOABU4IY24PwEZGRkfggy83O6AQpYigOK+jY2NfR01LFkueISOP1ojBdZqAPIGxSJVEPkSkJCQ8LJKpfoK2K3S1sCRNLdjx479OyYm5gVcoBqOwCmF1pQtll/WYmGRpEQWB+2KJoI72FxPjRo1alxwcHCku7v7YGukuGm12qu//PJL6tGjR1VgFagxta0e2ZRs19WLpbr1iKPgcW+GlAcmkZVu0dHRflFRUcHDoPj5+QWBvPN1dXXtS2SeTCZzw0x4YsvpyRmoer2+HmQjWE3VJQUFBerz58+rd+3aVaDRaJoQtEYEjH+sstEj4R0OoJlamwPTBascWV7O3D8OmcXKDa4dBX4rJom3YG3mVe6a3bZpOAJAIVuSO1ib5eVmCyW5t1NActVh+1r+J8AAu6ig4K2spqcAAAAASUVORK5CYII="

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	// import modernizr
	__webpack_require__(19);

	// import toolkit scripts
	__webpack_require__(20);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(28);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);
	__webpack_require__(35);
	__webpack_require__(37);
	__webpack_require__(38);
	__webpack_require__(39);
	__webpack_require__(41);
	__webpack_require__(42);

	(function ($) {
	  // DOC READY
	  $(function () {
	    // Place code here or place in a toolkit script file and require above
	    $('.view-core-partners .view-content').addClass('owl-carousel');
	    
	    $(".owl-carousel").owlCarousel({
	      items:3, 
	      dots: false,
	      nav: true,
	      smartSpeed: 900,
	      navText: ["<i class='icon icon-prev'></i>","<i class='icon icon-next'></i>"],
	      lazyLoad: true
	    });

	//    $('.owl-carousel').owlCarousel();
	    // Example of using throttle
	    // $(window).on('resize', throttle(function () {
	    //   console.log('resize');
	    // }));

	  });
	})(jQuery);


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	;(function(window){
	/*! modernizr 3.5.0 (Custom Build) | MIT *
	 * https://modernizr.com/download/?-backgroundsize-csscolumns-cssgrid_cssgridlegacy-csspointerevents-cssremunit-csstransforms-cssvwunit-svgasimg-touchevents-domprefixes-prefixes-setclasses-shiv-testallprops-testprop-teststyles !*/
	!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,a,s;for(var l in w)if(w.hasOwnProperty(l)){if(e=[],t=w[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)a=e[i],s=a.split("."),1===s.length?Modernizr[s[0]]=o:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=o),b.push((o?"":"no-")+s.join("-"))}}function i(e){var t=_.className,n=Modernizr._config.classPrefix||"";if(E&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),E?_.className.baseVal=t:_.className=t)}function a(e,t){return!!~(""+e).indexOf(t)}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):E?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function l(){var e=t.body;return e||(e=s(E?"svg":"body"),e.fake=!0),e}function u(e,n,r,o){var i,a,u,c,f="modernizr",d=s("div"),p=l();if(parseInt(r,10))for(;r--;)u=s("div"),u.id=o?o[r]:f+(r+1),d.appendChild(u);return i=s("style"),i.type="text/css",i.id="s"+f,(p.fake?p:d).appendChild(i),p.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),d.id=f,p.fake&&(p.style.background="",p.style.overflow="hidden",c=_.style.overflow,_.style.overflow="hidden",_.appendChild(p)),a=n(d,e),p.fake?(p.parentNode.removeChild(p),_.style.overflow=c,_.offsetHeight):d.parentNode.removeChild(d),!!a}function c(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function f(t,n,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,t,n);var i=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var a=i.error?"error":"log";i[a].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!n&&t.currentStyle&&t.currentStyle[r];return o}function d(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(c(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+c(t[o])+":"+r+")");return i=i.join(" or "),u("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==f(e,null,"position")})}return n}function p(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function m(e,t,o,i){function l(){c&&(delete N.style,delete N.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var u=d(e,o);if(!r(u,"undefined"))return u}for(var c,f,m,h,g,v=["modernizr","tspan","samp"];!N.style&&v.length;)c=!0,N.modElem=s(v.shift()),N.style=N.modElem.style;for(m=e.length,f=0;m>f;f++)if(h=e[f],g=N.style[h],a(h,"-")&&(h=p(h)),N.style[h]!==n){if(i||r(o,"undefined"))return l(),"pfx"==t?h:!0;try{N.style[h]=o}catch(y){}if(N.style[h]!=g)return l(),"pfx"==t?h:!0}return l(),!1}function h(e,t){return function(){return e.apply(t,arguments)}}function g(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?h(o,n||t):o);return!1}function v(e,t,n,o,i){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+z.join(a+" ")+a).split(" ");return r(t,"string")||r(t,"undefined")?m(s,t,o,i):(s=(e+" "+x.join(a+" ")+a).split(" "),g(s,t,n))}function y(e,t,r){return v(e,n,n,t,r)}function C(e,t){if("object"==typeof e)for(var n in e)F(e,n)&&C(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),o=Modernizr[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return Modernizr;t="function"==typeof t?t():t,1==r.length?Modernizr[r[0]]=t:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=t),i([(t&&0!=t?"":"no-")+r.join("-")]),Modernizr._trigger(e,t)}return Modernizr}var w=[],S={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){w.push({name:e,fn:t,options:n})},addAsyncTest:function(e){w.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=S,Modernizr=new Modernizr;var b=[],_=t.documentElement,E="svg"===_.nodeName.toLowerCase(),T="Moz O ms Webkit",x=S._config.usePrefixes?T.toLowerCase().split(" "):[];S._domPrefixes=x;var k=S._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];S._prefixes=k;E||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=C.elements;return"string"==typeof e?e.split(" "):e}function o(e,t){var n=C.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),C.elements=n+" "+e,u(t)}function i(e){var t=y[e[g]];return t||(t={},v++,e[g]=v,y[v]=t),t}function a(e,n,r){if(n||(n=t),f)return n.createElement(e);r||(r=i(n));var o;return o=r.cache[e]?r.cache[e].cloneNode():h.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!o.canHaveChildren||m.test(e)||o.tagUrn?o:r.frag.appendChild(o)}function s(e,n){if(e||(e=t),f)return e.createDocumentFragment();n=n||i(e);for(var o=n.frag.cloneNode(),a=0,s=r(),l=s.length;l>a;a++)o.createElement(s[a]);return o}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return C.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(C,t.frag)}function u(e){e||(e=t);var r=i(e);return!C.shivCSS||c||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),f||l(e,r),e}var c,f,d="3.7.3",p=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",v=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",c="hidden"in e,f=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){c=!0,f=!0}}();var C={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:d,shivCSS:p.shivCSS!==!1,supportsUnknownElements:f,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:u,createElement:a,createDocumentFragment:s,addElements:o};e.html5=C,u(t),"object"==typeof module&&module.exports&&(module.exports=C)}("undefined"!=typeof e?e:this,t);var z=S._config.usePrefixes?T.split(" "):[];S._cssomPrefixes=z;var j={elem:s("modernizr")};Modernizr._q.push(function(){delete j.elem});var N={style:j.elem.style};Modernizr._q.unshift(function(){delete N.style}),S.testAllProps=v,S.testAllProps=y;var P=(S.testProp=function(e,t,r){return m([e],n,t,r)},S.testStyles=u);Modernizr.addTest("backgroundsize",y("backgroundSize","100%",!0)),function(){Modernizr.addTest("csscolumns",function(){var e=!1,t=y("columnCount");try{e=!!t,e&&(e=new Boolean(e))}catch(n){}return e});for(var e,t,n=["Width","Span","Fill","Gap","Rule","RuleColor","RuleStyle","RuleWidth","BreakBefore","BreakAfter","BreakInside"],r=0;r<n.length;r++)e=n[r].toLowerCase(),t=y("column"+n[r]),("breakbefore"===e||"breakafter"===e||"breakinside"==e)&&(t=t||y(n[r])),Modernizr.addTest("csscolumns."+e,t)}(),Modernizr.addTest("csspointerevents",function(){var e=s("a").style;return e.cssText="pointer-events:auto","auto"===e.pointerEvents}),Modernizr.addTest("cssremunit",function(){var e=s("a").style;try{e.fontSize="3rem"}catch(t){}return/rem/.test(e.fontSize)}),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&y("transform","scale(1)",!0)}),P("#modernizr { width: 50vw; }",function(t){var n=parseInt(e.innerWidth/2,10),r=parseInt(f(t,null,"width"),10);Modernizr.addTest("cssvwunit",r==n)}),Modernizr.addTest("cssgridlegacy",y("grid-columns","10px",!0)),Modernizr.addTest("cssgrid",y("grid-template-rows","none",!0));var F;!function(){var e={}.hasOwnProperty;F=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),S._l={},S.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},S._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){S.addTest=C}),Modernizr.addTest("svgasimg",t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")),Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var r=["@media (",k.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");P(r,function(e){n=9===e.offsetTop})}return n}),o(),i(b),delete S.addTest,delete S.addAsyncTest;for(var B=0;B<Modernizr._q.length;B++)Modernizr._q[B]();e.Modernizr=Modernizr}(window,document);
	module.exports = window.Modernizr;
	})(window);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(21);

	// Jquery Match Height options https://github.com/liabru/jquery-match-height
	(function ($) {
	  // DOC READY
	  $(function () {

	    $('.eqheight').matchHeight();

	  });
	})(jQuery);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	* jquery-match-height 0.7.2 by @liabru
	* http://brm.io/jquery-match-height/
	* License: MIT
	*/

	;(function(factory) { // eslint-disable-line no-extra-semi
	    'use strict';
	    if (true) {
	        // AMD
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module.exports) {
	        // CommonJS
	        module.exports = factory(require('jquery'));
	    } else {
	        // Global
	        factory(jQuery);
	    }
	})(function($) {
	    /*
	    *  internal
	    */

	    var _previousResizeWidth = -1,
	        _updateTimeout = -1;

	    /*
	    *  _parse
	    *  value parse utility function
	    */

	    var _parse = function(value) {
	        // parse value and convert NaN to 0
	        return parseFloat(value) || 0;
	    };

	    /*
	    *  _rows
	    *  utility function returns array of jQuery selections representing each row
	    *  (as displayed after float wrapping applied by browser)
	    */

	    var _rows = function(elements) {
	        var tolerance = 1,
	            $elements = $(elements),
	            lastTop = null,
	            rows = [];

	        // group elements by their top position
	        $elements.each(function(){
	            var $that = $(this),
	                top = $that.offset().top - _parse($that.css('margin-top')),
	                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

	            if (lastRow === null) {
	                // first item on the row, so just push it
	                rows.push($that);
	            } else {
	                // if the row top is the same, add to the row group
	                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
	                    rows[rows.length - 1] = lastRow.add($that);
	                } else {
	                    // otherwise start a new row group
	                    rows.push($that);
	                }
	            }

	            // keep track of the last row top
	            lastTop = top;
	        });

	        return rows;
	    };

	    /*
	    *  _parseOptions
	    *  handle plugin options
	    */

	    var _parseOptions = function(options) {
	        var opts = {
	            byRow: true,
	            property: 'height',
	            target: null,
	            remove: false
	        };

	        if (typeof options === 'object') {
	            return $.extend(opts, options);
	        }

	        if (typeof options === 'boolean') {
	            opts.byRow = options;
	        } else if (options === 'remove') {
	            opts.remove = true;
	        }

	        return opts;
	    };

	    /*
	    *  matchHeight
	    *  plugin definition
	    */

	    var matchHeight = $.fn.matchHeight = function(options) {
	        var opts = _parseOptions(options);

	        // handle remove
	        if (opts.remove) {
	            var that = this;

	            // remove fixed height from all selected elements
	            this.css(opts.property, '');

	            // remove selected elements from all groups
	            $.each(matchHeight._groups, function(key, group) {
	                group.elements = group.elements.not(that);
	            });

	            // TODO: cleanup empty groups

	            return this;
	        }

	        if (this.length <= 1 && !opts.target) {
	            return this;
	        }

	        // keep track of this group so we can re-apply later on load and resize events
	        matchHeight._groups.push({
	            elements: this,
	            options: opts
	        });

	        // match each element's height to the tallest element in the selection
	        matchHeight._apply(this, opts);

	        return this;
	    };

	    /*
	    *  plugin global options
	    */

	    matchHeight.version = '0.7.2';
	    matchHeight._groups = [];
	    matchHeight._throttle = 80;
	    matchHeight._maintainScroll = false;
	    matchHeight._beforeUpdate = null;
	    matchHeight._afterUpdate = null;
	    matchHeight._rows = _rows;
	    matchHeight._parse = _parse;
	    matchHeight._parseOptions = _parseOptions;

	    /*
	    *  matchHeight._apply
	    *  apply matchHeight to given elements
	    */

	    matchHeight._apply = function(elements, options) {
	        var opts = _parseOptions(options),
	            $elements = $(elements),
	            rows = [$elements];

	        // take note of scroll position
	        var scrollTop = $(window).scrollTop(),
	            htmlHeight = $('html').outerHeight(true);

	        // get hidden parents
	        var $hiddenParents = $elements.parents().filter(':hidden');

	        // cache the original inline style
	        $hiddenParents.each(function() {
	            var $that = $(this);
	            $that.data('style-cache', $that.attr('style'));
	        });

	        // temporarily must force hidden parents visible
	        $hiddenParents.css('display', 'block');

	        // get rows if using byRow, otherwise assume one row
	        if (opts.byRow && !opts.target) {

	            // must first force an arbitrary equal height so floating elements break evenly
	            $elements.each(function() {
	                var $that = $(this),
	                    display = $that.css('display');

	                // temporarily force a usable display value
	                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
	                    display = 'block';
	                }

	                // cache the original inline style
	                $that.data('style-cache', $that.attr('style'));

	                $that.css({
	                    'display': display,
	                    'padding-top': '0',
	                    'padding-bottom': '0',
	                    'margin-top': '0',
	                    'margin-bottom': '0',
	                    'border-top-width': '0',
	                    'border-bottom-width': '0',
	                    'height': '100px',
	                    'overflow': 'hidden'
	                });
	            });

	            // get the array of rows (based on element top position)
	            rows = _rows($elements);

	            // revert original inline styles
	            $elements.each(function() {
	                var $that = $(this);
	                $that.attr('style', $that.data('style-cache') || '');
	            });
	        }

	        $.each(rows, function(key, row) {
	            var $row = $(row),
	                targetHeight = 0;

	            if (!opts.target) {
	                // skip apply to rows with only one item
	                if (opts.byRow && $row.length <= 1) {
	                    $row.css(opts.property, '');
	                    return;
	                }

	                // iterate the row and find the max height
	                $row.each(function(){
	                    var $that = $(this),
	                        style = $that.attr('style'),
	                        display = $that.css('display');

	                    // temporarily force a usable display value
	                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
	                        display = 'block';
	                    }

	                    // ensure we get the correct actual height (and not a previously set height value)
	                    var css = { 'display': display };
	                    css[opts.property] = '';
	                    $that.css(css);

	                    // find the max height (including padding, but not margin)
	                    if ($that.outerHeight(false) > targetHeight) {
	                        targetHeight = $that.outerHeight(false);
	                    }

	                    // revert styles
	                    if (style) {
	                        $that.attr('style', style);
	                    } else {
	                        $that.css('display', '');
	                    }
	                });
	            } else {
	                // if target set, use the height of the target element
	                targetHeight = opts.target.outerHeight(false);
	            }

	            // iterate the row and apply the height to all elements
	            $row.each(function(){
	                var $that = $(this),
	                    verticalPadding = 0;

	                // don't apply to a target
	                if (opts.target && $that.is(opts.target)) {
	                    return;
	                }

	                // handle padding and border correctly (required when not using border-box)
	                if ($that.css('box-sizing') !== 'border-box') {
	                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
	                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
	                }

	                // set the height (accounting for padding and border)
	                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
	            });
	        });

	        // revert hidden parents
	        $hiddenParents.each(function() {
	            var $that = $(this);
	            $that.attr('style', $that.data('style-cache') || null);
	        });

	        // restore scroll position if enabled
	        if (matchHeight._maintainScroll) {
	            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
	        }

	        return this;
	    };

	    /*
	    *  matchHeight._applyDataApi
	    *  applies matchHeight to all elements with a data-match-height attribute
	    */

	    matchHeight._applyDataApi = function() {
	        var groups = {};

	        // generate groups by their groupId set by elements using data-match-height
	        $('[data-match-height], [data-mh]').each(function() {
	            var $this = $(this),
	                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

	            if (groupId in groups) {
	                groups[groupId] = groups[groupId].add($this);
	            } else {
	                groups[groupId] = $this;
	            }
	        });

	        // apply matchHeight to each group
	        $.each(groups, function() {
	            this.matchHeight(true);
	        });
	    };

	    /*
	    *  matchHeight._update
	    *  updates matchHeight on all current groups with their correct options
	    */

	    var _update = function(event) {
	        if (matchHeight._beforeUpdate) {
	            matchHeight._beforeUpdate(event, matchHeight._groups);
	        }

	        $.each(matchHeight._groups, function() {
	            matchHeight._apply(this.elements, this.options);
	        });

	        if (matchHeight._afterUpdate) {
	            matchHeight._afterUpdate(event, matchHeight._groups);
	        }
	    };

	    matchHeight._update = function(throttle, event) {
	        // prevent update if fired from a resize event
	        // where the viewport width hasn't actually changed
	        // fixes an event looping bug in IE8
	        if (event && event.type === 'resize') {
	            var windowWidth = $(window).width();
	            if (windowWidth === _previousResizeWidth) {
	                return;
	            }
	            _previousResizeWidth = windowWidth;
	        }

	        // throttle updates
	        if (!throttle) {
	            _update(event);
	        } else if (_updateTimeout === -1) {
	            _updateTimeout = setTimeout(function() {
	                _update(event);
	                _updateTimeout = -1;
	            }, matchHeight._throttle);
	        }
	    };

	    /*
	    *  bind events
	    */

	    // apply on DOM ready event
	    $(matchHeight._applyDataApi);

	    // use on or bind where supported
	    var on = $.fn.on ? 'on' : 'bind';

	    // update heights on load and resize events
	    $(window)[on]('load', function(event) {
	        matchHeight._update(false, event);
	    });

	    // throttled update heights on resize events
	    $(window)[on]('resize orientationchange', function(event) {
	        matchHeight._update(true, event);
	    });

	});


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	// Accordion styling functionality and animation
	(function ($) {
	  // DOC READY
	  $(function () {
	    
	    var accordioncontainer = '.custom-accordion',
	      accordioncontent = '.accordion-content',
	      accordiontrigger = '.accordion-trigger';

	    $(accordioncontainer).each(function (i) {
	      $(this).addClass('tm-accordion-enabled');
	      if (i > 0) {
	        $(this).addClass('collapsed').find(accordioncontent).slideUp('fast');
	      }
	    });

	    $(accordioncontainer + ' ' + accordiontrigger + ' a').click(function (e) {
	      e.preventDefault();
	      $(this).closest(accordioncontainer).toggleClass('collapsed');
	      $(this).parent().next(accordioncontent).slideToggle('fast');
	    });

	  });
	})(jQuery);

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	// Responsive data tables with headers
	(function ($) {
	  // DOC READY
	  $(function () {

	    $('table.data').each(function () {
	      var headertext = [],
	        headers = $(this).find('thead th'),
	        tablerows = $(this).find('tbody tr');

	      if (headers.length) {
	        // Grab headers and put them into array
	        headers.each(function (i) {
	          var current = headers[i];
	          headertext.push(current.textContent.replace(/\r?\n|\r/, ""));
	          // add class to empty header cells
	          if (!current.textContent) {
	            $(this).addClass('empty-header-cell');
	          }
	        });

	        // set attribute on each cell within a row
	        tablerows.each(function () {
	          $(this).children().each(function (i) {
	            if (headertext[i]) {
	              $(this).attr('data-th', headertext[i]).addClass('labeled');
	            }
	          });
	        });
	      }
	    });

	  });
	})(jQuery);

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	// A lightweight throttle Function
	// https://remysharp.com/2010/07/21/throttling-function-calls

	// // Resize using throttle
	//  $(window).on('resize', throttle(function () {
	//   console.log('resized');
	// }));

	module.exports = function throttle(fn, threshhold, scope) {
	  threshhold || (threshhold = 100);
	  var last,
	    deferTimer;
	  return function () {
	    var context = scope || this;

	    var now = +new Date,
	      args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    }
	    else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var Cookies = __webpack_require__(27);

	// JS cookies https://github.com/js-cookie/js-cookie
	(function ($) {
	  // DOC READY
	  $(function () {

	    // Cookies.set('visited', 'yes');
	    // console.log(Cookies.get('visited'));
	    // Cookies.remove('visited');

	  });
	})(jQuery);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.2.0
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		var registeredInModuleLoader = false;
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			registeredInModuleLoader = true;
		}
		if (true) {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}

		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}

				// Write

				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);

					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}

					// We're using "expires" because "max-age" is not supported by IE
					attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}

					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}

					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);

					var stringifiedAttributes = '';

					for (var attributeName in attributes) {
						if (!attributes[attributeName]) {
							continue;
						}
						stringifiedAttributes += '; ' + attributeName;
						if (attributes[attributeName] === true) {
							continue;
						}
						stringifiedAttributes += '=' + attributes[attributeName];
					}
					return (document.cookie = key + '=' + value + stringifiedAttributes);
				}

				// Read

				if (!key) {
					result = {};
				}

				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;

				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');

					if (!this.json && cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}

					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);

						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}

						if (key === name) {
							result = cookie;
							break;
						}

						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}

				return result;
			}

			api.set = api;
			api.get = function (key) {
				return api.call(api, key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};

			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};

			api.withConverter = init;

			return api;
		}

		return init(function () {});
	}));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(29);
	var throttle = __webpack_require__(25);

	// Viewport options https://github.com/1337/jquery_viewport
	(function ($) {
	  // DOC READY
	  $(function () {

	    // REVEALING CONTENT ON LOAD IN VIEWPORT
	    $(window).on('load', function () {
	      // hide blocks by default
	      $('.f-item-group').addClass('transparent');

	      // show blocks that are in the viewport
	      $('.transparent:in-viewport').each(function () {
	        $(this).removeClass('transparent');
	      });
	    });

	    // REVEALING CONTENT ON SCROLL/RESIZE VIEWPORT
	    $(window).on('scroll resize', throttle(function () {
	      $('.transparent:in-viewport').each(function (i) {
	        // show content in staggered fashion setting a delay for each one
	        $(this).delay(100 * i).queue(function () {
	          $(this).removeClass('transparent').dequeue();
	        });
	      });
	    }));

	  });
	})(jQuery);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Viewport - jQuery selectors for finding elements in viewport
	 *
	 * Copyright (c) 2008-2009 Mika Tuupola
	 *
	 * Licensed under the MIT license:
	 *   http://www.opensource.org/licenses/mit-license.php
	 *
	 * Project home:
	 *  http://www.appelsiini.net/projects/viewport
	 *
	 */
	(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && module.exports) {
	        factory(require('jquery'));
	    } else {
	        factory(root.jQuery);
	    }
	}(this, function ($) {
	    "use strict";

	    var belowTheFold = function (element, settings) {
	            var fold = $(window).height() + $(window).scrollTop();
	            return fold <= Math.round($(element).offset().top) - settings.threshold;
	        },
	        belowTheFoldCompletely = function (element, settings) {
	            var fold = $(window).height() + $(window).scrollTop();
	            return fold <= $(element).offset().top + $(element).height() - settings.threshold;
	        },
	        aboveTheTop = function (element, settings) {
	            var top = $(window).scrollTop();
	            return top >= Math.round($(element).offset().top) + $(element).height() - settings.threshold;
	        },
	        aboveTheTopCompletely = function (element, settings) {
	            var top = $(window).scrollTop();
	            return top >= $(element).offset().top - settings.threshold;
	        },
	        rightOfScreen = function (element, settings) {
	            var fold = $(window).width() + $(window).scrollLeft();
	            return fold <= $(element).offset().left - settings.threshold;
	        },
	        rightOfScreenCompletely = function (element, settings) {
	            var fold = $(window).width() + $(window).scrollLeft();
	            return fold <= $(element).offset().left + $(element).width() - settings.threshold;
	        },
	        leftOfScreen = function (element, settings) {
	            var left = $(window).scrollLeft();
	            return left >= Math.round($(element).offset().left) + $(element).width() - settings.threshold;
	        },
	        leftOfScreenCompletely = function (element, settings) {
	            var left = $(window).scrollLeft();
	            return left >= $(element).offset().left - settings.threshold;
	        },
	        inViewport = function (element, settings) {
	            var $element = $(element),
	                offset = $element.offset();

	            // Return false if element is hidden.
	            if (!$element.is(':visible')) {
	                return false;
	            }

	            var $window = $(window),
	                windowTop = $window.scrollTop(),
	                threshold = settings.threshold;

	            if (offset.top - threshold < windowTop) {
	                if (offset.top + $element.height() + threshold >= windowTop) {
	                    // top edge below the window's top
	                } else {
	                    return false;
	                }
	            } else {
	                if (offset.top - threshold <= windowTop + $window.height()) {
	                    // bottom edge above the window's bottom
	                } else {
	                    return false;
	                }
	            }

	            var windowLeft = $window.scrollLeft();

	            if (offset.left - threshold < windowLeft) {
	                if (offset.left + $element.width() + threshold >= windowLeft) {
	                    // left edge be on the left side of the window's left edge
	                } else {
	                    return false;
	                }
	            } else {
	                if (offset.left - threshold <= windowLeft + $window.width()) {
	                    // right edge be on the right side of the window's right edge
	                } else {
	                    return false;
	                }
	            }

	            return true;
	        };

	    $.extend($.expr[':'], {
	        "below-the-fold": function (a, i, m) {
	            // m[3] is supposedly the threshold (@theluk)
	            return belowTheFold(a, {threshold: parseInt(m[3]) || 0});
	        },
	        "below-the-fold-completely": function (a, i, m) {
	            // m[3] is supposedly the threshold (@theluk)
	            return belowTheFoldCompletely(a, {threshold: parseInt(m[3]) || 0});
	        },
	        "above-the-top": function (a, i, m) {
	            // m[3] is supposedly the threshold (@theluk)
	            return aboveTheTop(a, {threshold: parseInt(m[3]) || 0});
	        },
	        "above-the-top-completely": function (a, i, m) {
	            // m[3] is supposedly the threshold (@theluk)
	            return aboveTheTopCompletely(a, {threshold: parseInt(m[3]) || 0});
	        },
	        "left-of-screen": function (a, i, m) {
	            // m[3] is supposedly the threshold (@theluk)
	            return leftOfScreen(a, {threshold: parseInt(m[3]) || 0});
	        },
	        "left-of-screen-completely": function (a, i, m) {
	            // m[3] is supposedly the threshold (@theluk)
	            return leftOfScreenCompletely(a, {threshold: parseInt(m[3]) || 0});
	        },
	        "right-of-screen": function (a, i, m) {
	            // m[3] is supposedly the threshold (@theluk)
	            return rightOfScreen(a, {threshold: parseInt(m[3]) || 0});
	        },
	        "right-of-screen-completely": function (a, i, m) {
	            // m[3] is supposedly the threshold (@theluk)
	            return rightOfScreenCompletely(a, {threshold: parseInt(m[3]) || 0});
	        },
	        "in-viewport": function (a, i, m) {
	            // m[3] is supposedly the threshold (@theluk)
	            return inViewport(a, {threshold: parseInt(m[3]) || 0});
	        },
	        "in-viewport-completely": function (a, i, m) {
	            // m[3] is supposedly the threshold (@theluk)
	            return inViewportCompletely(a, {threshold: parseInt(m[3]) || 0});
	        }
	    });
	}));


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	(function ($) {
	  // DOC READY
	  $(function () {

	    /**
	     * ACCESSIBILITY
	     * Menu and skip links
	     */

	    var nav = $('#navigation > ul.menu'),
	      trig = $('#menu-trigger > a'),
	      tomaincontentlink = $('#top'),
	      backtotoplink = $('#bottom'),
	      mobilemenuclass = 'show-menu',
	      kids = nav.children();

	    // add class for top level menu items
	    kids.addClass('top-level-menu-item');


	    // add class to first and last links in the menu
	    nav.each(function () {
	      $(this).find('a').first().addClass('first-menu-item');
	      $(this).find('a').last().addClass('last-menu-item');
	    });

	    // tabbing out of the end menu items
	    nav.find('a.last-menu-item').keydown(function (e) {
	      // tabbed out no shift
	      if (e.which == 9 && !e.shiftKey) {
	        outofmenu();
	      }
	    });
	    nav.find('a.first-menu-item').keydown(function (e) {
	      // shift tabbed out
	      if (e.which == 9 && e.shiftKey) {
	        outofmenu();
	      }
	    });

	    // remove focus from menu when you are clicking outside of it
	    $(document).on('click', outofmenu());
	    nav.click(function (e) {
	      e.stopPropagation();
	    });

	    // add class on focus
	    nav.find('a').on({
	      focus: function () {
	        $(this).closest('.top-level-menu-item').addClass('focus')
	          .siblings().removeClass('focus');
	      },
	      mouseenter: function () {
	        // let normal hovers override
	        outofmenu();
	      }
	    });

	    // removes focus class and focus from all menu items
	    function outofmenu() {
	      kids.each(function () {
	        $(this).removeClass('focus');
	        nav.find('a').blur();
	      });
	    }

	    /**
	     * Menu mobile trigger
	     */

	    // Menu trigger functionality
	    // trig.click(function(e){
	    //   e.preventDefault();
	    //   $('body').toggleClass('no-scroll menu-open');
	    //   $('#header nav, #header .menu-trigger').toggleClass('show-menu');
	    // });
	    //
	    // trig.keydown(function(e){
	    //   if (!trig.parent().hasClass(mobilemenuclass)) {
	    //     if(e.which == 9 && !e.shiftKey) {
	    //       $(this).trigger('click');
	    //     }
	    //   }
	    // });
	    // nav.find('a.first-menu-item').keydown(function(e){
	    //   // shift tabbed out
	    //   if(e.which == 9 && e.shiftKey) {
	    //     trig.trigger('click');
	    //   }
	    // });
	    // nav.find('a.last-menu-item').keydown(function(e){
	    //   // shift tabbed out
	    //   if(e.which == 9 && !e.shiftKey) {
	    //     trig.trigger('click').addClass('return-check');
	    //   }
	    // }).on('focus', function(){
	    //   if(trig.hasClass('return-check')) {
	    //     trig.removeClass('return-check')
	    //       .trigger('click');
	    //     $(this).focus();
	    //   }
	    // });


	    /**
	     * Skip links
	     */
	    tomaincontentlink.on({
	      focus: function () {
	        trig.removeClass('return-check');
	      },
	      click: function () {
	        trig.addClass('return-check');
	      }
	    });
	    backtotoplink.on('focus', function () {
	      // scroll back to top link into view
	      window.scrollTo(0, document.body.scrollHeight);
	    });

	  });
	})(jQuery);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function ($) {// (function ($, Drupal, window, document, undefined) {
	// // To understand behaviors, see https://drupal.org/node/756722#behaviors
	//     Drupal.behaviors.accessiblemenu = {
	//         attach: function(context, settings) {

	            //Code here
	            //

	    $( '.menu' ).on( 'mouseenter focus', '.menu-item--expanded > a', function( e ) {
	        var el = $( this );
	        el.toggleClass( 'has-focus' );
	        // Show sub-menu
	        el.parents( '.menu-item' ).attr( 'aria-expanded', 'true' );
	    }).on( 'mouseleave blur', '.menu-item--expanded > a', function( e ) {
	        var el = $( this );
	        el.toggleClass( 'has-focus' );
	        // Only hide sub-menu after a short delay, so links get a chance to catch focus from tabbing
	        setTimeout( function() {
	            if ( el.siblings( 'li.menu-item > .menu' ).attr( 'data-has-focus' ) !== 'true' ) {
	                el.parents( 'li.menu-item' ).attr( 'aria-expanded', 'false' );
	            }
	        }, 100 );
	    }).on( 'mouseenter focusin', 'li.menu-item > .menu', function( e ) {
	        var el = $( this );
	        el.attr( 'data-has-focus', 'true' );
	    }).on( 'mouseleave focusout', 'li.menu-item > .menu', function( e ) {
	        var el = $( this );
	        setTimeout( function() {
	            // Check if anything else has picked up focus (i.e. next link in sub-menu)
	            if ( el.find( ':focus' ).length === 0 ) {
	                el.attr( 'data-has-focus', 'false' );
	                // Hide sub-menu on the way out if parent link doesn't have focus now
	                if ( el.siblings( 'li.menu-item a.has-focus' ).length === 0 ) {
	                    el.parents( '.menu-item--expanded' ).attr( 'aria-expanded', 'false' );
	                }
	            }
	        }, 100 );
	    });


	    //     }
	    // };

	//
	// })(jQuery, Drupal, this, this.document);

	  $('a[href*="#"]:not([href="#"])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });

	/*!
	 * hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
	 * http://briancherne.github.io/jquery-hoverIntent/
	 *
	 * You may use hoverIntent under the terms of the MIT license. Basically that
	 * means you are free to use hoverIntent as long as this header is left intact.
	 * Copyright 2007, 2014 Brian Cherne
	 */

	/* hoverIntent is similar to jQuery's built-in "hover" method except that
	 * instead of firing the handlerIn function immediately, hoverIntent checks
	 * to see if the user's mouse has slowed down (beneath the sensitivity
	 * threshold) before firing the event. The handlerOut function is only
	 * called after a matching handlerIn.
	 *
	 * // basic usage ... just like .hover()
	 * .hoverIntent( handlerIn, handlerOut )
	 * .hoverIntent( handlerInOut )
	 *
	 * // basic usage ... with event delegation!
	 * .hoverIntent( handlerIn, handlerOut, selector )
	 * .hoverIntent( handlerInOut, selector )
	 *
	 * // using a basic configuration object
	 * .hoverIntent( config )
	 *
	 * @param  handlerIn   function OR configuration object
	 * @param  handlerOut  function OR selector for delegation OR undefined
	 * @param  selector    selector OR undefined
	 * @author Brian Cherne <brian(at)cherne(dot)net>
	 */

	(function(factory) {
	    'use strict';
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (jQuery && !jQuery.fn.hoverIntent) {
	        factory(jQuery);
	    }
	})(function($) {
	    'use strict';

	    // default configuration values
	    var _cfg = {
	        interval: 100,
	        sensitivity: 6,
	        timeout: 0
	    };

	    // counter used to generate an ID for each instance
	    var INSTANCE_COUNT = 0;

	    // current X and Y position of mouse, updated during mousemove tracking (shared across instances)
	    var cX, cY;

	    // saves the current pointer position coordinates based on the given mousemove event
	    var track = function(ev) {
	        cX = ev.pageX;
	        cY = ev.pageY;
	    };

	    // compares current and previous mouse positions
	    var compare = function(ev,$el,s,cfg) {
	        // compare mouse positions to see if pointer has slowed enough to trigger `over` function
	        if ( Math.sqrt( (s.pX-cX)*(s.pX-cX) + (s.pY-cY)*(s.pY-cY) ) < cfg.sensitivity ) {
	            $el.off(s.event,track);
	            delete s.timeoutId;
	            // set hoverIntent state as active for this element (permits `out` handler to trigger)
	            s.isActive = true;
	            // overwrite old mouseenter event coordinates with most recent pointer position
	            ev.pageX = cX; ev.pageY = cY;
	            // clear coordinate data from state object
	            delete s.pX; delete s.pY;
	            return cfg.over.apply($el[0],[ev]);
	        } else {
	            // set previous coordinates for next comparison
	            s.pX = cX; s.pY = cY;
	            // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
	            s.timeoutId = setTimeout( function(){compare(ev, $el, s, cfg);} , cfg.interval );
	        }
	    };

	    // triggers given `out` function at configured `timeout` after a mouseleave and clears state
	    var delay = function(ev,$el,s,out) {
	        delete $el.data('hoverIntent')[s.id];
	        return out.apply($el[0],[ev]);
	    };

	    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {
	        // instance ID, used as a key to store and retrieve state information on an element
	        var instanceId = INSTANCE_COUNT++;

	        // extend the default configuration and parse parameters
	        var cfg = $.extend({}, _cfg);
	        if ( $.isPlainObject(handlerIn) ) {
	            cfg = $.extend(cfg, handlerIn);
	            if ( !$.isFunction(cfg.out) ) {
	                cfg.out = cfg.over;
	            }
	        } else if ( $.isFunction(handlerOut) ) {
	            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
	        } else {
	            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
	        }

	        // A private function for handling mouse 'hovering'
	        var handleHover = function(e) {
	            // cloned event to pass to handlers (copy required for event object to be passed in IE)
	            var ev = $.extend({},e);

	            // the current target of the mouse event, wrapped in a jQuery object
	            var $el = $(this);

	            // read hoverIntent data from element (or initialize if not present)
	            var hoverIntentData = $el.data('hoverIntent');
	            if (!hoverIntentData) { $el.data('hoverIntent', (hoverIntentData = {})); }

	            // read per-instance state from element (or initialize if not present)
	            var state = hoverIntentData[instanceId];
	            if (!state) { hoverIntentData[instanceId] = state = { id: instanceId }; }

	            // state properties:
	            // id = instance ID, used to clean up data
	            // timeoutId = timeout ID, reused for tracking mouse position and delaying "out" handler
	            // isActive = plugin state, true after `over` is called just until `out` is called
	            // pX, pY = previously-measured pointer coordinates, updated at each polling interval
	            // event = string representing the namespaced event used for mouse tracking

	            // clear any existing timeout
	            if (state.timeoutId) { state.timeoutId = clearTimeout(state.timeoutId); }

	            // namespaced event used to register and unregister mousemove tracking
	            var mousemove = state.event = 'mousemove.hoverIntent.hoverIntent'+instanceId;

	            // handle the event, based on its type
	            if (e.type === 'mouseenter') {
	                // do nothing if already active
	                if (state.isActive) { return; }
	                // set "previous" X and Y position based on initial entry point
	                state.pX = ev.pageX; state.pY = ev.pageY;
	                // update "current" X and Y position based on mousemove
	                $el.off(mousemove,track).on(mousemove,track);
	                // start polling interval (self-calling timeout) to compare mouse coordinates over time
	                state.timeoutId = setTimeout( function(){compare(ev,$el,state,cfg);} , cfg.interval );
	            } else { // "mouseleave"
	                // do nothing if not already active
	                if (!state.isActive) { return; }
	                // unbind expensive mousemove event
	                $el.off(mousemove,track);
	                // if hoverIntent state is true, then call the mouseOut function after the specified delay
	                state.timeoutId = setTimeout( function(){delay(ev,$el,state,cfg.out);} , cfg.timeout );
	            }
	        };

	        // listen for mouseenter and mouseleave
	        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
	    };
	});

	//
	// (function ($, Drupal, window) {
	//     Drupal.behaviors.mobilenav_behavior = {
	//         attach: function(context, settings) {

	            //Code here

	            function nkhMobileMenuParts() {
	              $('#block-nkh-main-menu li.menu-item a').addClass('menu-link');
	              $('#block-nkh-main-menu li.menu-item--expanded').append('<a class="sub-nav-toggle"><span class="element-invisible">Open Sub-navigation</span></a>');
	              $('#block-nkh-main-menu li.menu-item--expanded > .menu').append('<a class="sub-nav-toggle-back">' + 'Back' + '</a>');
	            }


	            function nkhMobileMenu() {


	                var menutoggle = $('.menu-toggle');
	                var menublock = $('#block-nkh-main-menu');
	                var headergroup = $('.region-header');
	                var header = $('#header');
	                var isMobile = menutoggle.is(':visible');

	                var subnavtoggle = $('.sub-nav-toggle');
	                var subnavtoggleback = $('.sub-nav-toggle-back');
	                var menulink = $('#block-nkh-main-menu .menu li.menu-item .menu-link');
	                var menuset = $('#block-nkh-main-menu .menu .main-navigation');
	                var subnav = $("#block-nkh-main-menu .menu li.menu-item--expanded .main-navigation");


	                if (isMobile) {

	                    menublock.addClass('mobile-menu');
	                    headergroup.addClass('mobile');

	                    // Add in click open on the main nav with accessibility
	                    menutoggle.off('click keyup').on('click keyup', function() {
	                        if (menutoggle.hasClass('open')) {
	                            headergroup.removeClass('open').attr('aria-expanded', 'false');
	                            menutoggle.removeClass('open').attr('aria-expanded', 'false');
	                            menublock.removeClass('open').attr('aria-expanded', 'false');
	                            header.removeClass('stay-open stay-open-menu');

	                        }
	                        else {
	                            headergroup.addClass('open').attr('aria-expanded', 'true');
	                            menutoggle.addClass('open').attr('aria-expanded', 'true');
	                            menublock.addClass('open').attr('aria-expanded', 'true');
	                            header.addClass('stay-open stay-open-menu');
	                        }
	                    });

	                    subnavtoggle.off('click keyup').on('click keyup', function() {
	                        if ( $(this).hasClass('open') ) {
	                            $(this).removeClass('open');
	                            $(this).siblings('.menu').removeClass('open').attr('aria-expanded', 'false');
	                            $(this).closest('.menu').removeClass('subnav');
	                        } else {
	                            subnavtoggleback.addClass('open');
	                            $(this).addClass('open');
	                            $(this).siblings('.menu').addClass('open').attr('aria-expanded', 'true');
	                            $(this).closest('.menu').addClass('subnav');
	                        }
	                        $('.stay-open-menu').animate({
	                          scrollTop: 0
	                        }, 400);
	                    });

	                    subnavtoggleback.off('click keyup').on('click keyup', function() {
	                        $(this).removeClass('open');
	                        $(this).parent().removeClass('open');
	                        $(this).parent().siblings(subnavtoggle).removeClass('open').attr('aria-expanded', 'false');
	                        $(this).closest('.subnav').removeClass('subnav');
	                        $('.stay-open-menu').animate({
	                          scrollTop: 0
	                        }, 400);
	                    });
	                }
	                else {
	                    headergroup.removeClass('open mobile').attr('aria-expanded', '');
	                    menutoggle.removeClass('open').attr('aria-expanded', '');
	                    menublock.removeClass('open mobile-menu').attr('aria-expanded', '');
	                    header.removeClass('stay-open stay-open-menu');
	                    menuset.removeClass('subnav');
	                    subnavtoggle.removeClass('open').siblings('.menu').attr('aria-expanded', '').removeClass('open').closest('.menu').removeClass('subnav');
	                    // $('.menu.main-navigation.open a.sub-nav-toggle-back.menu-link.open').remove();
	                    // $('.sub-nav-toggle-back').remove();
	                    // $('.sub-nav-toggle').remove();
	                }

	                menulink.on('focus', function(){
	                    $(this).parents('.menu-item').addClass('open');
	                });
	                menulink.on('blur', function(){
	                    $(this).parents('.menu-item').removeClass('open');
	                });

	            }

	          $( document ).ready( nkhMobileMenuParts );
	          $( document ).ready( nkhMobileMenu );
	          $( window ).resize( nkhMobileMenu );


	    //     }
	    // };
	// })(jQuery, Drupal, this);

	/**
	 * @file
	 * A JavaScript file for the theme.
	 *
	 * In order for this JavaScript to be loaded on pages, see the instructions in
	 * the README.txt next to this file.
	 */

	// JavaScript should be made compatible with libraries other than jQuery by
	// wrapping it with an "anonymous closure". See:
	// - https://drupal.org/node/1446420
	// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
	// (function ($, Drupal) {
	// 'use strict';
	//   // To understand behaviors, see https://www.drupal.org/node/2269515
	//   Drupal.behaviors.basic = {
	//     attach: function (context, settings) {


	    // Execute code once the DOM is ready. $(document).ready() not required within Drupal.behaviors.

	      // $(window).load(function () {
	      //   // Execute code once the window is fully loaded.

	      // });

	      // $(window).resize(function () {
	      //   // Execute code when the window is resized.
	      // });

	      // $(window).scroll(function () {
	      //   // Execute code when the window scrolls.
	      // });

	  //   }
	  // };


	// })(jQuery, Drupal);
	}(jQuery));

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	(function ($) {
	    // Drupal.behaviors.newslettersearch_behavior = {
	        //attach: function(context, settings) {

	            // This was firing twice.
	            // Ajax returns the entire page, so the script ran twice.
	            // http://codekarate.com/blog/drupal-7-prevent-duplicating-javascript-behaviors

	            //if (context == document) {

	                $( '.block-search' ).prepend( '<button class="header-search-form__toggle"><span class="element-invisible">Open the Search Form</span></button>');


	                $('.block-mobilecommonssignup, .block-newslettersignupform, .block-newslettersignupform-2, .block-search')

	                //$('.header-newsletter-form__toggle, .header-search-form__toggle')
	                    .off('mousedown').on('mousedown', function() {
	                        if ( $(this).hasClass( 'open' ) ) {
	                            $(this).removeClass( 'open' ).addClass( 'closed' );
	                            //console.log('It had the open class, and on click closed');
	                        }
	                        else if ( $(this).siblings().hasClass( 'open' ) ) {
	                            $(this).siblings().removeClass( 'open' ).addClass( 'closed' );
	                            $(this).addClass( 'open' ).removeClass( 'closed' );
	                            //console.log('The sibling had the open class, and on click closed');
	                        }
	                        else {
	                            $(this).addClass( 'open' ).removeClass( 'closed' );
	                            //console.log('It opened on click');
	                        }
	                    })

	                    .on( 'focusin', function() {
	                        if ( $(this).siblings().hasClass( 'open' ) ) {
	                            $(this).siblings().removeClass( 'open' ).addClass( 'closed' );
	                            $(this).addClass( 'open' ).removeClass( 'closed' );
	                            //console.log('It got focus, and the sibling had the open class, so sibling was closed and this was opened.');
	                        }
	                        else if ( $(this).hasClass( 'open' ) ) {
	                            //do nothing
	                            //console.log('It had the open class, and so on focus didnt change');
	                        }
	                        else {
	                            $(this).addClass( 'open' ).removeClass( 'closed' );
	                            //console.log('It opened when the focus went to it.');
	                        }
	                    })

	                    .on( 'focusout blur', function() {
	                        $(this).removeClass( 'open' ).addClass( 'closed' );
	                        console.log('It closed on blur');
	                    });

	            //}

	        //END CODE
	        // }
	    // };
	// })(jQuery, Drupal, this, this.document);
	})(jQuery);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(34);

	// expandable truncated text
	(function ($) {
	  // DOC READY
	  $(function () {

	    $('.shorten').shorten();

	  });
	})(jQuery);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * jQuery Shorten plugin 1.1.0
	 *
	 * Copyright (c) 2014 Viral Patel
	 * http://viralpatel.net
	 *
	 * Licensed under the MIT license:
	 *   http://www.opensource.org/licenses/mit-license.php
	 */

	/*
	 ** updated by Jeff Richardson
	 ** Updated to use strict,
	 ** IE 7 has a "bug" It is returning undefined when trying to reference string characters in this format
	 ** content[i]. IE 7 allows content.charAt(i) This works fine in all modern browsers.
	 ** I've also added brackets where they weren't added just for readability (mostly for me).
	 */

	(function (factory) {
	  if(typeof module === "object" && typeof module.exports === "object") {
	    factory(__webpack_require__(22), window, document);
	  } else {
	    factory(jQuery, window, document);
	  }
	}(function($, window, document, undefined) {
	  $.fn.shorten = function(settings) {
	    "use strict";

	    var config = {
	      showChars: 100,
	      minHideChars: 10,
	      ellipsesText: "...",
	      moreText: "more",
	      lessText: "less",
	      onLess: function() {},
	      onMore: function() {},
	      errMsg: null,
	      force: false
	    };

	    if (settings) {
	      $.extend(config, settings);
	    }

	    if ($(this).data('jquery.shorten') && !config.force) {
	      return false;
	    }

	    $(this).data('jquery.shorten', true);

	    $(document).off('click', '.morelink');

	    $(document).on({
	      click: function() {

	        var $this = $(this);
	        if ($this.hasClass('less')) {
	          $this.removeClass('less');
	          $this.html(config.moreText);
	          $this.parent().prev().prev().show();
	          $this.parent().prev().hide(0, function() {
	            config.onLess();
	          });

	        } else {
	          $this.addClass('less');
	          $this.html(config.lessText);
	          $this.parent().prev().prev().hide();
	          $this.parent().prev().show(0, function() {
	            config.onMore();
	          });
	        }
	        return false;
	      }
	    }, '.morelink');

	    return this.each(function() {
	      var $this = $(this);

	      var content = $this.html().trim();
	      var contentlen = content.length;
	      var nextSpaceIndex = content.substr(config.showChars, contentlen - config.showChars).indexOf(' '); // Index of the first space in the text to hide
	      var newShowChars = config.showChars + nextSpaceIndex;

	      if (contentlen > newShowChars + config.minHideChars) {
	        var c = content.substr(0, newShowChars);
	        if (c.indexOf('<') >= 0) // If there's HTML don't want to cut it
	        {
	          var inTag = false; // I'm in a tag?
	          var bag = ''; // Put the characters to be shown here
	          var countChars = 0; // Current bag size
	          var openTags = []; // Stack for opened tags, so I can close them later
	          var tagName = null;

	          for (var i = 0, r = 0; r <= newShowChars; i++) {
	            if (content[i] == '<' && !inTag) {
	              inTag = true;

	              // This could be "tag" or "/tag"
	              tagName = content.substring(i + 1, content.indexOf('>', i));

	              // If its a closing tag
	              if (tagName[0] == '/') {


	                if (tagName != '/' + openTags[0]) {
	                  config.errMsg = 'ERROR en HTML: the top of the stack should be the tag that closes';
	                } else {
	                  openTags.shift(); // Pops the last tag from the open tag stack (the tag is closed in the retult HTML!)
	                }

	              } else {
	                // There are some nasty tags that don't have a close tag like <br/>
	                if (tagName.toLowerCase() != 'br') {
	                  openTags.unshift(tagName); // Add to start the name of the tag that opens
	                }
	              }
	            }
	            if (inTag && content[i] == '>') {
	              inTag = false;
	            }

	            if (inTag) {
	              bag += content.charAt(i);
	            } // Add tag name chars to the result
	            else {
	              if (countChars <= newShowChars) {
	                bag += content.charAt(i); // Fix to ie 7 not allowing you to reference string characters using the []
	                countChars++;
	              } else // Now I have the characters needed
	              {
	                if (openTags.length > 0) // I have unclosed tags
	                {
	                  for (j = 0; j < openTags.length; j++) {
	                    bag += '</' + openTags[j] + '>'; // Close all tags that were opened
	                  }
	                  break;
	                }
	              }
	            }
	            r++;
	          }
	          c = $('<div/>').html(bag + '<span class="ellip">' + config.ellipsesText + '</span>').html();
	        }else{
	          c+=config.ellipsesText;
	        }

	        var html = '<div class="shortcontent">' + c +
	          '</div><div class="allcontent">' + content +
	          '</div><span><a href="javascript://nop/" class="morelink">' + config.moreText + '</a></span>';

	        $this.html(html);
	        $this.find(".allcontent").hide(); // Hide all text
	        $('.shortcontent > *:last', $this).css('margin-bottom', 0); //Remove bottom margin on last paragraph as it's likely shortened
	      }
	    });

	  };
	}));

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(36);

	// animated anchor links
	(function ($) {
	  // DOC READY
	  $(function () {

	    $('.skip-links').click(function () {
	      var target = $(this).attr('href');
	      $.scrollTo(target, 800, {
	        onAfter: function () {
	          $(target).focus();
	        }
	      });
	    });

	  });
	})(jQuery);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery.scrollTo
	 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
	 * Licensed under MIT
	 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
	 * @projectDescription Lightweight, cross-browser and highly customizable animated scrolling with jQuery
	 * @author Ariel Flesler
	 * @version 2.1.2
	 */
	;(function(factory) {
		'use strict';
		if (true) {
			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			// CommonJS
			module.exports = factory(require('jquery'));
		} else {
			// Global
			factory(jQuery);
		}
	})(function($) {
		'use strict';

		var $scrollTo = $.scrollTo = function(target, duration, settings) {
			return $(window).scrollTo(target, duration, settings);
		};

		$scrollTo.defaults = {
			axis:'xy',
			duration: 0,
			limit:true
		};

		function isWin(elem) {
			return !elem.nodeName ||
				$.inArray(elem.nodeName.toLowerCase(), ['iframe','#document','html','body']) !== -1;
		}		

		$.fn.scrollTo = function(target, duration, settings) {
			if (typeof duration === 'object') {
				settings = duration;
				duration = 0;
			}
			if (typeof settings === 'function') {
				settings = { onAfter:settings };
			}
			if (target === 'max') {
				target = 9e9;
			}

			settings = $.extend({}, $scrollTo.defaults, settings);
			// Speed is still recognized for backwards compatibility
			duration = duration || settings.duration;
			// Make sure the settings are given right
			var queue = settings.queue && settings.axis.length > 1;
			if (queue) {
				// Let's keep the overall duration
				duration /= 2;
			}
			settings.offset = both(settings.offset);
			settings.over = both(settings.over);

			return this.each(function() {
				// Null target yields nothing, just like jQuery does
				if (target === null) return;

				var win = isWin(this),
					elem = win ? this.contentWindow || window : this,
					$elem = $(elem),
					targ = target, 
					attr = {},
					toff;

				switch (typeof targ) {
					// A number will pass the regex
					case 'number':
					case 'string':
						if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
							targ = both(targ);
							// We are done
							break;
						}
						// Relative/Absolute selector
						targ = win ? $(targ) : $(targ, elem);
						/* falls through */
					case 'object':
						if (targ.length === 0) return;
						// DOMElement / jQuery
						if (targ.is || targ.style) {
							// Get the real position of the target
							toff = (targ = $(targ)).offset();
						}
				}

				var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

				$.each(settings.axis.split(''), function(i, axis) {
					var Pos	= axis === 'x' ? 'Left' : 'Top',
						pos = Pos.toLowerCase(),
						key = 'scroll' + Pos,
						prev = $elem[key](),
						max = $scrollTo.max(elem, axis);

					if (toff) {// jQuery / DOMElement
						attr[key] = toff[pos] + (win ? 0 : prev - $elem.offset()[pos]);

						// If it's a dom element, reduce the margin
						if (settings.margin) {
							attr[key] -= parseInt(targ.css('margin'+Pos), 10) || 0;
							attr[key] -= parseInt(targ.css('border'+Pos+'Width'), 10) || 0;
						}

						attr[key] += offset[pos] || 0;

						if (settings.over[pos]) {
							// Scroll to a fraction of its width/height
							attr[key] += targ[axis === 'x'?'width':'height']() * settings.over[pos];
						}
					} else {
						var val = targ[pos];
						// Handle percentage values
						attr[key] = val.slice && val.slice(-1) === '%' ?
							parseFloat(val) / 100 * max
							: val;
					}

					// Number or 'number'
					if (settings.limit && /^\d+$/.test(attr[key])) {
						// Check the limits
						attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
					}

					// Don't waste time animating, if there's no need.
					if (!i && settings.axis.length > 1) {
						if (prev === attr[key]) {
							// No animation needed
							attr = {};
						} else if (queue) {
							// Intermediate animation
							animate(settings.onAfterFirst);
							// Don't animate this axis again in the next iteration.
							attr = {};
						}
					}
				});

				animate(settings.onAfter);

				function animate(callback) {
					var opts = $.extend({}, settings, {
						// The queue setting conflicts with animate()
						// Force it to always be true
						queue: true,
						duration: duration,
						complete: callback && function() {
							callback.call(elem, targ, settings);
						}
					});
					$elem.animate(attr, opts);
				}
			});
		};

		// Max scrolling position, works on quirks mode
		// It only fails (not too badly) on IE, quirks mode.
		$scrollTo.max = function(elem, axis) {
			var Dim = axis === 'x' ? 'Width' : 'Height',
				scroll = 'scroll'+Dim;

			if (!isWin(elem))
				return elem[scroll] - $(elem)[Dim.toLowerCase()]();

			var size = 'client' + Dim,
				doc = elem.ownerDocument || elem.document,
				html = doc.documentElement,
				body = doc.body;

			return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);
		};

		function both(val) {
			return $.isFunction(val) || $.isPlainObject(val) ? val : { top:val, left:val };
		}

		// Add special hooks so that window scroll properties can be animated
		$.Tween.propHooks.scrollLeft = 
		$.Tween.propHooks.scrollTop = {
			get: function(t) {
				return $(t.elem)[t.prop]();
			},
			set: function(t) {
				var curr = this.get(t);
				// If interrupt is true and user scrolled, stop animating
				if (t.options.interrupt && t._last && t._last !== curr) {
					return $(t.elem).stop();
				}
				var next = Math.round(t.now);
				// Don't waste CPU
				// Browsers don't render floating point scroll
				if (curr !== next) {
					$(t.elem)[t.prop](next);
					t._last = this.get(t);
				}
			}
		};

		// AMD requirement
		return $scrollTo;
	});


/***/ }),
/* 37 */
/***/ (function(module, exports) {

	// form related js for accessibility
	(function ($) {
	  // DOC READY
	  $(function () {

	    // Update Checkbox/Radios format: input nested in the label
	    $('label > input').each(function () {
	      $(this).parent().attr('for', $(this).attr('id')).before($(this).detach());
	    });

	    // Checkbox & Radios focus/blur
	    $('input[type="checkbox"], input[type="radio"]').on({
	      focus: function () {
	        $(this).siblings('label').addClass('focused');
	      },
	      blur: function () {
	        $(this).siblings('label').removeClass('focused');
	      }
	    });

	    //Checkbox & Radios hover triggers focus/blur
	    $('input[type="checkbox"] + label, input[type="radio"] + label').on({
	      mouseenter: function () {
	        $(this).prev('input').focus();
	      },
	      mouseleave: function () {
	        $(this).prev('input').blur();
	      }
	    });

	  });
	})(jQuery);

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	// Tab styling functionality and animation
	(function ($) {
	  // DOC READY
	  $(function () {

	    var tabcontainer = '.tm-tabs',
	      tabcontent = '.tab-content',
	      tablabel = '.tab-label';

	    // prepare the tabs for interaction
	    $(tabcontainer).each(function () {
	      // add class to provide default state
	      $(this).addClass('tm-tab-enabled');

	      $(this).find(tablabel).addClass('tm-tab-label');

	      // empty string to append tab links
	      var tablinks = '';

	      // loop through tab content
	      $(this).find(tabcontent).each(function (i) {
	        var tablink = '<a href="#" data-tab="tab-number-' + i + '">' + $(this).find(tablabel).text() + '</a>';

	        if (i > 0) {
	          // hide the tab content that is not the first one
	          $(this).addClass('tm-tab-hide');
	          tablink = '<li>' + tablink + '</li>';
	        }
	        else {
	          // make the first tab link active
	          tablink = '<li class="active">' + tablink + '</li>';
	        }

	        tablinks += tablink;

	        // add an index specific class to content
	        $(this).addClass('tm-tab-content').addClass('tab-number-' + i);
	      });

	      // add the tablinks to the markup
	      $(this).prepend('<ul class="tm-tab-links">' + tablinks + '</ul>');
	    });


	    // trigger click events on the tabs we created
	    $('.tm-tab-links a').click(function (e) {
	      e.preventDefault();
	      var tab = $(this).data('tab');

	      // track active state of the tabcontent
	      $(this).closest(tabcontainer).find(tabcontent).addClass('tm-tab-hide');
	      $(this).closest(tabcontainer).find('.' + tab).removeClass('tm-tab-hide');

	      // track active state of the links
	      $(this).parent().siblings().removeClass('active');
	      $(this).parent().addClass('active');

	    });

	  });
	})(jQuery);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(40);

	// Sticky Kit
	// Config options here https://github.com/leafo/sticky-kit/
	(function ($) {
	  // DOC READY
	  $(function () {

	    // sticky elements within a container scope
	    $('.make-sticky h2').stick_in_parent({
	      parent: '.f-container'
	    }).on("sticky_kit:stick", function(e) {
	      // add z-index value to be on top
	      $(this).css({
	        'z-index': 1
	      })
	    });

	  });
	})(jQuery);

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	// Generated by CoffeeScript 1.10.0

	/**
	@license Sticky-kit v1.1.3 | MIT | Leaf Corcoran 2015 | http://leafo.net
	 */

	(function() {
	  var $, win;

	  $ = window.jQuery;

	  win = $(window);

	  $.fn.stick_in_parent = function(opts) {
	    var doc, elm, enable_bottoming, fn, i, inner_scrolling, len, manual_spacer, offset_top, outer_width, parent_selector, recalc_every, sticky_class;
	    if (opts == null) {
	      opts = {};
	    }
	    sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, recalc_every = opts.recalc_every, parent_selector = opts.parent, offset_top = opts.offset_top, manual_spacer = opts.spacer, enable_bottoming = opts.bottoming;
	    if (offset_top == null) {
	      offset_top = 0;
	    }
	    if (parent_selector == null) {
	      parent_selector = void 0;
	    }
	    if (inner_scrolling == null) {
	      inner_scrolling = true;
	    }
	    if (sticky_class == null) {
	      sticky_class = "is_stuck";
	    }
	    doc = $(document);
	    if (enable_bottoming == null) {
	      enable_bottoming = true;
	    }
	    outer_width = function(el) {
	      var _el, computed, w;
	      if (window.getComputedStyle) {
	        _el = el[0];
	        computed = window.getComputedStyle(el[0]);
	        w = parseFloat(computed.getPropertyValue("width")) + parseFloat(computed.getPropertyValue("margin-left")) + parseFloat(computed.getPropertyValue("margin-right"));
	        if (computed.getPropertyValue("box-sizing") !== "border-box") {
	          w += parseFloat(computed.getPropertyValue("border-left-width")) + parseFloat(computed.getPropertyValue("border-right-width")) + parseFloat(computed.getPropertyValue("padding-left")) + parseFloat(computed.getPropertyValue("padding-right"));
	        }
	        return w;
	      } else {
	        return el.outerWidth(true);
	      }
	    };
	    fn = function(elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached) {
	      var bottomed, detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;
	      if (elm.data("sticky_kit")) {
	        return;
	      }
	      elm.data("sticky_kit", true);
	      last_scroll_height = doc.height();
	      parent = elm.parent();
	      if (parent_selector != null) {
	        parent = parent.closest(parent_selector);
	      }
	      if (!parent.length) {
	        throw "failed to find stick parent";
	      }
	      fixed = false;
	      bottomed = false;
	      spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $("<div />");
	      if (spacer) {
	        spacer.css('position', elm.css('position'));
	      }
	      recalc = function() {
	        var border_top, padding_top, restore;
	        if (detached) {
	          return;
	        }
	        last_scroll_height = doc.height();
	        border_top = parseInt(parent.css("border-top-width"), 10);
	        padding_top = parseInt(parent.css("padding-top"), 10);
	        padding_bottom = parseInt(parent.css("padding-bottom"), 10);
	        parent_top = parent.offset().top + border_top + padding_top;
	        parent_height = parent.height();
	        if (fixed) {
	          fixed = false;
	          bottomed = false;
	          if (manual_spacer == null) {
	            elm.insertAfter(spacer);
	            spacer.detach();
	          }
	          elm.css({
	            position: "",
	            top: "",
	            width: "",
	            bottom: ""
	          }).removeClass(sticky_class);
	          restore = true;
	        }
	        top = elm.offset().top - (parseInt(elm.css("margin-top"), 10) || 0) - offset_top;
	        height = elm.outerHeight(true);
	        el_float = elm.css("float");
	        if (spacer) {
	          spacer.css({
	            width: outer_width(elm),
	            height: height,
	            display: elm.css("display"),
	            "vertical-align": elm.css("vertical-align"),
	            "float": el_float
	          });
	        }
	        if (restore) {
	          return tick();
	        }
	      };
	      recalc();
	      if (height === parent_height) {
	        return;
	      }
	      last_pos = void 0;
	      offset = offset_top;
	      recalc_counter = recalc_every;
	      tick = function() {
	        var css, delta, recalced, scroll, will_bottom, win_height;
	        if (detached) {
	          return;
	        }
	        recalced = false;
	        if (recalc_counter != null) {
	          recalc_counter -= 1;
	          if (recalc_counter <= 0) {
	            recalc_counter = recalc_every;
	            recalc();
	            recalced = true;
	          }
	        }
	        if (!recalced && doc.height() !== last_scroll_height) {
	          recalc();
	          recalced = true;
	        }
	        scroll = win.scrollTop();
	        if (last_pos != null) {
	          delta = scroll - last_pos;
	        }
	        last_pos = scroll;
	        if (fixed) {
	          if (enable_bottoming) {
	            will_bottom = scroll + height + offset > parent_height + parent_top;
	            if (bottomed && !will_bottom) {
	              bottomed = false;
	              elm.css({
	                position: "fixed",
	                bottom: "",
	                top: offset
	              }).trigger("sticky_kit:unbottom");
	            }
	          }
	          if (scroll < top) {
	            fixed = false;
	            offset = offset_top;
	            if (manual_spacer == null) {
	              if (el_float === "left" || el_float === "right") {
	                elm.insertAfter(spacer);
	              }
	              spacer.detach();
	            }
	            css = {
	              position: "",
	              width: "",
	              top: ""
	            };
	            elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
	          }
	          if (inner_scrolling) {
	            win_height = win.height();
	            if (height + offset_top > win_height) {
	              if (!bottomed) {
	                offset -= delta;
	                offset = Math.max(win_height - height, offset);
	                offset = Math.min(offset_top, offset);
	                if (fixed) {
	                  elm.css({
	                    top: offset + "px"
	                  });
	                }
	              }
	            }
	          }
	        } else {
	          if (scroll > top) {
	            fixed = true;
	            css = {
	              position: "fixed",
	              top: offset
	            };
	            css.width = elm.css("box-sizing") === "border-box" ? elm.outerWidth() + "px" : elm.width() + "px";
	            elm.css(css).addClass(sticky_class);
	            if (manual_spacer == null) {
	              elm.after(spacer);
	              if (el_float === "left" || el_float === "right") {
	                spacer.append(elm);
	              }
	            }
	            elm.trigger("sticky_kit:stick");
	          }
	        }
	        if (fixed && enable_bottoming) {
	          if (will_bottom == null) {
	            will_bottom = scroll + height + offset > parent_height + parent_top;
	          }
	          if (!bottomed && will_bottom) {
	            bottomed = true;
	            if (parent.css("position") === "static") {
	              parent.css({
	                position: "relative"
	              });
	            }
	            return elm.css({
	              position: "absolute",
	              bottom: padding_bottom,
	              top: "auto"
	            }).trigger("sticky_kit:bottom");
	          }
	        }
	      };
	      recalc_and_tick = function() {
	        recalc();
	        return tick();
	      };
	      detach = function() {
	        detached = true;
	        win.off("touchmove", tick);
	        win.off("scroll", tick);
	        win.off("resize", recalc_and_tick);
	        $(document.body).off("sticky_kit:recalc", recalc_and_tick);
	        elm.off("sticky_kit:detach", detach);
	        elm.removeData("sticky_kit");
	        elm.css({
	          position: "",
	          bottom: "",
	          top: "",
	          width: ""
	        });
	        parent.position("position", "");
	        if (fixed) {
	          if (manual_spacer == null) {
	            if (el_float === "left" || el_float === "right") {
	              elm.insertAfter(spacer);
	            }
	            spacer.remove();
	          }
	          return elm.removeClass(sticky_class);
	        }
	      };
	      win.on("touchmove", tick);
	      win.on("scroll", tick);
	      win.on("resize", recalc_and_tick);
	      $(document.body).on("sticky_kit:recalc", recalc_and_tick);
	      elm.on("sticky_kit:detach", detach);
	      return setTimeout(tick, 0);
	    };
	    for (i = 0, len = this.length; i < len; i++) {
	      elm = this[i];
	      fn($(elm));
	    }
	    return this;
	  };

	}).call(this);


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	(function ($) {
	  // Keycode commands
	  $.fn.codeAction = function(code, action) {
	    var curr = 0;
	    jQuery(this).keydown(function(event) {
	      if (event.keyCode == code[curr]) {
	        curr++;
	      }
	      else {
	        curr = 0;
	        return;
	      }
	      if (curr == 10) {
	        action();
	        curr = 0;
	      }
	    });
	    return this;
	  };

	  // DOC READY
	  $(function () {

	    // Konami Code U-U-D-D-L-R-L-R-B-A
	    $('body').codeAction([38,38,40,40,37,39,37,39,66,65], function() {
	      alert('Konami Mode Enabled!');
	      var KICKASSVERSION = '2.0';
	      var s = document.createElement('script');
	      s.type = 'text/javascript';
	      document.body.appendChild(s);
	      s.src = '//hi.kickassapp.com/kickass.js';
	    });

	  });
	})(jQuery);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(3);

	(function ($) {
	  // DOC READY
	  $(function () {
	    // Owl Carousel
	    // Config options here http://www.owlcarousel.owlgraphic.com/docs/api-options.html
	    var owl = $('.owl-carousel');
	    owl.owlCarousel({
	      items: 1,
	      loop: true,
	      autoplay: true,
	      autoplayTimeout: 6000,
	      autoplaySpeed: 1000,
	      autoplayHoverPause: true,
	      nav: true,
	      navText: ['<a href="#" class="pd">previous slide</a>', '<a href="#" class="pd">next slide</a>'],
	      dots: false
	    }).after('<div class="owl-autoplay-controls"><a href="#" class="owl-start pd">Start</a><a href="#" class="owl-stop pd">Stop</a></div>');

	    // Prevent default link interaction on carousel controls
	    $('a.pd').on('click', function (e) {
	      e.preventDefault();
	    });

	    // trigger start
	    $('.owl-start').on('click', function () {
	      owl.trigger('play.owl.autoplay', [1000])
	    });

	    // trigger stop
	    $('.owl-stop').on('click', function () {
	      owl.trigger('stop.owl.autoplay')
	    });
	  });
	})(jQuery);

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	// Use cases for Drupal behaviors
	// - Reinitialize something after an AJAX call
	// - using Drupal settings that are sent from php
	// - etc.
	// To understand behaviors, see https://drupal.org/node/756722#behaviors
	// (function ($, Drupal) {
	//   Drupal.behaviors.my_custom_behavior = {
	//     attach: function (context, settings) {
	//       // Do something Drupally
	//     }
	//   };
	// })(jQuery, Drupal);

/***/ })
/******/ ]);