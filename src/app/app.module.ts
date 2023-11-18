import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from "./elements/header/header.component";
import { FooterComponent } from "./elements/footer/footer.component";
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { ApiModule, Configuration } from "./openapi-client";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthorizationInterceptor } from "./interceptors/authorization.interceptor";

/**
 * AppModule: The root application module that bootstraps and launches the Angular application.
 * It imports several other modules, components, and services that are essential for the app.
 */
@NgModule({
  declarations: [
    // AppComponent is the root component. HeaderComponent, FooterComponent, LoginComponent, HomeComponent, and PageNotFoundComponent are custom components.
    AppComponent,
  ],
  imports: [
    // BrowserModule is required for any web application running in a browser. AppRoutingModule defines the app's routes.
    // BrowserAnimationsModule enables Angular's animation system. Various Angular Material modules are imported for UI components.
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    MatMenuModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ApiModule.forRoot(() => {
      // ApiModule provides a way to configure global API settings like base URL.
      return new Configuration({
        basePath: 'https://product-manager.cyrotech.ch'
      });
    }),
    HttpClientModule // HttpClientModule enables the app to communicate with backend services over HTTP.
  ],
  providers: [
    // AuthorizationInterceptor is provided here to intercept and modify HTTP requests globally.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent] // AppComponent is the starting point of the application.
})
export class AppModule { }
