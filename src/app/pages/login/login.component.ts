import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { UserProfileService } from 'src/app/services/profile/user-profile.service';

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
    private serviceClient: UserProfileService

  ) { }

  ngOnInit() {
    this.login = this.fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.min
        (6)
      ]]
    })
  }
  public changeType(){
    this.canShowPassowrd = !this.canShowPassowrd
  }
  public toLogin(){
    console.log(this.login.value)
  }
}
