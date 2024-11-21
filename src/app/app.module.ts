import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { MemberRegisterComponent } from './components/register/member-register/member-register.component';
import { EquipmentRegisterComponent } from './components/register/equipment-register/equipment-register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DateTypePipe } from './pipes/date-type.pipe';
import { AlertComponent } from './components/alert/alert.component';
import { ClientRegisterComponent } from './components/register/client-register/client-register.component';
import { EmployeeRegisterComponent } from './components/register/employee-register/employee-register.component';
import { ClientCardComponent } from './components/cards/client-card/client-card.component';
import { EmployeeCardComponent } from './components/cards/employee-card/employee-card.component';
import { EquipamentCardComponent } from './components/cards/equipament-card/equipament-card.component';
import { PhoneMaskPipe } from './pipes/phone-mask.pipe';
import { CpfCnpjMaskPipe } from './pipes/cpf-cnpj-mask.pipe';
import { InfoClientComponent } from './components/infos/info-client/info-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    EquipamentCardComponent,
    EmployeeCardComponent,
    ClientCardComponent,
    SearchBarComponent,
    FooterComponent,
    RegisterComponent,
    MemberRegisterComponent,
    EquipmentRegisterComponent,
    ProfileComponent,
    DateTypePipe,
    AlertComponent,
    ClientRegisterComponent,
    EmployeeRegisterComponent,
    ClientCardComponent,
    EmployeeCardComponent,
    EquipamentCardComponent,
    PhoneMaskPipe,
    CpfCnpjMaskPipe,
    InfoClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
