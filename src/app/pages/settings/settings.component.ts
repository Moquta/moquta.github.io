import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { debounceTime, Subscription } from 'rxjs';

import { IMoqutaSettings, SettingsService } from 'src/app/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  formChanges$?: Subscription;
  settings: IMoqutaSettings;
  prayerTimesTune: string[];
  additionalInfo: { value: string }[];

  @ViewChild('form', { static: true }) ngForm!: NgForm;
  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.getSettings();
    this.prayerTimesTune = this.settings.apiParams.tune?.split(',') ?? [];
    this.additionalInfo = this.settings.additionalInfo.map((value) => ({
      value,
    }));
  }

  ngOnInit(): void {
    this.formChanges$ = this.ngForm.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.saveSettings();
      });

      console.log(this.settings);
  }

  ngOnDestroy(): void {
    this.formChanges$?.unsubscribe();
  }

  getLatLong(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.settings.apiParams.latitude = position.coords.latitude;
        this.settings.apiParams.longitude = position.coords.longitude;
      });
    }
  }

  saveSettings(): void {
    if (this.settings) {
      this.settings.apiParams.tune = this.prayerTimesTune.join(',');
      this.settings.additionalInfo = this.additionalInfo.map(
        (value) => value.value
      );
      this.settingsService.saveSettings(this.settings);
    }
  }

  resetSettings(): void {
    this.settingsService.resetSettings();
    this.settings = this.settingsService.getSettings();
  }
}
