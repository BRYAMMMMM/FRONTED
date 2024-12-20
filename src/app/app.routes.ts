import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';

export const routes: Routes = [
    
    { path: '', redirectTo: 'usuario', pathMatch: 'full' }, // Ruta por defecto que redirige a 'usuario'
    { path: 'usuario', component: UsuarioComponent },
    { path: '**', redirectTo: 'usuario' } 

];
