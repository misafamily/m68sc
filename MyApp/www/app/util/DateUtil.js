/*
     * Date Format 1.2.3
     * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
     * MIT license
     *
     * Includes enhancements by Scott Trenda <scott.trenda.net>
     * and Kris Kowal <cixar.com/~kris.kowal/>
     *
     * Accepts a date, a mask, or a date and a mask.
     * Returns a formatted version of the given date.
     * The date defaults to the current date/time.
     * The mask defaults to dateFormat.masks.default.
     */

    var dateFormat = function () {
        var    token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };
    
        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;
    
            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }
    
            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date;
            if (isNaN(date)) throw SyntaxError("invalid date");
    
            mask = String(dF.masks[mask] || mask || dF.masks["default"]);
    
            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }
    
            var    _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d:    d,
                    dd:   pad(d),
                    ddd:  dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m:    m + 1,
                    mm:   pad(m + 1),
                    mmm:  dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy:   String(y).slice(2),
                    yyyy: y,
                    h:    H % 12 || 12,
                    hh:   pad(H % 12 || 12),
                    H:    H,
                    HH:   pad(H),
                    M:    M,
                    MM:   pad(M),
                    s:    s,
                    ss:   pad(s),
                    l:    pad(L, 3),
                    L:    pad(L > 99 ? Math.round(L / 10) : L),
                    t:    H < 12 ? "a"  : "p",
                    tt:   H < 12 ? "am" : "pm",
                    T:    H < 12 ? "A"  : "P",
                    TT:   H < 12 ? "AM" : "PM",
                    Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };
    
            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();
    
    // Some common format strings
    dateFormat.masks = {
        "default":      "ddd mmm dd yyyy HH:MM:ss",
        shortDate:      "m/d/yy",
        mediumDate:     "mmm d, yyyy",
        longDate:       "mmmm d, yyyy",
        fullDate:       "dddd, mmmm d, yyyy",
        shortTime:      "h:MM TT",
        mediumTime:     "h:MM:ss TT",
        longTime:       "h:MM:ss TT Z",
        isoDate:        "yyyy-mm-dd",
        isoTime:        "HH:MM:ss",
        isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };
    
    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            //"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            //"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            "Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7",
			"Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"
			
        ],
        monthNames: [
            //"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            //"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
			"Th1","Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10","Th11","Th12",
			"Tháng 1","Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10","Tháng 11","Tháng 12"
        ]
    };
	


    
    // For convenience...
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };
	
	Date.prototype.getDayName = function() {
	    return dateFormat.i18n.dayNames[7 + this.getDay()];
	};
	Date.prototype.getShortDayName = function() {
	    return dateFormat.i18n.dayNames[this.getDay()];
	};
	Date.prototype.getMonthName = function() {
	    return dateFormat.i18n.monthNames[12 + this.getMonth()];
	};
	Date.prototype.getShortMonthName = function () {
	    return dateFormat.i18n.monthNames[this.getMonth()];
	};	
	Date.prototype.getWeek = function() {
	    var onejan = new Date(this.getFullYear(),0,1);
	    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
	};	
	
	Date.prototype.yesterday = function() {
		//var today = new Date();
        var millisecondsInADay = 86400000;
        var yesterday = new Date(this.getTime() - millisecondsInADay);
        return yesterday;
	};
	
	Date.prototype.tomorrow = function() {
		//var today = new Date();
        var millisecondsInADay = 86400000;
        var tomorrow = new Date(this.getTime() + millisecondsInADay);
        return tomorrow;
	};
	
	Date.prototype.dateFormat = function() {
		var s = this.dateFormatWithoutTime(); 
		s += ', ' + this.format(dateFormat.masks.shortTime);
		return s;
	};
	
	Date.prototype.dateFormatWithoutTime = function() {
		var s = '';
		var now = new Date();
		var yesterday = now.yesterday();
		var tomorrow = now.tomorrow();
		if (this.sameDateWith(now)) {
			s += 'Hôm nay';
		} else if (this.sameDateWith(yesterday)) {
			s += 'Hôm qua';
		} else if (this.sameDateWith(tomorrow)) {
			s += 'Ngày mai';
		} else s += this.getShortDayName();
		
		//s += this.getDate() + ' ' + this.getShortMonthName() + ' ' + this.getFullYear(); 
		//s += ', ' + this.format(dateFormat.masks.shortTime);
		return s;
	};
	
	Date.prototype.dateShortFormatWithoutTime = function() {
		var s = '';
		var now = new Date();
		var yesterday = now.yesterday();
		var tomorrow = now.tomorrow();
		if (this.getDate() == now.getDate() && this.getMonth() == now.getMonth() && this.getFullYear() == now.getFullYear()) {
			s += 'Hôm nay, ';
		} else if (this.getDate() == yesterday.getDate() && this.getMonth() == yesterday.getMonth() && this.getFullYear() == yesterday.getFullYear()) {
			s += 'Hôm qua, ';
		} else if (this.getDate() == tomorrow.getDate() && this.getMonth() == yesterday.getMonth() && this.getFullYear() == yesterday.getFullYear()) {
			s += 'Ngày mai, ';
		}
		s += this.getDayName() + ', ';		
		s += this.getDate() + ' ' + this.getShortMonthName() + " '" + String(this.getFullYear()).slice(2); 
		//s += ', ' + this.format(dateFormat.masks.shortTime);
		return s;
	};
	
	Date.prototype.sameDateWith = function(date){
		if (!date) return false;
		return (this.getDate() == date.getDate() &&
				this.getMonth() == date.getMonth() &&
				this.getFullYear() == date.getFullYear());
	};
	
	Date.prototype.sameMonthWith = function(date){
		if (!date) return false;
		return (this.getMonth() == date.getMonth() &&
				this.getFullYear() == date.getFullYear());
	};
	
	Date.prototype.formatForExpense = function() {
		return this.getDayName() + ', ' + this.shortDateFormat();
	};
	
	
	Date.prototype.tradeDateFormat = function() {
		var s = '';		
		s += this.getDate() + '.' + this.getMonthName().toLowerCase() + '.' + this.getFullYear();		
		return s;
	};
	
	Date.prototype.homeDateFormat = function() {
		var s = '';		
		s += this.getDayName().toUpperCase() + ', ' + this.getDate() + ' ' + this.getMonthName().toUpperCase() + ' ' + this.getFullYear();		
		return s;
	};
	
	Date.prototype.shortDateFormat2 = function() {
		var s = '';		
		s += this.getDate() + ' ' + this.getShortMonthName() + " '" + String(this.getFullYear()).slice(2); 		
		return s;
	};
	
	Date.prototype.getFirstAndLastDayOfWeek = function() {
		var startDay = 1; //0=sunday, 1=monday etc.
		var d = this.getDay(); //get the current day
		var weekStart = new Date(this.valueOf() - (d<=0 ? 7-startDay:d-startDay)*86400000); //rewind to start day
		var weekEnd = new Date(weekStart.valueOf() + 6*86400000); //add 6 days to get last day
		return {first: weekStart, last: weekEnd};
	};
	
	/**
	 * Number.prototype.format(n, x, s, c)
	 * 
	 * @param integer n: length of decimal
	 * @param integer x: length of whole part
	 * @param mixed   s: sections delimiter
	 * @param mixed   c: decimal delimiter
	 */
	Number.prototype.format = function(n, x, s, c) {
	    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
	        num = this.toFixed(Math.max(0, ~~n));
	    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
	};
		
	
