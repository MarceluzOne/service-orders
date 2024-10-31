import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isAdmin: Boolean = true;
  public serviceOrders: any;
  public typeList: 'clients' | 'employees' | 'equipments' = 'equipments';
  public buttonStyleSelected: string = 'border-b-4 border-blue-300 rounded-md w-full';
  public buttonStyle: string = 'rounded-md w-full';

  constructor( ) { }

  async ngOnInit() {
  }
  public typeListSelect(type: 'clients' | 'employees' | 'equipments') {
    const style = 'border-b-4 text-md border-blue-300 rounded-md w-full'
    
    if (type === 'clients') {
      this.typeList = type
      return this.buttonStyleSelected = style
    }
    if (type === 'equipments') {
      this.typeList = type
      return this.buttonStyleSelected = style
    }
    this.typeList = type
    return this.buttonStyleSelected = style
  }

}
