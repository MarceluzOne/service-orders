import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public menu: any[] = [
    {
      name: 'Inicio',
      router: '/home'
    },
    {
      name: 'Cadastrar',
      router: '/register'
    },
  ]
  public canShowMenu:Boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    setInterval(() => {
      if(this.canShowMenu){
        this.canShowMenu = !this.canShowMenu
      }
    }, 5000);
  }
  public goTo(router: String){
this.router.navigate([router])
  }
  public showMenu(menu:Boolean){
    this.canShowMenu = !menu
  }
}
