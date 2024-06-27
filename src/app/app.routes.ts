import { Routes } from '@angular/router';
import { DetailsComponent } from './devices/pages/details/details.component';
import { HomeComponent } from './devices/pages/home/home.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'details/:id', component: DetailsComponent },
];
