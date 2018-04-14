import { Component, Inject, OnInit } from '@angular/core';
import {
  Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized
} from '@angular/router';

import {
  MatSnackBar
} from '@angular/material';

import { Usuario } from './entities/usuario';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLogin = false;

  constructor(
    public snackBar: MatSnackBar,
    router: Router,
    private usuarioService: UsuarioService
  ) {
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.updateLogin()
      }
    });
  }

  ngOnInit() {
    this.updateLogin();
  }

  updateLogin(): void {
    this.isLogin = window.location.pathname === '/home' ||
      window.location.pathname === '/'? true : false;
  }

  isLogged(): boolean {
    var usuario: Usuario = this.getUsuario();
    if(usuario && usuario.token) {
      return true;
    }
    else {
      return false;
    }
  }

  isAdm(): boolean {
    var usuario: Usuario = this.getUsuario();
    if(usuario && usuario.isAdm == true) {
      return true;
    }
    else {
      return false;
    }
  }

  getUsuario(): Usuario {
    return JSON.parse(localStorage.getItem('usuarioLogado'));
  }

  sair(): void {
    this.usuarioService.logout(this.getUsuario()).subscribe (login => {
      localStorage.removeItem('usuarioLogado');
    });
    this.abrirSnackBar("Usuário deslogado!", "Fechar");
  }

  abrirSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
