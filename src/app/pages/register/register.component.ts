import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { EmployeeService } from 'src/app/services/emploee/emploee.service';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isAdmin: Boolean = true;
  public equipmentForm: 'client' | 'equipment' | 'employee' = 'equipment';
  public equipament: any;
  public statusMessenger: String = '';


  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  
  public get registerTitle(){
    if(this.equipmentForm == 'client'){
      return 'Cadastro de Cliente'
    }if(this.equipmentForm == 'employee'){
      return 'Cadastro de Funcionário'
    }
    return 'Cadastro de Equipamento'
  };

  constructor(
    private fb: FormBuilder,
    private registerClient: ClientService,
    private employeeService: EmployeeService
  ) {  }

  async ngOnInit() {

    
  }


}
