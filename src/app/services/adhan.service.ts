import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://api.aladhan.com/v1/';

const CURRENT_DATE = new Date();

const DEFAULT_API_VALUES = {
  annual: true,
  hijriDateAdjustment: 0,
  iso8601: false,
  latitudeAdjustmentMethod: 1,
  midnightMode: 0,
  month: CURRENT_DATE.getMonth(),
  school: 0,
  tune: '0,0,0,0,0,0,0,0,0',
  year: CURRENT_DATE.getFullYear()
}

export interface IAdhanApiConfigCity {
  city: string,
  country: string,
  method: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14, // https://aladhan.com/calculation-methods
  state: string,
  annual?: boolean,
  hijriDateAdjustment?: number,
  iso8601?: boolean
  latitudeAdjustmentMethod?: 1 | 2 | 3,
  midnightMode?: 0 | 1,
  month?: number,
  school?: 0 | 1,
  tune?: string,
  year?: number
};

interface IAnnualPrayerTimesResp {
  code: number,
  status: string
}

interface IDailyPrayerTimes {
  Fajr: string,
  Sunrise: string,
  Dhuhr: string,
  Asr: string,
  Sunset: string,
  Maghrib: string,
  Isha: string,
  Imsak: string,
  Midnight: string,
}

@Injectable({
  providedIn: 'root'
})
export class AdhanService {

  constructor(private http: HttpClient) { }

  getAnnualPrayerTimesForCity(apiConfig: IAdhanApiConfigCity): Observable<any> {
    const apiUrl = API_URL + 'calendarByCity';
    let adhanParameters = new HttpParams();

    for (let key of Object.keys(apiConfig)) {
      adhanParameters = adhanParameters.append(key, apiConfig[key as keyof IAdhanApiConfigCity] ?? '');
    }

    return this.http.get(apiUrl, { params: adhanParameters })
  }

  cacheData(key: string, data: any): void { }

  getCachedData(key: string): any { }
}
