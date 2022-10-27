import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  cacheData<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
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
}
