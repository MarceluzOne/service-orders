import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-info-equipament',
  templateUrl: './info-equipament.component.html',
  styleUrls: ['./info-equipament.component.scss']
})
export class InfoEquipamentComponent {

  constructor(
    public dialogRef: MatDialogRef<InfoEquipamentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ){ }

  ngOnInit(): void {
    console.log(this.data)
   }

}
