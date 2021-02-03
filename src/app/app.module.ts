import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Layout1Module } from './layout/layout1/layout1.module';
import { CustomerFormComponent } from './modules/left-form/customer-form/customer-form.component';
import { ContactFormComponent } from './modules/left-form/contact-form/contact-form.component';
import { DealFormComponent } from './modules/left-form/deal-form/deal-form.component';
import { LeftFormComponent } from './modules/left-form/left-form.component';
import { AppInterceptor } from './app.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Layout1Module,
    HttpClientModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
