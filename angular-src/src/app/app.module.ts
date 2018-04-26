import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GameComponent } from './components/game/game.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {SocketService} from './services/socket.service';


import { AuthGuard } from './guards/auth.guard';

import { TiledStateModule } from './classes/states/tiled-state/tiled-state.module';
import { BootStateModule } from './classes/states/boot-state/boot-state.module';
import { LoadingStateModule } from './classes/states/loading-state/loading-state.module';


//import {FlashMessagesService} from 'angular2-flash-messages';

const appRouts: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'game', component: GameComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRouts),
    FlashMessagesModule,
    BootStateModule,
    LoadingStateModule,
    TiledStateModule
  ],
  providers: [ValidateService, AuthService, SocketService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
