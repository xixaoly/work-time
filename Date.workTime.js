/**
 * Date object add-on for working time length in minutes
 * @copy 2014 Adam Hladik (hladamek@centrum.cz)
 */

Date.prototype.workTime = function(endDate, cusomise){
	var option = {
		publicHolidays: [],
		endDateFormat: null,
		publicHolidaysFormat: null,
		weekend: [0,6]
	};
	var minutes = 0;	//result minutes
	
	//customise
	if(typeof cusomise === "object"){
		for(var prop in cusomise){
			option[prop] = cusomise[prop];
		}
	}
	
	//in format handler
	if(typeof option.endDateFormat === "function"){
		endDate = option.endDateFormat(endDate);
	}
	
	//check instance of end date
	if(endDate instanceof Date === false){
		console.log("endDate is not instanceof Date, use inFormat handler");
		return;
	}

	while(this <= endDate){
		//public holidays array support
		//days difference in minutes
		if(option.publicHolidays instanceof Array){
			//holidays array format
			var date = this;
			if(typeof option.publicHolidaysFormat === "function"){
				date = option.publicHolidaysFormat(date);
			}

			if(option.weekend.indexOf(this.getDay()) === -1 && option.publicHolidays.indexOf(date) === -1){
				minutes+= 1440;
			}
		}else{
			if(option.weekend.indexOf(this.getDay()) === -1){
				minutes+= 1440;
			}
		}

		//iterate day
		this.setDate(this.getDate()+1);
	}

	//times difference
	if(minutes>0){
		minutes-= 1440 + ((this.getHours()-endDate.getHours())*60) + this.getMinutes()-endDate.getMinutes();
	}

	return minutes;
};
