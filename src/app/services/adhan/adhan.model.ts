export interface IAdhanApiCityParams extends IAdhanApiBaseParams {
  city: string;
  country: string;
  state: string;
}

export interface IAdhanApiAddressParams extends IAdhanApiBaseParams {
  address: string;
}

export interface IAdhanApiParams extends IAdhanApiBaseParams {
  latitude: string;
  longitude: string;
  timezonestring?: string;
}

// TODO: add interface documenation for parameters
export interface IAdhanApiBaseParams {
  method: number; // https://aladhan.com/calculation-methods
  annual?: boolean;
  hijriDateAdjustment?: number;
  iso8601?: boolean;
  latitudeAdjustmentMethod?: number;
  midnightMode?: number;
  month?: number;
  school?: number;
  tune?: string;
  year?: number;
}

export interface IPrayerTimesResponse<T> {
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

interface IDate {
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
