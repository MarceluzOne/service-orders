import { Component, OnInit } from '@angular/core';
import { LocalStorageService, StorageKeys } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public equipmentForm: 'client' | 'equipment' | 'employee' = 'equipment';
  public equipament: any;
  public statusMessenger: String = '';

  get isAdmin(){
    const admin = this.localStorage.get(StorageKeys.Profile)
    if(admin.role == 'ROLE_NORMAL'){
      return false
    }
    return true
  }
  public get registerTitle() {
    if (this.equipmentForm == 'client') {
      return 'Cadastro de Cliente'
    } if (this.equipmentForm == 'employee') {
      return 'Cadastro de Funcionário'
    }
    return 'Cadastro de Equipamento'
  };

  constructor(private localStorage: LocalStorageService) { }

  async ngOnInit() { }

}
