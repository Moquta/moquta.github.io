import { Component, OnInit } from '@angular/core';

import * as dayjs from 'dayjs';

var duration = require('dayjs/plugin/duration');

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

  settings: IMoqutaSettings;
  prayerData!: IPrayerTimesDayData;

  constructor(
    private adhanApi: AdhanService,
    private settingsService: SettingsService
  ) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);

    this.settings = this.settingsService.getSettings();
    const apiConfig: IAdhanApiCityParams = this.settings.ApiParams;

    this.adhanApi.getPrayerTimesForYearByCity(apiConfig).then((response) => {
      this.prayerData =
        response.data[
          (this.today.getMonth() + 1) as keyof IPrayerTimesYearData
        ][this.today.getDate() - 1];
    });
  }

  calcIqamaTime(adhanTime: string, iqamahOffset: string): string {
    const adhanHM =
      dayjs(this.today).format('YYYY-MM-DD').toString() +
      ' ' +
      adhanTime.substring(0, 5); 
    return dayjs(adhanHM).add(+iqamahOffset, 'minute').format('hh:mm A').toString();
  }

  formatAdhanTime(adhanTime: string): string {
    const adhanHM =
      dayjs(this.today).format('YYYY-MM-DD').toString() +
      ' ' +
      adhanTime.substring(0, 5);
    return dayjs(adhanHM).format('hh:mm A').toString();
  }

  ngOnInit(): void {
  }
}
