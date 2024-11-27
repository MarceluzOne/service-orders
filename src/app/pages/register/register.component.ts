import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  constructor(private authService: AuthService) { }

  async ngOnInit() { }

}
