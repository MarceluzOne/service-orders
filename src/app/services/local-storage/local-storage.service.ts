import { Injectable } from '@angular/core';


export enum StorageKeys {
  Profile = 'storageprofile',
  Token = 'ostoken'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage | any;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: StorageKeys, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (this.storage) {
      return JSON.parse(this.storage.getItem(key));
    }
    return null;
  }

  remove(key: StorageKeys): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }
}
