import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AdhanService,
  IAdhanApiCityParams,
  IPrayerTimesResponse,
  IPrayerTimesYearData,
} from 'src/app/services';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  prayerTimes: IPrayerTimesResponse<IPrayerTimesYearData> | null = null;

  constructor(
    private adhanApi: AdhanService,
    private cache: LocalStorageService
  ) {}

  ngOnInit(): void {
    // TODO check and delete cache on january first

    const apiConfigDearborn: IAdhanApiCityParams = {
      city: 'Dearborn',
      state: 'MI',
      country: 'USA',
      method: 2,
      annual: true,
    };

    this.prayerTimes = this.getPrayerTimeData(apiConfigDearborn);
  }

  getPrayerTimeData(
    apiParam: IAdhanApiCityParams
  ): IPrayerTimesResponse<IPrayerTimesYearData> | null {
    let prayerTimesData: IPrayerTimesResponse<IPrayerTimesYearData> | null =
      null;
    const cacheKey = JSON.stringify(apiParam);

    let cachedData = this.cache.getCachedData(cacheKey);

    if (cachedData != null) {
      prayerTimesData = JSON.parse(
        cachedData
      ) as IPrayerTimesResponse<IPrayerTimesYearData>;
    } else {
      this.adhanApi
        .getPrayerTimesForYearByCity(apiParam)
        .subscribe((prayerTimes) => {
          this.cache.cacheData<IPrayerTimesResponse<IPrayerTimesYearData>>(
            cacheKey,
            prayerTimes
          );
          prayerTimesData = prayerTimes;
        });
    }

    return prayerTimesData;
  }
}
