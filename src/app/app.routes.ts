import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'personas', loadComponent: () => import('./components/persona/persona-lista/persona-lista.component').then(m => m.PersonaListaComponent) },
    { path: 'personas/edit/:id', loadComponent: () => import('./components/persona/persona-formulario/persona-formulario.component').then(m => m.PersonaFormComponent) },
    { path: 'personas/new', loadComponent: () => import('./components/persona/persona-formulario/persona-formulario.component').then(m => m.PersonaFormComponent) },
    { path: '**', redirectTo: 'personas' },
];

