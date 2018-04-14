import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ContatoComponent } from './components/contato/contato.component';
import { ServicoComponent } from './components/servico/servico.component';
import { TipoServicoComponent } from './components/tipo-servico/tipo-servico.component';
import { StatusServicoComponent } from './components/status-servico/status-servico.component';
import { AjudaComponent } from './components/ajuda/ajuda.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'servico', component: ServicoComponent },
  { path: 'tipo-servico', component: TipoServicoComponent },
  { path: 'status-servico', component: StatusServicoComponent },
  { path: 'ajuda', component: AjudaComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
