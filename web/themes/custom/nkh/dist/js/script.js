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
	module.exports = __webpack_require__(40);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
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
	__webpack_require__(33);
	__webpack_require__(35);
	__webpack_require__(36);
	__webpack_require__(37);
	__webpack_require__(39);

	(function ($) {
	  // DOC READY
	  $(function () {
	    // Place code here or place in a toolkit script file and require above

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
	 * JavaScript Cookie v2.1.4
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

					if (cookie.charAt(0) === '"') {
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

	__webpack_require__(32);

	// expandable truncated text
	(function ($) {
	  // DOC READY
	  $(function () {

	    $('.shorten').shorten();

	  });
	})(jQuery);


/***/ }),
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(34);

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
/* 34 */
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
/* 35 */
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
/* 36 */
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(38);

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
/* 38 */
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
/* 39 */
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
/* 40 */
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