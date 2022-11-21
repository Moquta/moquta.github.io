import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IMoqutaSettings, SettingsService } from 'src/app/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settings: IMoqutaSettings;
  prayerTimesTune: string[];

  @ViewChild('form', { static: true }) ngForm!: NgForm;
  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.getSettings();
    this.prayerTimesTune = this.settings.ApiParams.tune?.split(',') ?? [];
  }

  ngOnInit(): void {
    this.ngForm.form.valueChanges.subscribe((x) => {
      this.saveSettings();
    });
  }

  saveSettings(): void {
    if (this.settings) {
      this.settings.ApiParams.tune = this.prayerTimesTune.join(',');
      this.settingsService.saveSettings(this.settings);
    }
  }

  resetSettings(): void {
    this.settingsService.resetSettings();
    this.settings = this.settingsService.getSettings();
  }
}
