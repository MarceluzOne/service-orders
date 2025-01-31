import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';

@Component({
  selector: 'app-equipament-card',
  templateUrl: './equipament-card.component.html',
  styleUrls: ['./equipament-card.component.scss']
})
export class EquipamentCardComponent implements OnInit {

  public equipaments: any = []; // Lista de equipamentos
  public selectedEquipamento: any; // Equipamento selecionado para mostrar no modal
  public serviceOrderDetails: any; // Detalhes da ordem de serviço
  public isModalOpen: boolean = false; // Variável para controlar a visibilidade do modal

  constructor(
    private equipamentService: EquipmentService,
  ) { }

  async ngOnInit() {
    await this.getEquipaments();
  }

  private async getEquipaments() {
    try {
      const equipaments = await this.equipamentService.getEquipament().toPromise();
      this.equipaments = equipaments;
    } catch (error) {
      this.equipaments = []
    }
  }

  async openModal(equipamento: any) {
    this.selectedEquipamento = equipamento;
    this.isModalOpen = true;
    console.log('Número de série do equipamento:', equipamento);
  
    try {
      // Chama o método para buscar todas as ordens de serviço
      const serviceOrders = await this.equipamentService.getAllServiceOrders().toPromise();
      this.serviceOrderDetails = serviceOrders;
      console.log('Todas as ordens de serviço:', this.serviceOrderDetails); // Logs as ordens de serviço
    } catch (error) {
      console.error('Erro ao carregar ordens de serviço:', error);
      this.serviceOrderDetails = null;
    }
  }
  
  

  // Função para fechar o modal
  closeModal() {
    this.isModalOpen = false;
    this.serviceOrderDetails = null; // Limpa os dados da ordem de serviço ao fechar o modal
  }
}
