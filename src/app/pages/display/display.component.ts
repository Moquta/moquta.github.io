import { Component } from '@angular/core';

import * as dayjs from 'dayjs';

import {
  AdhanService,
  IAdhanApiParams,
  IMoqutaSettings,
  IPrayerTimesDayData,
  IPrayerTimesYearData,
  SettingsService,
} from 'src/app/services';

import { MONTHS_AR, DAYS_AR } from './display.data';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent {
  now = new Date();
  today = new Date();

  months = MONTHS_AR;
  days = DAYS_AR;

  settings: IMoqutaSettings;
  prayerData!: IPrayerTimesDayData;

  get progressbarValue(): number {
    return this.showCountdown
      ? 100 - (this.nextPrayerIqama.valueOf() - this.now.valueOf()) / 1200
      : 100;
  }

  // TODO? Is there a better, more efficient way to do this?
  get nextPrayerIndex(): number {
    let pIndex = 0;
    let currentTime: number = +dayjs(this.now).format('HHmm');

    if (this.prayerData) {
      if (
        currentTime <
        +this.format24HTime(
          this.prayerData.timings.Fajr,
          this.settings.iqamaOffset.Fajr + this.settings.adhkarOffset.Fajr,
          'HHmm'
        )
      ) {
        pIndex = 0;
      } else if (
        currentTime <
        +this.format24HTime(this.prayerData.timings.Sunrise, 30, 'HHmm')
      ) {
        pIndex = 1;
      } else if (
        currentTime <
        +this.format24HTime(
          this.prayerData.timings.Dhuhr,
          this.settings.iqamaOffset.Dhuhr + this.settings.adhkarOffset.Dhuhr,
          'HHmm'
        )
      ) {
        pIndex = 2;
      } else if (
        currentTime <
        +this.format24HTime(
          this.prayerData.timings.Asr,
          this.settings.iqamaOffset.Asr + this.settings.adhkarOffset.Asr,
          'HHmm'
        )
      ) {
        pIndex = 3;
      } else if (
        currentTime <
        +this.format24HTime(
          this.prayerData.timings.Maghrib,
          this.settings.iqamaOffset.Maghrib +
            this.settings.adhkarOffset.Maghrib,
          'HHmm'
        )
      ) {
        pIndex = 4;
      } else if (
        currentTime <
        +this.format24HTime(
          this.prayerData.timings.Isha,
          this.settings.iqamaOffset.Isha + this.settings.adhkarOffset.Isha,
          'HHmm'
        )
      ) {
        pIndex = 5;
      }
    } else {
      pIndex = 0;
    }

    return pIndex;
  }

  get nextPrayerIqama(): Date {
    let nextPrayerIqama = this.format24HTime(
      this.prayerData.timings.Fajr,
      this.settings.iqamaOffset.Fajr
    );
    const format = 'HH:mm';
    switch (this.nextPrayerIndex) {
      case 0:
        nextPrayerIqama = this.format24HTime(
          this.prayerData.timings.Fajr,
          this.settings.iqamaOffset.Fajr,
          format
        );
        break;
      case 1:
        nextPrayerIqama = this.prayerData.timings.Sunrise;
        break;
      case 2:
        nextPrayerIqama = this.format24HTime(
          this.prayerData.timings.Dhuhr,
          this.settings.iqamaOffset.Dhuhr,
          format
        );
        break;
      case 3:
        nextPrayerIqama = this.format24HTime(
          this.prayerData.timings.Asr,
          this.settings.iqamaOffset.Asr,
          format
        );
        break;
      case 4:
        nextPrayerIqama = this.format24HTime(
          this.prayerData.timings.Maghrib,
          this.settings.iqamaOffset.Maghrib,
          format
        );
        break;
      case 5:
        nextPrayerIqama = this.format24HTime(
          this.prayerData.timings.Isha,
          this.settings.iqamaOffset.Isha,
          format
        );
        break;
    }
    return new Date(
      dayjs(this.today).format('YYYY-MM-DD').toString() + ' ' + nextPrayerIqama
    );
  }

  get showCountdown(): boolean {
    return (
      dayjs(this.now).isBefore(dayjs(this.nextPrayerIqama)) &&
      dayjs(this.now).isAfter(
        dayjs(this.nextPrayerIqama).subtract(2, 'minutes')
      )
    );
  }

  constructor(
    private adhanApi: AdhanService,
    private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.getSettings();
    this.retrievePrayerTimes();

    setInterval(() => {
      this.now = new Date();
      // this.now = dayjs(this.now).add(1, 'second').toDate();

      if (this.today.getDate() !== this.now.getDate()) {
        this.today = this.now;
        this.retrievePrayerTimes();
      }
    }, 1000);
  }

  retrievePrayerTimes() {
    const apiConfig: IAdhanApiParams = this.settings.apiParams;

    this.adhanApi.fetchPrayerTimes(apiConfig).then((response) => {
      this.prayerData =
        response.data[
          (this.today.getMonth() + 1) as keyof IPrayerTimesYearData
        ][this.today.getDate() - 1];
    });
  }

  format24HTime(
    time: string,
    minutesToAdd: number = 0,
    format: string = 'hh:mm A'
  ): string {
    const adhanHM =
      dayjs(this.today).format('YYYY-MM-DD').toString() +
      ' ' +
      time.substring(0, 5);

    return dayjs(adhanHM).add(minutesToAdd, 'minute').format(format).toString();
  }
}
