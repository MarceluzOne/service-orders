import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';


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
      'email': ['thialy786@gmail.com', [Validators.required]],
      'password': ['minhasenha1234', [Validators.required, Validators.min(6)
      ]]
    })
  }
  public changeType(){
    this.canShowPassowrd = !this.canShowPassowrd
  }
  public toLogin(){
    const login = this.login.value
    console.log(login);
    this.authService.login(login).subscribe({
      next: (response)=>{
        this.localStorage.set('ostoken',response.token)
        console.log('Token: ', response.token)

        this.router.navigate(['/home']);
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }
}