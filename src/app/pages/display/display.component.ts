import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AdhanService,
  IAdhanApiCityParams,
  IPrayerTimesResponse,
  IPrayerTimesYearData,
} from 'src/app/service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  prayerTimes: IPrayerTimesResponse<IPrayerTimesYearData> | null = null;

  constructor(private adhanApi: AdhanService) {}

  ngOnInit(): void {
    const apiConfigDearborn: IAdhanApiCityParams = {
      city: 'Dearborn',
      state: 'MI',
      country: 'USA',
      method: 2,
      annual: true,
    };

    const adhanData$: Observable<IPrayerTimesResponse<IPrayerTimesYearData>> =
      this.adhanApi.getPrayerTimesForYearByCity(apiConfigDearborn);

    adhanData$.subscribe((val) => {
      this.prayerTimes = val;
      console.log(this.prayerTimes);
    });
  }
}
