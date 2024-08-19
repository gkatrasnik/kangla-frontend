import { Routes, mapToCanActivate } from '@angular/router';
import { DetailsComponent } from './plants/pages/details/details.component';
import { HomeComponent } from './plants/pages/home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: mapToCanActivate([AuthGuard])  },
    { path: 'details/:id', component: DetailsComponent, canActivate: mapToCanActivate([AuthGuard])  },
];
