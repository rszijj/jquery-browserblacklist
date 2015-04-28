/*
 *  jquery-browserblacklist - v1.0.0
 *  Customize a browser blacklist for your features
 *  https://github.com/rszijj/jquery-browserblacklist
 *
 *  Made by Romain SZIJJ
 *  Under MIT License
 */
(function($, window, screen, navigator, document) {
    "use strict";

    /**
     * Check if a browser client is blacklisted
     *
     * @param {object} params A params object. See the documentation for more details.
     *
     * @return jQuery
     */
    $.BrowserBlacklist = function( params ) {
    	var t = $.BrowserBlacklist.helper;

    	// The "json" parameter is required
    	if( ! params.json ) {
    		console.log( "BrowserBlacklist: The \"json\" parameter is required."); return;
    	}

    	// Client infos initialization
    	t.getClientOS();
		t.getClientBrowser();
		t.getClientBrowserVersion();

		// Load the JSON file to get blacklisted browsers
    	$.ajax({
    		url: params.json,
    		dataType: 'jsonp',
    		jsonpCallback: 'blacklist',
    		success: function(data) {
    			// Check if blacklisted or not
				if( t.isBlacklisted( data ) ) {
					// callback isBlacklisted()
					params.isBlacklisted && params.isBlacklisted();
				} else {
					// callback isNotBlacklisted()
					params.isNotBlacklisted && params.isNotBlacklisted();
				}
    		}
		});

		return $;
    }

    /* helper functions */
    $.BrowserBlacklist.helper = {

    	/**
    	 * Client useragent
    	 *
    	 * @type string
    	 */
    	useragent: window.navigator.appVersion,

    	/**
    	 * Clients infos
    	 *
    	 * @type object
    	 */
    	client: {},

    	/**
    	 * Constants
    	 *
    	 * @type object
    	 */
    	constant: {
    		os: {
    			"windows"	: "windows",
    			"mac" 		: "mac",
    			"linux" 	: "linux"
    		},
    		browser: {
    			"chrome"	: "chrome",
    			"firefox"	: "firefox",
    			"opera"		: "opera",
    			"safari"	: "safari"
    		}
    	},

    	/**
    	 * Regex constants
    	 *
    	 * @type object
    	 */
    	regex: {
    		os: {
    			"windows" 	: /Windows/,
    			"mac"		: /Macintosh/,
    			"linux" 	: /Linux/
    		},
    		browser: {
    			"chrome" 	: /(Chrome|Chromium)\//,
    			"firefox" 	: /Firefox\//,
    			"opera" 	: /Opera/,
    			"safari" 	: /Safari\//
    		}

    	},

    	/**
    	 * Get the user operating system
    	 *
    	 * @return {string} a "constant.os" value
    	 */
    	getClientOS: function() {
    		var t = this;

    		t.client.os = null;

    		// if Windows
    		if( t.useragent.match( t.regex.os.windows ) ) {
    			t.client.os = t.constant.os.windows;
    		}
    		// if Mac
			else if( t.useragent.match( t.regex.os.mac ) ) {
				t.client.os = t.constant.os.mac;
			}
			// if Linux
			else if( t.useragent.match( t.regex.os.linux ) ) {
				t.client.os = t.constant.os.linux;
			}

			return t.client.os;
    	},

    	/**
    	 * Get the user browser
    	 *
    	 * @return {string} a "constant.browser" value
    	 */
    	getClientBrowser: function() {
    		var t = this;

    		t.client.browser = null;

    		// if Chrome
    		if( t.useragent.match( t.regex.browser.chrome ) ) {
    			t.client.browser = t.constant.browser.chrome;
    		}
    		// if Firefox
			else if( t.useragent.match( t.regex.browser.firefox ) ) {
				t.client.browser = t.constant.browser.firefox;
			}
			// if Opera
			else if( t.useragent.match( t.regex.browser.opera ) ) {
				t.client.browser = t.constant.browser.opera;
			}
			// if Safari
			else if( t.useragent.match( t.regex.browser.safari ) ) {
				t.client.browser = t.constant.browser.safari;
			}

			return t.client.browser;
    	},

    	/**
    	 * Get the user browser version
    	 *
    	 * @return {[type]} [description]
    	 */
    	getClientBrowserVersion: function() {
    		var t = this;

    		t.client.version = null;

    		// if Chrome
    		if( t.client.browser == t.constant.browser.chrome && t.useragent.match(/Chrome\/(\d+)\./) ) { 
    			t.client.version = parseInt( t.useragent.match(/Chrome\/(\d+)\./)[1], 10);
    		}
    		// if Firefox
			else if( t.client.browser == t.constant.browser.firefox && t.useragent.match(/Firefox\/(\d+)\./) ) {
				t.client.version = parseInt( t.useragent.match(/Firefox\/(\d+)\./)[1], 10);
			}
			// if Opera
			else if( t.client.browser == t.constant.browser.opera ) {
				if( t.useragent.match(/Version\/(\d+)\./) && t.useragent.match(/Version\/(\d+)\./)[1] != null ) {
					t.client.version = parseInt( t.useragent.match(/Version\/(\d+)\./)[1], 10);
				}
				else if( t.useragent.match(/Opera (\d+)\./) && t.useragent.match(/Opera (\d+)\./)[1] != null ) {
					t.client.version = parseInt( t.useragent.match(/Opera (\d+)\./)[1], 10);
				}
			}
			// if Safari
			else if( t.client.browser == t.constant.browser.safari && t.useragent.match(/Version\/(\d+)\./) ) {
				t.client.version = parseInt( t.useragent.match(/Version\/(\d+)\./)[1], 10);
			}

			return t.client.version;
    	},

    	/**
    	 * Parse the JSON data to generate version tests
    	 *
    	 * @param {string} client_version The client browser version
    	 * @param {string} json_version The version in the JSON (with optionnaly, an operator)
    	 * 
    	 * @return {boolean} Returns true if the test is passed
    	 */
    	testOperatorVersion: function( client_version, json_version ) {
    		// if >=
    		if( json_version.match(/\>\= (\d+)/) ) {
				if( client_version >= json_version.match(/\>\= (\d+)/)[1] ) {
					return true;
				} 
			}
			// if <=
			else if( json_version.match(/\<\= (\d+)/) ) {
				if( client_version <= json_version.match(/\<\= (\d+)/)[1] ) {
					return true;
				}
			}
			// if ==
			else if( json_version.match(/^(\d+)$/) ) {
				if( client_version == json_version.match(/^(\d+)$/)[1] ) {
					return true;
				}
			}
    	},

    	/**
    	 * Is the current browser version blacklisted?
    	 *
    	 * @param {json} json The JSON array
    	 * 
    	 * @return {boolean} Returns true if the current browser is blacklisted
    	 */
    	isBlacklisted: function( json ) {
    		var t 			= this,
    		isBlacklisted 	= false,
			arr 			= [];

			// Arrays concatenation
			if( json["all"] ) { arr = arr.concat( json["all"] ); }
			if( json[t.client.os] ) { arr = arr.concat( json[t.client.os] ); }

			if( arr ) {
				arr.forEach( function(v) {
					if( !isBlacklisted ) {
						if( v.browser == t.client.browser ) {
							if( t.testOperatorVersion( t.client.version, v.version ) ) {
								isBlacklisted = true;
							}
						}
					}
				});
			}

			return isBlacklisted;
    	}

    }
})(jQuery, window, screen, navigator, document);