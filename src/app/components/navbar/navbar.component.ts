import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public menu: any[] = [
    {
      name: 'Inicio',
      router: 'home'
    },
    {
      name: 'Cadastrar',
      router: 'register'
    },
    {
      name: 'Perfil',
      router: 'profile'
    }
  ]
  public canShowMenu:Boolean = false;
  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      if(this.canShowMenu){
        this.canShowMenu = !this.canShowMenu
      }
    }, 5000);
  }
  public showMenu(menu:Boolean){
    this.canShowMenu = !menu
  }
}
