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
    console.log(this.serviceOrders)
    // this.serviceOrders  = [
    //   {
    //     photo:'https://www.viewtech.ind.br/media/catalog/product/cache/81fd79446bf1269e3fc6e93bae483652/t/a/tamanho_b.jpg',
    //     productName :'Nome do Produto',
    //     refCode: '#6685249955',
    //     priority: 'A',
    //     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    //     entryDate: '18/17/2024',
    //     equipment:{
    //       serialNumber: 'string',
    //       power: 'string',
    //       voltage: 'string',
    //       lastOS: 'string',
    //       brand: 'string',
    //       stats: 'string'
    //     }
    //   },
    //   {
    //     productName :'Nome do Produto',
    //     refCode: '#6685249955',
    //     priority: 'A',
    //     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    //     entryDate: '18/17/2024'
    //   },
    //   {
    //     photo:'https://www.viewtech.ind.br/media/catalog/product/cache/81fd79446bf1269e3fc6e93bae483652/t/a/tamanho_b.jpg',
    //     productName :'Nome do Produto',
    //     refCode: '#6685249955',
    //     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    //     entryDate: '18/17/2024'
    //   },
    //   {
    //     photo:'https://www.viewtech.ind.br/media/catalog/product/cache/81fd79446bf1269e3fc6e93bae483652/t/a/tamanho_b.jpg',
    //     productName :'Nome do Produto',
    //     refCode: '#6685249955',
    //     priority: 'A',
    //     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    //     entryDate: '18/17/2024'
    //   }
    // ]
  }
  public async getEquipament(){
    try {
      const equipament = await this.registerEquipment.getEquipament().toPromise()
      this.serviceOrders = equipament
    } catch (error) {
      this.serviceOrders = []
    }
  }

}
