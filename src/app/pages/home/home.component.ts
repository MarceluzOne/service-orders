import { Component, OnInit } from '@angular/core';
import { LocalStorageService, StorageKeys } from 'src/app/services/local-storage/local-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public serviceOrders: any;
  public typeList: 'clients' | 'employees' | 'equipments' = 'equipments';
  public buttonStyleSelected: string = 'border-b-4 border-blue-800 rounded-md w-full';
  public buttonStyle: string = 'rounded-md w-full';

  get isAdmin(){
    const admin = this.localStorage.get(StorageKeys.Profile)
    if(admin.role == 'ROLE_NORMAL'){
      return false
    }
    return true
  }

  constructor(private localStorage: LocalStorageService) { }

  async ngOnInit() { }
  public typeListSelect(type: 'clients' | 'employees' | 'equipments') {
    const style = 'border-b-4 text-md border-blue-800 rounded-md w-full'
    
    if (type === 'clients') {
      this.typeList = type
      return this.buttonStyleSelected = style
    }
    if (type === 'equipments') {
      this.typeList = type
      return this.buttonStyleSelected = style
    }
    this.typeList = type
    return this.buttonStyleSelected = style
  }

}
