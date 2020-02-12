import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhotoComponent } from './photo/photo.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent,
    NavbarComponent,
    PhotoFormComponent,
    MessagesComponent,
    PhotoDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2ImgMaxModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
