import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss']
})
export class InfoClientComponent implements OnInit {
  public formClient: FormGroup = this.fb.group({});

  constructor(
    public dialogRef: MatDialogRef<InfoClientComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public clientService: ClientService
  ) {this.formClient = this.fb.group({
    'name': new FormControl(this.data.name, [Validators.required]),
    'phone': new FormControl(this.data.phone, [Validators.required, Validators.maxLength(11)]),
    'codClient': new FormControl(this.data.codClient, [Validators.required, Validators.maxLength(10)]),
    'cnpj': new FormControl(this.data.cnpj, [Validators.required, Validators.maxLength(18)]),
  });}
  ngOnInit(): void {
    console.log(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public updateClient(){
    console.log(this.formClient.value)
    if(this.formClient.valid){
      const payload = this.formClient.value;
      this.clientService.updateClient(payload, payload.cnpj).subscribe({
        next: () =>{
          this.toastr.success('Cliente atualizado com sucesso!')
          this.dialogRef.close(true)
        },
        error: (error) =>{
          console.log(error)
          this.toastr.error('Não foi possivel atualizar o cliente')
        }
      })
    }
  }
}
