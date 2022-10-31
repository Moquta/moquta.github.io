import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AdhanService,
  IAdhanApiCityParams,
  IAdhanApiRepsonse,
  IPrayerTimesYearData,
} from 'src/app/services';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  prayerTimes: IAdhanApiRepsonse<IPrayerTimesYearData> | null = null;

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
    
    this.adhanApi
      .getHijriDate()
      .then((data) => console.log(data.month.ar, data.day, data.year));
  }

  getPrayerTimeData(
    apiParam: IAdhanApiCityParams
  ): IAdhanApiRepsonse<IPrayerTimesYearData> | null {
    const cacheKey = JSON.stringify(apiParam);

    let cachedData = this.cache.getCachedData(cacheKey);

    if (cachedData == null) {
      this.adhanApi
        .getPrayerTimesForYearByCity(apiParam)
        .subscribe((prayerTimes) => {
          this.cache.cacheData<IAdhanApiRepsonse<IPrayerTimesYearData>>(
            cacheKey,
            prayerTimes
          );
        });
    }

    return JSON.parse(
      this.cache.getCachedData(cacheKey) as string
    ) as IAdhanApiRepsonse<IPrayerTimesYearData>;
  }
}
