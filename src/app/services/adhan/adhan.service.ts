import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  IAdhanApiCityParams,
  IAdhanApiRepsonse,
  IPrayerTimesYearData,
  IDateData,
  IDate,
} from './adhan.model';

const API_BASE_URL = 'http://api.aladhan.com/v1/';

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
  year: CURRENT_DATE.getFullYear(),
};

@Injectable({
  providedIn: 'root',
})
export class AdhanService {
  constructor(private http: HttpClient) {}

  /**
   * @function getPrayerTimesForYearByCity
   * @param apiParams Configures the parameters - listed in {@link IAdhanApiCityParams} - to be sent with the API call.
   * @returns Observable containing prayer times for the entire year specified in the parameters.
   */
  getPrayerTimesForYearByCity(
    apiParams: IAdhanApiCityParams
  ): Observable<IAdhanApiRepsonse<IPrayerTimesYearData>> {
    // Start with default values and then overwrite with given values
    // Set annual to 'true' because annual data is promised
    apiParams = { ...DEFAULT_API_VALUES, ...apiParams };
    apiParams.annual = true;

    const apiUrl = API_BASE_URL + 'calendarByCity';
    let adhanParameters = new HttpParams();

    for (let key of Object.keys(apiParams)) {
      adhanParameters = adhanParameters.append(
        key,
        apiParams[key as keyof IAdhanApiCityParams] ?? ''
      );
    }

    return this.http.get(apiUrl, { params: adhanParameters }) as Observable<
      IAdhanApiRepsonse<IPrayerTimesYearData>
    >;
  }

  /**
   * @function getHijriDate
   * @param gregorianDate The gregorian date to convert to hijri - will default to current day
   * @param hijriDateAdjustment Number of days to adjust hijri date(s). Example: 1 or 2 or -1 or -2
   * @returns Promise containing the hjri date
   */
  async getHijriDate(
    gregorianDate: Date = new Date(),
    hijriDateAdjustment: number = 0
  ): Promise<IDate> {
    const formattedDate = `${gregorianDate.getDate()}-${gregorianDate.getMonth()}-${gregorianDate.getFullYear()}`;
    const apiUrl =
      API_BASE_URL +
      'gToH?' +
      new URLSearchParams({
        date: formattedDate,
        adjustment: hijriDateAdjustment.toString(),
      });

    let hijriDate: IAdhanApiRepsonse<IDateData> = await (
      await fetch(apiUrl)
    ).json();

    return hijriDate.data.hijri;
  }
}
