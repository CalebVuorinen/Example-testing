import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }     from './app.component';

import { UserService }      from './model/user.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    UserService
  ],
  declarations: [
    AppComponent,
    WelcomeComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
