import { Component, OnInit } from '@angular/core';

import {
  AdhanService,
  IAdhanApiCityParams,
  IMoqutaSettings,
  IPrayerTimesDayData,
  IPrayerTimesYearData,
  SettingsService,
} from 'src/app/services';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  now = new Date();
  today = new Date();
  
  settings?: IMoqutaSettings;
  todayPrayerData?: IPrayerTimesDayData;

  constructor(
    private adhanApi: AdhanService,
    private settingsService: SettingsService
  ) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();

    const apiConfig: IAdhanApiCityParams = this.settings.ApiParams;

    this.adhanApi.getPrayerTimesForYearByCity(apiConfig).then((response) => {
      this.todayPrayerData =
        response.data[
          (this.today.getMonth() + 1) as keyof IPrayerTimesYearData
        ][this.today.getDate() - 1];
    });
  }
}
