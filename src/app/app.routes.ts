import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { GenerateQrComponent } from './pages/generate-qr/generate-qr.component';
import { NotFoundComponent } from './pages/util/not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(x => x.HomeComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then(x => x.AboutComponent)
    },
    {
        path: 'generate-qr',
        loadComponent: () => import('./pages/generate-qr/generate-qr.component').then(x => x.GenerateQrComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: '**',
        loadComponent: () => import('./pages/util/not-found/not-found.component').then(x => x.NotFoundComponent)
    }
];
