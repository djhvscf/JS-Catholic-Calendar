 /**
 * catholicCalendar.js
 * @version: v1.0.0
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 *
 * Created by Dennis Hernández on 26/Jun/2016.
 *
 * Copyright (c) 2014 Dennis Hernández http://djhvscf.github.io/Blog
 *	
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

;( function( window ) {
	
	'use strict';

    var calendars = "http://calapi.inadiutorium.cz/api/v0/en/calendars",
        getCalendar = "http://calapi.inadiutorium.cz/api/v0/en/calendars/%s",
        today = "http://calapi.inadiutorium.cz/api/v0/en/calendars/%s/today",
        yearMonthDayCalendar = "http://calapi.inadiutorium.cz/api/v0/en/calendars/%s/%s/%s/%s",
        yearMonthCalendar ="http://calapi.inadiutorium.cz/api/v0/en/calendars/%s/%s/%s",
        yearCalendar = "http://calapi.inadiutorium.cz/api/v0/en/calendars/%s/%s";

    function sprintf(str) {
        var args = arguments,
            flag = true,
            i = 1;

        str = str.replace( /%s/g, function () {
            var arg = args[ i++ ];

            if ( typeof arg === 'undefined' ) {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    }
	
	function extend(a, b) {
		for(var key in b) { 
			if(b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}

    function ajax(url, success, error) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                if (success !== undefined) {
                    success(JSON.parse(request.responseText));
                }
            } else {
                if (error !== undefined) {
                    error();
                }
            }
        };

        request.onerror = function() {
        	console.log("We could not connect with the server");
        };

        request.send();
    }

	function catholicCalendar(options) {
		this.options = extend(this.options, options);
	}

	catholicCalendar.prototype.options = {
		calendar: "default", //"general-la" - "general-en" - "czech"
	}
	
	catholicCalendar.prototype.getCalendars = function(success, error) { 
        ajax(calendars, success, error);
	}

    catholicCalendar.prototype.getCalendar = function(success, error) {
        ajax(getCalendar, success, error);
    }

    catholicCalendar.prototype.today = function(success, error) {
        ajax(sprintf(today, this.options.calendar), success, error);
    }

    catholicCalendar.prototype.getByYearMonthDay = function(year, month, day, success, error) {
        ajax(sprintf(yearMonthDayCalendar, this.options.calendar, year, month, day), success, error);
    }

    catholicCalendar.prototype.getByYearMonth = function(year, month, success, error) {
        ajax(sprintf(yearMonthCalendar, this.options.calendar, year, month), success, error);
    }

    catholicCalendar.prototype.getByYear = function(year, success, error) {
        ajax(sprintf(yearCalendar, this.options.calendar, year), success, error);
    }

	window.catholicCalendar = catholicCalendar;
})(window);