import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdhanService, IAdhanApiConfigCity } from 'src/app/services/adhan.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  prayerTimes: any;

  constructor(private adhanApi: AdhanService) { }

  ngOnInit(): void {
    const apiConfigDearborn: IAdhanApiConfigCity = {
      city: 'Dearborn',
      state: 'MI',
      country: 'USA',
      method: 2,
      annual: true
    }

    const adhanData: Observable<any> = this.adhanApi.getAnnualPrayerTimesForCity(apiConfigDearborn);

    adhanData.subscribe(val =>
      this.prayerTimes = val)
  }
}
