import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {
  public clients: any;
  public isLoading: Boolean = false

  constructor(private clientService: ClientService) { }

  async ngOnInit() {
    await this.getClient()
    console.log(this.clients)
  }

  public async getClient() {
    try {
      const clients = await this.clientService.getClients().toPromise();
      this.clients = clients
    } catch (error) {
      this.clients = []
    }
  }
  public confirmDelete(cnpj: string) {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.deletClient(cnpj);
    }
  }
  public deletClient(cnpj: string) {

    console.log(cnpj);
    this.clientService.deleteClient(cnpj).subscribe({
      next: () => {
        this.clients = this.clients.filter((client: any) => client.cnpj !== cnpj);
        alert('Cliente deletado com sucesso')
      },
      error: (error) => console.error('Erro ao deletar cliente:', error),
    });

  }

}
