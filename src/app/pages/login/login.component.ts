import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


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
  public isLoading: Boolean = false;

  get type() {
    return this.canShowPassowrd ? 'text' : 'password'
  }
  public icons ={
    faCoffee
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.login = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.min(6)
      ]]
    })
  }
  public changeType() {
    this.canShowPassowrd = !this.canShowPassowrd
  }

  public toLogin() {
    this.isLoading = true;
    this.authService.logout()
    const login = this.login.value;

    this.authService.login(login).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.isLoading = false
          this.toastr.success('Login realizado com sucesso!')
          this.router.navigate(['/home']);
        } else {
          this.isLoading = false;
          console.error('Nenhum token foi encontrado na resposta.');
        }
      },
      error: (error) => {
        this.isLoading =false
        this.toastr.error(error.error.token)
        console.error('Erro durante o login:', error.error.token);
      }
    });
  }
}