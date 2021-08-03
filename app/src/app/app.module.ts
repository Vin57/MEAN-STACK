import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/layout/layout.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './domain/homepage/homepage.component';
import { SignupComponent } from './domain/authentication/components/signup/signup.component';
import { SigninComponent } from './domain/authentication/components/signin/signin.component';
import { TopbarComponent } from './domain/topbar/topbar.component';
import { ProfileComponent } from './domain/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SignupComponent,
    SigninComponent,
    TopbarComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RouterModule.forRoot(APP_ROUTES),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
