import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CardsComponent } from './components/cards/cards.component';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CardsComponent,
    SearchBarComponent,
    FooterComponent,
    RegisterComponent,
    MemberRegisterComponent,
    EquipmentRegisterComponent,
    ProfileComponent,
    DateTypePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
