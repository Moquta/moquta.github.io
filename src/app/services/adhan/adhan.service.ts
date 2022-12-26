import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  IAdhanApiRepsonse,
  IPrayerTimesYearData,
  IAdhanApiBaseParams,
  IAdhanApiParams,
} from './adhan.model';

const API_BASE_URL = 'https://api.aladhan.com/v1/';

const CURRENT_DATE = new Date();

export const DEFAULT_API_VALUES: IAdhanApiBaseParams = {
  adjustment: 0,
  annual: true,
  iso8601: false,
  latitudeAdjustmentMethod: 1,
  method: "2",
  midnightMode: 0,
  month: CURRENT_DATE.getMonth(),
  school: "0",
  tune: '0,0,0,0,0,0,0,0,0',
  year: CURRENT_DATE.getFullYear(),
};

@Injectable({
  providedIn: 'root',
})
export class AdhanService {
  constructor(private cache: LocalStorageService) {}

  /**
   * @function fetchPrayerTimes
   * @param apiParams Configures the parameters - listed in {@link IAdhanApiParams} - to be sent with the API call.
   * @returns Promise containing prayer times for the entire year specified in the parameters.
   */
  async fetchPrayerTimes(
    apiParams: IAdhanApiParams
  ): Promise<IAdhanApiRepsonse<IPrayerTimesYearData>> {
    apiParams = { ...DEFAULT_API_VALUES, ...apiParams };
    apiParams.annual = true;

    const apiUrl =
      API_BASE_URL +
      'calendar?' +
      new URLSearchParams(JSON.parse(JSON.stringify(apiParams)));

    let cachedPrayerData = this.cache.getCachedData(apiUrl);

    if (cachedPrayerData == null) {
      await fetch(apiUrl)
        .then((res) => res.json())
        .then((data: IAdhanApiRepsonse<IPrayerTimesYearData>) =>
          this.cache.cacheData<IAdhanApiRepsonse<IPrayerTimesYearData>>(
            apiUrl,
            data
          )
        );
    }

    let prayerTimesData: IAdhanApiRepsonse<IPrayerTimesYearData> = JSON.parse(
      this.cache.getCachedData(apiUrl) as string
    );

    return Promise.resolve(prayerTimesData);
  }
}
