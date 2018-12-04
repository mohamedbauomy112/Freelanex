import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";

import { TRANSLATION_PROVIDERS } from './translate/translation';
import { TranslatePipe } from './translate/translate.pipe';
import {  TranslateService } from './translate/translate.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BodyComponent } from './shared/body/body.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from "./user.service";
import { ContractService } from "../../src/app/service/contract.service";
import { ForgetComponent } from './forget/forget.component';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoute:Routes = [
  {path:"",component:HomeComponent,pathMatch:'full'},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"profile", component:ProfileComponent},
  {path:"forget", component:ForgetComponent},
  {path:"wallet", component:WalletComponent},
  {path:"transaction", component:TransactionComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    TranslatePipe,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ForgetComponent,
    WalletComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(appRoute),
    BrowserAnimationsModule

  ],
  providers: [ TRANSLATION_PROVIDERS, TranslateService, UserService, ContractService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
