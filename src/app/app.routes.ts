import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(x => x.HomeComponent)
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
