import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { GenerateQrComponent } from './pages/generate-qr/generate-qr.component';
import { NotFoundComponent } from './pages/util/not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'generate-qr',
        component: GenerateQrComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
