import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService, StorageKeys } from 'src/app/services/local-storage/local-storage.service';


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
  get type() {
    return this.canShowPassowrd ? 'text' : 'password'
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.login = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.min(6)
      ]]
    })
  }
  public changeType() {
    this.canShowPassowrd = !this.canShowPassowrd
  }

  public toLogin() {
    this.authService.logout();
    const login = this.login.value;
  
    this.authService.login(login).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.toastr.success('Login realizado com sucesso!');
          this.localStorage.set(StorageKeys.Token, response.token);
          this.router.navigate(['/home']); 
        } else {
          console.error('Nenhum token foi encontrado na resposta.');
        }
      },
      error: (error) => {
        this.toastr.error(error.error.token);
        console.error('Erro durante o login:', error.error.token);
      }
    });
  }
}