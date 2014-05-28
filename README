#javascript Date object adds-on

Simple adds-on for Date object

  - Sum minutes between two dates in work days
  - Customisable
  - Support Date formats I/O
  - Czech public holidays map
  - PHP version

##Version
0.1

##Usage
Sum work time (in minutes) between current datetime and 2020-12-31 10:30
```javascript
var date = new Date();
date.workTime(new Date(2020,11,31,10,30,0,0));
```

Sum work time (in minutes) between 2014-05-01 10:00 and 2020-12-31 10:30
```javascript
var date = new Date(2014,4,1,10,0,0,0);
date.workTime(new Date(2020,11,31,10,30,0,0));
```

###Customise
Set public holidays
```javascript
var date = new Date();
date.workTime(new Date(2020,11,31,10,30,0,0),{
  publicHolidays: ['24.12.'],
  publicHolidaysFormat: function(date){return date.getDate() + "." + (date.getMonth()+1) + ".";}
});
```

Set callback for input Date format
```javascript
var date = new Date();
date.workTime(['1.10.2020','10:50']),{
  publicHolidays: ['24.12.'],
  publicHolidaysFormat: function(date){return date.getDate() + "." + (date.getMonth()+1) + ".";},
  endDateFormat: function(dateTime){
    var datePparts = dateTime[0].split(".");
    var timeParts = dateTime[1].split(":");
    return new Date(datePparts[2], datePparts[1]-1, datePparts[0], timeParts[0], timeParts[1]);
  }
});
```

Set weekend
```javascript
var date = new Date();
date.workTime(new Date(2020,11,31,10,30,0,0),{
  weekend: [0,6]  //is default
});
```

##Public holidays
Public holidays array - version for Czech Republic in 2014
```javascript
var date = new Date();
var publicHolidays = date.publicHolidays(); // publicHolidays = [new Date(2014,0,1), new Date(2014,3,21)*,...];
```
*easter date is floating date - is automatical recounted for every year

Formated output with callback
```javascript
var date = new Date();
var publicHolidays = date.publicHolidays(function(date){
  return date.publicHolidays();
}); // publicHolidays = ['1.1.2014','21.4.2014',...];
```

Is current date public holiday
```javascript
var actualDate = new Date();
var publicHolidays = date.isPublicHoliday(); // probably false

var setDate = new Date(2020,0,1);  //2020-01-01
var publicHolidays = date.isPublicHoliday(); // true
```
##PHP version
Similar function for PHP
```php
$a = WorkTime::currentDifference(strtotime("1.1.2020 15:50")); //return difference in seconds
$b = WorkTime::format($a, WorkTime::DAY); //return same difference in days
```

##What next?
  - customise work time
