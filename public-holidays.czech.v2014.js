/**
 * Public holidays in Czech Republic
 * Svatky v Ceske Republice
 * @version 2014
 * @copy 2014 Adam Hladik (hladamek@centrum.cz)
 */

/**
 * returning public holidays
 * @param {function} cb formating callback - variable
 */
Date.prototype.publicHolidays = function(cb){
	var easter = function(Y) {
		var padout = function(number) {
			return (number < 10) ? '0' + number : number;
		};
		
		var C = Math.floor(Y/100);
		var N = Y - 19*Math.floor(Y/19);
		var K = Math.floor((C - 17)/25);
		var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
		I = I - 30*Math.floor((I/30));
		I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
		var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
		J = J - 7*Math.floor(J/7);
		var L = I - J;
		var M = 3 + Math.floor((L + 40)/44);
		var D = L + 28 - 31*Math.floor(M/4);

		return new Date(Y,padout(M)-1, padout(D));
	};

	var currentYear = new Date().getFullYear();
	var currentEaster = easter(currentYear);
	var dates = [
		new Date(currentYear,0,1),
		new Date(currentEaster.getTime() + (24 * 60 * 60 * 1000)),
		new Date(currentYear,4,1),
		new Date(currentYear,4,8),
		new Date(currentYear,5,5),
		new Date(currentYear,5,6),
		new Date(currentYear,8,28),
		new Date(currentYear,9,28),
		new Date(currentYear,10,17),
		new Date(currentYear,11,24),
		new Date(currentYear,11,25),
		new Date(currentYear,11,26)
	];

	if(typeof cb === "function"){
		var formated = [];
		for(var i in dates){
			formated[i] = cb(dates[i]);
		}
		return formated;
	}else{
		return dates;
	}
};

/**
 * Returning if instance of Date is public day
 */
Date.prototype.isPublicHoliday = function(){
	return this.publicHolidays(function(date){return date.toLocaleDateString();}).indexOf(this.toLocaleDateString()) > -1;
};
