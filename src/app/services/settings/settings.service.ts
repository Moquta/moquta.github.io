import { Injectable } from '@angular/core';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { DEFAULT_API_VALUES } from '../adhan/adhan.service';
import { IMoqutaSettings } from './settings.model';

const DEFAULT_SETTINGS: IMoqutaSettings = {
  additionalInfo: ['Arabic Khutbah:\t\t\t12:00PM', 'English Khutbah:\t\t\t1:00PM'],
  adhkarOffset: {
    Fajr: 15,
    Dhuhr: 8,
    Asr: 8,
    Maghrib: 8,
    Isha: 8,
  },
  apiParams: {
    ...DEFAULT_API_VALUES,
    city: 'Dearborn',
    state: 'MI',
    country: 'USA',
  },
  iqamaOffset: {
    Fajr: 15,
    Dhuhr: 10,
    Asr: 10,
    Maghrib: 5,
    Isha: 5,
  },
  masjidSubheader: 'Dearborn, MI',
  masjidLogoSrc: 'assets/logo.png',
  masjidName: 'American Moslem Society (Masjid Dearborn)',
  masjidPrimaryColor: '#650a13',
  masjidSecondaryColor: '#ffffff',
  language: 'en'
};

export const SETTINGS_KEY = 'MoqutaSettings';
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private cache: LocalStorageService) {}

  saveSettings(settings: Partial<IMoqutaSettings>): void {
    this.cache.cacheData(SETTINGS_KEY, settings);
  }

  getSettings(): IMoqutaSettings {
    let cachedSettings: Partial<IMoqutaSettings> = JSON.parse(
      this.cache.getCachedData(SETTINGS_KEY) as string
    );

    return { ...DEFAULT_SETTINGS, ...cachedSettings };
  }

  resetSettings(): void {
    this.cache.deleteCachedDataValue(SETTINGS_KEY);
  }
}
