import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { StorageKeys } from 'src/app/services/local-storage/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() isLogged: Boolean = false;
  public canShowPassowrd: Boolean = false;
  public clients: any;
  public login: FormGroup = this.fb.group({});
  get type(){
    return this.canShowPassowrd? 'text' : 'password'
  }
  constructor(
    private fb : FormBuilder,
    private localStorage: LocalStorageService,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    this.login = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.min(6)
      ]]
    })
  }
  public changeType(){
    this.canShowPassowrd = !this.canShowPassowrd
  }

  public toLogin() {
  const login = this.login.value; // Obtém os valores do formulário
  console.log('Dados de login:', login);

  this.authService.login(login).subscribe({
    next: (response) => {
      // Verifique se o token existe na resposta
      if (response && response.token) {
        console.log('Token recebido:', response.token);

        // Navega para a rota '/home' após o login
        this.router.navigate(['/home']);
      } else {
        console.error('Nenhum token foi encontrado na resposta.');
      }
    },
    error: (error) => {
      console.error('Erro durante o login:', error);
    }
  });
}
}