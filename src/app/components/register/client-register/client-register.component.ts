import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent implements OnInit {
  public formClient: FormGroup = this.fb.group({});
  public isSubmiting: Boolean = false;
  public isCpf: Boolean = true;
  public clients: any;
  
  get documentInput(){
    return this.isCpf ? 'CPF' : 'CNPJ'
  }
  get maskInput(){
    return this.isCpf ? '000.000.000-00' : '00.000.000/0000-00'
  }


  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private toastr: ToastrService
  ) {  }

  async ngOnInit() {
    this.formClient = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required, Validators.maxLength(11)]),
      'codClient': new FormControl('', [Validators.required]),
      'cnpj': new FormControl('', [Validators.required, Validators.maxLength(18)]),
    });
  }

  public submitClient(){
    this.isSubmiting = true
    if (this.formClient.valid) {
      const client = this.formClient.value;
      this.clientService.registerClient(client).subscribe(
        response => {
          this.formClient.reset();
          this.isSubmiting = false;
          this.toastr.success('Cliente cadastrado com sucesso')
          
        },
        error => {
          console.error('Erro ao registrar o cliente', error);
          this.toastr.error('Erro ao cadastrar o cliente')
          this.isSubmiting = false
        }
      );
    }
  }

}
