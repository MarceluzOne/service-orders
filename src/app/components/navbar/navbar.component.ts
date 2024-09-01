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
      router: ''
    },
    {
      name: 'Cadastro',
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
  }
  public showMenu(menu:Boolean){
    this.canShowMenu = !menu
    console.log(this.canShowMenu)
  }
}
