import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  constructor( ) {  }

  async ngOnInit() {

    
  }

}
