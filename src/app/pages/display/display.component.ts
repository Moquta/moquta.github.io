import { Component, OnInit } from '@angular/core';
import { Variable } from 'eslint-scope';

import {
  AdhanService,
  IAdhanApiCityParams,
  IPrayerTimesDayData,
  IPrayerTimesYearData,
} from 'src/app/services';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  today = new Date();
  now = new Date();
  todayPrayerData: IPrayerTimesDayData | null = null;
  prayerLocation: IAdhanApiCityParams | null = null;
  masjidName: any ;


  constructor(private adhanApi: AdhanService) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    const apiConfigDearborn: IAdhanApiCityParams = {
      city: 'Dearborn',
      state: 'MI',
      country: 'USA',
      method: 2,
      annual: true,
    };
    const setMasjidName: any = {
      name: 'American Moslem Society'
    }
    this.adhanApi
      .getPrayerTimesForYearByCity(apiConfigDearborn)
      .then((response) => {
        this.todayPrayerData =
          response.data[
            (this.today.getMonth() + 1) as keyof IPrayerTimesYearData
          ][this.today.getDate() - 1];
      });
      this.masjidName = setMasjidName
      this.prayerLocation = apiConfigDearborn;
      

  }
}
