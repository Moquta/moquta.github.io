import { Injectable } from '@angular/core';
import { SETTINGS_KEY } from '../';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  cacheData<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      this.deleteCacheExceptSettings();
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  getCachedData(key: string): string | null {
    return localStorage.getItem(key);
  }

  deleteCachedDataValue(key: string): void {
    localStorage.removeItem(key);
  }

  deleteAllCachedData(): void {
    localStorage.clear();
  }

  deleteCacheExceptSettings(): void{
    let settings = this.getCachedData(SETTINGS_KEY)
    this.deleteAllCachedData();
    this.cacheData(SETTINGS_KEY, settings);
  }
}
