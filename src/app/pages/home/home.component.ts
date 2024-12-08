import { Component, OnInit } from '@angular/core';
import { LocalStorageService, StorageKeys } from 'src/app/services/local-storage/local-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public serviceOrders: any;
  public typeList: 'clients' | 'employees' | 'equipments' = 'employees';
  public buttonStyleSelected: string = 'border-b-4 border-blue-800 rounded-md w-full';
  public buttonStyle: string = 'rounded-md w-full';
  public dropdownOpen: boolean = false; 

  get isAdmin(){
    const admin = this.localStorage.get(StorageKeys.Profile)
    if(admin.role == 'ROLE_NORMAL'){
      return false
    }
    return true
  }

  constructor(private localStorage: LocalStorageService) { }

  async ngOnInit() { }
  public toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Seleciona o tipo da lista e fecha o dropdown
  public typeListSelect(type: 'clients' | 'employees' | 'equipments'): void {
    this.typeList = type;
    this.dropdownOpen = false;
  }

}
