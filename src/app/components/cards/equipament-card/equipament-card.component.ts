import { Component, Input, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';

@Component({
  selector: 'app-equipament-card',
  templateUrl: './equipament-card.component.html',
  styleUrls: ['./equipament-card.component.scss']
})
export class EquipamentCardComponent implements OnInit {

  public equipaments: any = []

  constructor(
    private equipamentService: EquipmentService,
  ) { }

  async ngOnInit() {
    await this.getEquipaments()
  }
  private async getEquipaments() {
    try {
      const equipaments = await this.equipamentService.getEquipament().toPromise()
      this.equipaments = equipaments
    } catch (error) {
      this.equipaments = []
    }
  }

}
