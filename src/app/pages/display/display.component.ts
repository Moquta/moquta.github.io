import { Component } from '@angular/core';

import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';



import * as dayjs from 'dayjs';

import {
  AdhanService,
  IAdhanApiCityParams,
  IDailyPrayerTimes,
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
export class DisplayComponent {
  now = new Date;

  today = new Date();

  settings: IMoqutaSettings;
  prayerData!: IPrayerTimesDayData;

  mode: ProgressSpinnerMode = 'determinate';
  
  get progressbarValue(): number{
    if (this.showCountdown){
      return (100 - ((this.nextPrayerIqama.valueOf() - this.now.valueOf())/120000)*100);
      
    }
    else
      return 100; 
  }


  // TODO? Is there a better, more efficient way to do this?
  get nextPrayerIndex(): number {
    let pIndex = 0;
    let currentTime: number = +dayjs(this.now).format('HHmm');

    if (
      currentTime <
      +this.calcIqamaTime(
        this.prayerData.timings.Fajr,
        this.settings.IqamaTimings.Fajr + this.settings.AdhkarTimings.Fajr,
        'HHmm'
      )
    ) {
      pIndex = 0;
    } else if (
      currentTime <
      +this.calcIqamaTime(this.prayerData.timings.Sunrise, 30, 'HHmm')
    ) {
      pIndex = 1;
    } else if (
      currentTime <
      +this.calcIqamaTime(
        this.prayerData.timings.Dhuhr,
        this.settings.IqamaTimings.Dhuhr + this.settings.AdhkarTimings.Dhuhr,
        'HHmm'
      )
    ) {
      pIndex = 2;
    } else if (
      currentTime <
      +this.calcIqamaTime(
        this.prayerData.timings.Asr,
        this.settings.IqamaTimings.Asr + this.settings.AdhkarTimings.Asr,
        'HHmm'
      )
    ) {
      pIndex = 3;
    } else if (
      currentTime <
      +this.calcIqamaTime(
        this.prayerData.timings.Maghrib,
        this.settings.IqamaTimings.Maghrib +
          this.settings.AdhkarTimings.Maghrib,
        'HHmm'
      )
    ) {
      pIndex = 4;
    } else if (
      currentTime <
      +this.calcIqamaTime(
        this.prayerData.timings.Isha,
        this.settings.IqamaTimings.Isha + this.settings.AdhkarTimings.Isha,
        'HHmm'
      )
    ) {
      pIndex = 5;
    }

    return pIndex;
  }
  get nextPrayerTime(): string {
    let nextPrayerTime = this.prayerData.timings.Fajr;
    switch (this.nextPrayerIndex) {
      case 0:
        nextPrayerTime = this.prayerData.timings.Fajr;
        break;
      case 1:
        nextPrayerTime = this.prayerData.timings.Sunrise;
        break;
      case 2:
        nextPrayerTime = this.prayerData.timings.Dhuhr;
        break;
      case 3:
        nextPrayerTime = this.prayerData.timings.Asr;
        break;
      case 4:
        nextPrayerTime = this.prayerData.timings.Maghrib;
        break;
      case 5:
        nextPrayerTime = this.prayerData.timings.Isha;
        break;
    }
    return nextPrayerTime;
  }

  get nextPrayerIqama(): Date {
    let nextPrayerIqama = this.calcIqamaTime(
      this.prayerData.timings.Fajr,
      this.settings.IqamaTimings.Fajr
    );
    const format = 'HH:mm';
    switch (this.nextPrayerIndex) {
      case 0:
        nextPrayerIqama = this.calcIqamaTime(
          this.prayerData.timings.Fajr,
          this.settings.IqamaTimings.Fajr,
          format
        );
        break;
      case 1:
        nextPrayerIqama = this.prayerData.timings.Sunrise;
        break;
      case 2:
        nextPrayerIqama = this.calcIqamaTime(
          this.prayerData.timings.Dhuhr,
          this.settings.IqamaTimings.Dhuhr,
          format
        );
        break;
      case 3:
        nextPrayerIqama = this.calcIqamaTime(
          this.prayerData.timings.Asr,
          this.settings.IqamaTimings.Asr,
          format
        );
        break;
      case 4:
        nextPrayerIqama = this.calcIqamaTime(
          this.prayerData.timings.Maghrib,
          this.settings.IqamaTimings.Maghrib,
          format
        );
        break;
      case 5:
        nextPrayerIqama = this.calcIqamaTime(
          this.prayerData.timings.Isha,
          this.settings.IqamaTimings.Isha,
          format
        );
        break;
    }
    return new Date(dayjs(this.today).format('YYYY-MM-DD').toString() + ' ' + nextPrayerIqama)
  }

  get showCountdown(): boolean {
 
    return (
      dayjs(this.now).isBefore(dayjs(this.nextPrayerIqama)) &&
      dayjs(this.now).isAfter(dayjs(this.nextPrayerIqama).subtract(2, 'minutes'))
    );
    //dayjs(nextIqamaDate).toDate().valueOf() - this.now.valueOf()
  }

  constructor(
    private adhanApi: AdhanService,
    private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.getSettings();
    this.retrievePrayerTimes();

    setInterval(() => {
      //this.now = dayjs(this.now).add(5, 'second').toDate();
      this.now = new Date();
      if (this.today.getDate() !== this.now.getDate()) {
        this.today = this.now;
        this.retrievePrayerTimes();
      }
    }, 1000);
  }

  retrievePrayerTimes() {
    const apiConfig: IAdhanApiCityParams = this.settings.ApiParams;

    this.adhanApi.getPrayerTimesForYearByCity(apiConfig).then((response) => {
      this.prayerData =
        response.data[
          (this.today.getMonth() + 1) as keyof IPrayerTimesYearData
        ][this.today.getDate() - 1];
    });
  }

  // TODO? should we make this generic (add minutes to time function instead of calcIqamaTime)
  calcIqamaTime(
    adhanTime: string,
    iqamahOffset: number,
    format: string = 'hh:mm A'
  ): string {
    const adhanHM =
      dayjs(this.today).format('YYYY-MM-DD').toString() +
      ' ' +
      adhanTime.substring(0, 5);

    return dayjs(adhanHM).add(iqamahOffset, 'minute').format(format).toString();
  }

  // TODO? should we turn this into a pipe instead?
  formatAdhanTime(adhanTime: string, format: string = 'hh:mm A'): string {
    const adhanHM =
      dayjs(this.today).format('YYYY-MM-DD').toString() +
      ' ' +
      adhanTime.substring(0, 5);

    return dayjs(adhanHM).format(format).toString();
  }
}
