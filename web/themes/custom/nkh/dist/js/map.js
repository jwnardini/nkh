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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	var loadGoogleMapsApi = __webpack_require__(8);
	loadGoogleMapsApi.key = 'AIzaSyDMF8bus_g_m9frZBqEWwI6cNEmfXVK4qM';

	loadGoogleMapsApi().then(function (googleMaps) {
	    var latlng = {lat: 45.5506509, lng: -122.6624718};
	    var map = new google.maps.Map(document.getElementById('googlemap'), {
	        zoom: 10,
	        scrollwheel: false,
	        center: latlng
	    });
	    var marker = new google.maps.Marker({
	        position: latlng,
	        map: map
	    });
	    google.maps.event.addDomListener(window, "resize", function() {
	        var center = map.getCenter();
	        google.maps.event.trigger(map, "resize");
	        map.setCenter(center);
	    });
	}).catch(function (err) {
	    console.error(err);
	});

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;;(function (root, factory) {  // eslint-disable-line
	  // Making module available as AMS, CommonJS and for browser.
	  /* eslint-disable no-undef */
	  if (typeof module === 'object' && module.exports) {
	    module.exports = factory();
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return (function () { return factory(); });
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    root['loadGoogleMapsApi'] = factory();
	  }
	  /* eslint-enable no-undef */
	}(this, function() {
	  'use strict';
	  // Start of module definition.

	  function loader (opts) {
	    opts = opts || {};

	    var client = opts.client || loader.client;
	    var key = opts.key || loader.key;
	    var language = opts.language || loader.language;
	    var libraries = opts.libraries || loader.libraries || [];
	    var timeout = opts.timeout || loader.timeout || 10000;
	    var version = opts.version || loader.version;

	    var callbackName = '__googleMapsApiOnLoadCallback';

	    return new window.Promise(function (resolve, reject) {
	      // Exit if not running inside a browser.
	      if (typeof window === 'undefined') {
	        return reject(new Error('Can only load the Google Maps API in the browser'));
	      }

	      // Check whether API is already loaded.
	      if (window.google && window.google.maps) {
	        resolve(window.google.maps);
	      } else {
	        // Prepare the `script` tag to be inserted into the page.
	        var scriptElement = document.createElement('script');
	        var params = ['callback=' + callbackName];
	        if (client) params.push('client=' + client);
	        if (key) params.push('key=' + key);
	        if (language) params.push('language=' + language);
	        libraries = [].concat(libraries); // Ensure that `libraries` is an array
	        if (libraries.length) params.push('libraries=' + libraries.join(','));
	        if (version) params.push('v=' + version);
	        scriptElement.src = 'https://maps.googleapis.com/maps/api/js?' + params.join('&');

	        // Timeout if necessary.
	        var timeoutId = null;
	        if (timeout) {
	          timeoutId = window.setTimeout(function () {
	            window[callbackName] = function () {}; // Set the on load callback to a no-op.
	            reject(new Error('Could not load the Google Maps API'));
	          }, timeout);
	        }

	        // Hook up the on load callback.
	        window[callbackName] = function () {
	          if (timeoutId !== null) {
	            window.clearTimeout(timeoutId);
	          }
	          resolve(window.google.maps);
	          delete window[callbackName];
	        };

	        // Insert the `script` tag.
	        document.body.appendChild(scriptElement);
	      }
	    });
	  }

	  return loader;
	}));



/***/ })

/******/ });