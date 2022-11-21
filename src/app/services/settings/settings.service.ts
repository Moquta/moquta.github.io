import { Injectable } from '@angular/core';
import { DEFAULT_API_VALUES } from '../adhan/adhan.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { IMoqutaSettings } from './settings.model';

const DEFAULT_SETTINGS: IMoqutaSettings = {
  AdditionalInfo: ['Arabic Khutbah:\t\t12:00', 'English Khutbah:\t\t1:00'],
  AdhkarTimings: {
    Fajr: '15',
    Dhuhr: '8',
    Asr: '8',
    Maghrib: '8',
    Isha: '8',
  },
  ApiParams: {
    ...DEFAULT_API_VALUES,
    city: 'Dearborn',
    state: 'MI',
    country: 'USA',
  },
  IqamaTimings: {
    Fajr: '15',
    Dhuhr: '10',
    Asr: '10',
    Maghrib: '5',
    Isha: '5',
  },
  MasjidSubheader: 'Dearborn, MI',
  MasjidLogoSrc: 'assets/logo.png',
  MasjidName: 'American Moslem Society (Masjid Dearborn)',
  MasjidPrimaryColor: '#ffffff',
  MasjidSecondaryColor: '#000000',
};

const SETTINGS_KEY = 'MoqutaSettings';
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
