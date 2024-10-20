import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent implements OnInit {
  public formClient: FormGroup = this.fb.group({});
  public isSubmiting: Boolean = false;
  public isCpf: Boolean = true;
  
  get documentInput(){
    return this.isCpf ? 'CPF' : 'CNPJ'
  }
  get maskInput(){
    return this.isCpf ? '000.000.000-00' : '00.000.000/0000-00'
  }


  constructor(
    private fb: FormBuilder,
    private registerClient: ClientService,
  ) {  }

  ngOnInit(): void {
    this.formClient = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required,]),
      'codClient': new FormControl('', [Validators.required]),
      'cnpj': new FormControl('', [Validators.required, Validators.maxLength(18)]),
    });
  }

  public submitClient(){
    this.isSubmiting = true;
    setTimeout(()=>{
      this.isSubmiting = false
    }, 1000)
    console.log(this.formClient.value)
    // if (this.formClient.valid) {
    //   const clientData = this.formClient.value;
    //   this.validarCnpj(clientData.cnpj)
    //   this.registerClient.registerClient(clientData).subscribe(
    //     response => {
    //       console.log('Cliente registrado com sucesso', response);
    //     },
    //     error => {
    //       console.error('Erro ao registrar o cliente', error);
    //     }
    //   );
    // }
  }

}
