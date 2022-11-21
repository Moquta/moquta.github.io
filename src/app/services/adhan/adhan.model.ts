/**
 * @param adjustment Number of days to adjust hijri date(s). Example: 1 or 2 or -1 or -2
 * @param annual Whether the API should get data for the entire year (true) or just the month (false)
 * @param iso8601 Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56
 * @param latitudeAdjustmentMethod Method for adjusting times higher latitudes - for instance, if you are checking timings in the UK or Sweden. 1 - Middle of the Night OR 2 - One Seventh OR 3 - Angle Based
 * @param method A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-12 and 99, as specified here https://aladhan.com/calculation-methods
 * @param midnightMode 0 for Standard (Mid Sunset to Sunrise), 1 for Jafari (Mid Sunset to Fajr). If you leave this empty, it defaults to Standard.
 * @param month A gregorian calendar month. Example: 8 or 08 for August.
 * @param school 0 for Shafi (or the standard way), 1 for Hanafi. If you leave this empty, it defaults to Shafii.
 * @param shafaq Which Shafaq to use if the method is Moonsighting Commitee Worldwide. Acceptable options are 'general', 'ahmer' and 'abyad'. Defaults to 'general'.
 * @param tune Comma Separated String of integers to offset timings returned by the API in minutes. Accepts 9 comma separated numbers for (imsak, fajr, sunrise, dhuhr, asr, maghrib, sunset, isha, midnight)
 * @param year A gregorian calendar year. Example: 2022.
 */
export interface IAdhanApiBaseParams {
  adjustment?: number;
  annual?: boolean;
  iso8601?: boolean;
  latitudeAdjustmentMethod?: number;
  method?: number;
  midnightMode?: number;
  month?: number;
  school?: number;
  shafaq?: string;
  tune?: string;
  year?: number;
}

/**
 * @param
 */
export interface IAdhanApiCityParams extends IAdhanApiBaseParams {
  city: string;
  country: string;
  state: string;
}

/**
 * @param address An address string. Example: 1420 Austin Bluffs Parkway, Colorado Springs, CO OR 25 Hampstead High Street, London, NW3 1RL, United Kingdom OR Sultanahmet Mosque, Istanbul, Turkey
 */
export interface IAdhanApiAddressParams extends IAdhanApiBaseParams {
  address: string;
}

/**
 * @param latitude The decimal value for the latitude co-ordinate of the location you want the time computed for. Example: 51.75865125
 * @param longitude  The decimal value for the longitude co-ordinate of the location you want the time computed for. Example: -1.25387785
 * @param timezonestring A valid timezone name as specified on http://php.net/manual/en/timezones.php . Example: Europe/London. If you do not specify this, we'll calcuate it using the co-ordinates you provide.
 */
export interface IAdhanApiParams extends IAdhanApiBaseParams {
  latitude: string;
  longitude: string;
  timezonestring?: string;
}

export interface IAdhanApiRepsonse<T> {
  code: number;
  data: T;
  status: string;
}

export interface IPrayerTimesYearData {
  1: IPrayerTimesMonthData;
  2: IPrayerTimesMonthData;
  3: IPrayerTimesMonthData;
  4: IPrayerTimesMonthData;
  5: IPrayerTimesMonthData;
  6: IPrayerTimesMonthData;
  7: IPrayerTimesMonthData;
  8: IPrayerTimesMonthData;
  9: IPrayerTimesMonthData;
  10: IPrayerTimesMonthData;
  11: IPrayerTimesMonthData;
  12: IPrayerTimesMonthData;
}

type IPrayerTimesMonthData = IPrayerTimesDayData[];

export interface IPrayerTimesDayData {
  date: {
    gregorian: IDate;
    hijri: IDate;
    readable: string;
    timestamp: string;
  };
  meta: {
    latitude: number;
    longitude: number;
    latitudeAdjustmentMethod: string;
    method: {
      id: number;
      name: string;
    };
    midnightMode: string;
    offset: {
      Fajr: number;
      Sunrise: number;
      Dhuhr: number;
      Asr: number;
      Sunset: number;
      Maghrib: number;
      Isha: number;
      Imsak: number;
      Midnight: number;
    };
    school: string;
    timezone: string;
  };
  timings: IDailyPrayerTimes;
}

export interface IDateData {
  hijri: IDate;
  gregorian: IDate;
}

export interface IDate {
  date: string;
  day: string;
  designation: {
    abbreviated: string;
    expanded: string;
  };
  format: string;
  month: {
    number: number;
    en: string;
    ar?: string;
  };
  weekday: {
    en: string;
    ar?: string;
  };
  year: string;
}

export interface IDailyPrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}
