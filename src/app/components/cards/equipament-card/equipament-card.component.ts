import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';
import { InfoEquipamentComponent } from '../../infos/info-equipament/info-equipament.component';

@Component({
  selector: 'app-equipament-card',
  templateUrl: './equipament-card.component.html',
  styleUrls: ['./equipament-card.component.scss']
})
export class EquipamentCardComponent implements OnInit {

  public equipaments: any = []

  constructor(
    private equipamentService: EquipmentService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.getEquipaments();
    this.openModal(this.equipaments[0])
  }
  private async getEquipaments() {
    try {
      const equipaments = await this.equipamentService.getEquipament().toPromise()
      this.equipaments = equipaments
    } catch (error) {
      this.equipaments = []
    }
  }

  public openModal(equipament: any){
    const dialog = this.dialog.open(InfoEquipamentComponent,{
      data: equipament
    })
  }

}
