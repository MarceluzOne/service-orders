import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-employee',
  templateUrl: './info-employee.component.html',
  styleUrls: ['./info-employee.component.scss']
})
export class InfoEmployeeComponent {

  constructor(
    public dialogRef: MatDialogRef<InfoEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(): void {
    console.log(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
