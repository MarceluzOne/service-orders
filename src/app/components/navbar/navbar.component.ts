import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  public canShowMenu: Boolean = false;
  constructor(
    private router: Router, 
    private authService: AuthService) { }

  ngOnInit(): void {
    setInterval(() => {
      if (this.canShowMenu) {
        this.canShowMenu = !this.canShowMenu
      }
    }, 5000);
  }
  public goTo(router: String) {
    this.router.navigate([router])
  }
  public toLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/')
  }

  public showMenu(menu: Boolean) {
    this.canShowMenu = !menu
  }
}
