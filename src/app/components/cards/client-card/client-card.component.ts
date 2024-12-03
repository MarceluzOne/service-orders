import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { InfoClientComponent } from '../../infos/info-client/info-client.component';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {
  public clients: any = [];
  public isLoading: Boolean = false

  constructor(
    private clientService: ClientService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getClient();
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
    this.clientService.deleteClient(cnpj).subscribe({
      next: () => {
        this.toastr.success('Cliente deletado com sucesso')
        this.clients = this.clients.filter((client: any) => client.cnpj !== cnpj);
      },
      error: (error) => {
        this.toastr.error('Erro ao deletar o cliente');
        console.error('Erro ao deletar cliente:', error);
      }
    });

  }
  public openModalClient(client: any){
    const dialogRef = this.dialog.open(InfoClientComponent,{
      data: client
    })
    dialogRef.afterClosed().subscribe(async result => {
      if(result === true){
        await this.getClient()
      }
    })


  }

}
