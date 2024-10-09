import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public serviceOrders: any;

  constructor(private registerEquipment: EquipmentService) { }

  async ngOnInit() {
    await this.getEquipament();

  }
  public async getEquipament(){
    try {
      const equipament = await this.registerEquipment.getEquipament().toPromise();
      this.serviceOrders = equipament
      console.log(this.serviceOrders)
    } catch (error) {
      this.serviceOrders = []
    }
  }

}
