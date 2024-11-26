import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export enum StorageKeys {
  Profile = 'storageprofile',
  Token = 'ostoken'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage|any;
  public profile: BehaviorSubject<any> = new BehaviorSubject<any>(false)

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

  public isLogged(){
    
  }
}
