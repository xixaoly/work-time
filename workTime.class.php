<?php
/**
 * Difference between two dates without public holidays and weekend
 * @copyright (c) 2014, Adam Hladik (hladamek@centrum.cz)
**/

class WorkTime{
	const SECOND = 1,
		   MINUTE = 60,
		   HOUR = 3600,
		   DAY = 86400;
	
	/** var array weekend*/
	public static $weekend = array(6,7);

	/** var array public holidays without easter | @version 2014 Czech */
	public static $publicHolidaysWTHeaster = array("1.1.", "1.5.", "8.5.", "5.7.", "6.7.", "28.9.", "28.10.", "17.11.", "24.12.", "25.12.", "26.12.");
	
	/** var array counted easter storage*/
	private static $generatedEasterMondays = array();
	
	/**
	 * Difference between two timestamp without public holidays and weekend
	 * @param int $startTimeStamp | timestamp
	 * @param int $endTimestamp | timestamp
	 * @return int | second
	 */
	public static function difference($startTimeStamp, $endTimestamp){
		if($endTimestamp<=$startTimeStamp)
			return 0;
		
		$differenceAll = $endTimestamp-$startTimeStamp; //total difference in seconds
		
		//dayoffs
		$dayOffsMintes = 0;
		for($i  = $startTimeStamp; $i<$endTimestamp; $i+=self::DAY){
			if(in_array(date("j.n.",$i), self::$publicHolidaysWTHeaster) or
				in_array(date("N",$i), self::$weekend) or
				date("j.n.",$i) == date("j.n.", self::easternMondays(date("Y", $i))))
				$dayOffsMintes+= self::DAY;
		}
		
		//total difference - dayoffs
		return $differenceAll-$dayOffsMintes;
	}
	
	/**
	 * Difference between current timestamp and set timestamp without public holidays and weekend
	 * @param int $endTimestamp | timestamp
	 * @return int | second
	 */
	public static function currentDifference($endTimestamp){
		return self::difference(time(), $endTimestamp);
	}
	
	/**
	 * Stamp formating
	 * self::format(self::DAY, self::HOUR); returning that day has 24 hours
	 * @param int $stamp
	 * @param int $format
	 * @return int
	 */
	public static function format($stamp, $format){
		return floor($stamp/$format);
	}
	
	/**
	 * returning eastern monday for set year
	 * @param int $year
	 * @return int | timestamp
	 */
	public static function easternMondays($year){
		if(!isset(self::$generatedEasterMondays[$year]))
			self::$generatedEasterMondays[$year] = easter_date($year) + self::DAY;
		return self::$generatedEasterMondays[$year];
	}
}
?>
