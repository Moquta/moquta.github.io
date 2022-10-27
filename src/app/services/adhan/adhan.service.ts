import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  IAdhanApiCityParams,
  IPrayerTimesResponse,
  IPrayerTimesYearData,
} from './adhan.model';

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
  year: CURRENT_DATE.getFullYear(),
};

@Injectable({
  providedIn: 'root',
})
export class AdhanService {
  constructor(private http: HttpClient) {}

  /**
   * @author Anwar Musa, Elyas Musa
   * @param apiParams Configures the parameters - listed in {@link IAdhanApiCityParams} - to be sent with the API call.
   * @returns Prayer times for the entire year specified in the parameters.
   */
  getPrayerTimesForYearByCity(
    apiParams: IAdhanApiCityParams
  ): Observable<IPrayerTimesResponse<IPrayerTimesYearData>> {
    // Start with default values and then overwrite with given values
    // Set annual to 'true' because annual data is promised
    apiParams = { ...DEFAULT_API_VALUES, ...apiParams };
    apiParams.annual = true;

    const apiUrl = API_URL + 'calendarByCity';
    let adhanParameters = new HttpParams();

    for (let key of Object.keys(apiParams)) {
      adhanParameters = adhanParameters.append(
        key,
        apiParams[key as keyof IAdhanApiCityParams] ?? ''
      );
    }

    return this.http.get(apiUrl, { params: adhanParameters }) as Observable<
      IPrayerTimesResponse<IPrayerTimesYearData>
    >;
  }
}
