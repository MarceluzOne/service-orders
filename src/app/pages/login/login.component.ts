import { Component, OnInit, Output } from '@angular/core';
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
  get type(){
    return this.canShowPassowrd? 'text' : 'password'
  }
  constructor(
    private localStorage: LocalStorageService,
    private serviceClient: UserProfileService

  ) { }

  ngOnInit() {
  }
  public changeType(){
    this.canShowPassowrd = !this.canShowPassowrd
  }
  public login(){
    this.localStorage.set('isLogged', true)
    this.isLogged = !this.isLogged
  }
}
