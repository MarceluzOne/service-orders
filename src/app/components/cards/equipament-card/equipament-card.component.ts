import { Component, Input, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';

@Component({
  selector: 'app-equipament-card',
  templateUrl: './equipament-card.component.html',
  styleUrls: ['./equipament-card.component.scss']
})
export class EquipamentCardComponent implements OnInit {

  public equipaments: any

  constructor(private equipamentService: EquipmentService) { }

  async ngOnInit(){
    //await this.getEquipaments()
    this.equipaments = [
      {
          "id": 2,
          "equipmentName": "Teste3",
          "serialNumber": "SN123",
          "carrier": "portador marcelo",
          "receiver": "recebedor josé",
          "enterprise_name": "BRF",
          "brand": "marca teste3",
          "model": "modelo teste3",
          "current": 16,
          "power": 202,
          "voltage": 223,
          "registrationDate": "2024-10-21T21:28:50.516353",
          "priority": "B",
          "photoURL": "https://drive.google.com/uc?export=view&id=1kKayN2cPGgObXxS07Et4O_OnDfv-4VLP",
          "connectors": "SIM",
          "ihm": "SIM",
          "carcass_damage": "NAO",
          "engine": "SIM",
          "engine_cables": "NAO",
          "fan": "SIM",
          "fan_carcass": "SIM",
          "others": "tal coisa bla bla bla"
      },
      {
          "id": 4,
          "equipmentName": "INVERSOR",
          "serialNumber": "10123242",
          "carrier": "portador tHAILAN",
          "receiver": "recebedor Silvio",
          "enterprise_name": "BRF",
          "brand": "weg",
          "model": "Cfw08 plus",
          "current": 10,
          "power": 5,
          "voltage": 380,
          "registrationDate": "2024-10-21T23:32:11.339577",
          "priority": "A",
          "photoURL": "https://drive.google.com/uc?export=view&id=1aJKzAai5BHHPMWLuI71Apa9M02qEIHuZ",
          "connectors": "SIM",
          "ihm": "SIM",
          "carcass_damage": "NAO",
          "engine": "NAO",
          "engine_cables": "NAO",
          "fan": "SIM",
          "fan_carcass": "SIM",
          "others": "Apresentando E00"
      },
      {
          "id": 5,
          "equipmentName": "Testando equipment",
          "serialNumber": "SN124",
          "carrier": "portador marcelo",
          "receiver": "recebedor josé",
          "enterprise_name": "BRF",
          "brand": "marca teste3",
          "model": "modelo teste3",
          "current": 16,
          "power": 202,
          "voltage": 223,
          "registrationDate": "2024-10-21T23:32:39.129373",
          "priority": "B",
          "photoURL": "https://drive.google.com/uc?export=view&id=1UDs4ZPFlfiy7GYawwTccJDWw_HbFay9j",
          "connectors": "SIM",
          "ihm": "SIM",
          "carcass_damage": "NAO",
          "engine": "SIM",
          "engine_cables": "NAO",
          "fan": "SIM",
          "fan_carcass": "SIM",
          "others": "tal coisa bla bla bla"
      },
      {
          "id": 6,
          "equipmentName": "AR CONDICIONADO",
          "serialNumber": "SG220548",
          "carrier": "MARCELO",
          "receiver": "Australopitecus",
          "enterprise_name": "BRF",
          "brand": "SAMSUNG",
          "model": "SPLITWALL",
          "current": 220,
          "power": 220,
          "voltage": 220,
          "registrationDate": "2024-10-31T21:55:35.631609",
          "priority": "B",
          "photoURL": "https://drive.google.com/uc?export=view&id=1QTw1nJmZeqBqMGsxbdPDzKPER1slrRP2",
          "connectors": "NAO",
          "ihm": "NAO",
          "carcass_damage": "SIM",
          "engine": "NAO",
          "engine_cables": "NAO",
          "fan": "SIM",
          "fan_carcass": "SIM",
          "others": "ASDASFASFFA"
      }
  ]
  }
  private async getEquipaments(){
    try {
      const equipaments = await this.equipamentService.getEquipament().toPromise()
        this.equipaments = equipaments
    } catch (error) {
      this.equipaments = []
      console.log(error)
      
    }
  }

}
