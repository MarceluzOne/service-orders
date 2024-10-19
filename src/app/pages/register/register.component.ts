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
  public formEquipment: FormGroup = this.fb.group({});
  public formEmployee: FormGroup = this.fb.group({});
  public showCam: boolean = false;
  public isAdmin: Boolean = true;
  public equipmentForm: 'client' | 'equipment' | 'employee' = 'equipment';
  public equipament: any;
  public capturedImage: string | null = null;
  public stream: MediaStream | null = null;
  public statusMessenger: String = '';
  public client: any;
  public employee: any; 
  public isSubmiting: Boolean = false

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
    this.client = await this.registerClient.getClients().toPromise();
    console.log(this.client)
    this.employee = await this.employeeService.getEmployee().toPromise();
    console.log(this.employee)
    
  }
  public async  getClient(){
    try {
      await this.registerClient.getClients().subscribe((response) => {
        this.client = response
      })
    } catch (error) {
      this.client = []
    }
  }

}
