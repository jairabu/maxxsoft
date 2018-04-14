import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatTabChangeEvent,
  MatSnackBar
} from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { NgForm } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';

import {
  Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized
} from '@angular/router';

import { Usuario } from '../../entities/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  entidade: Usuario;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.entidade = new Usuario();    
  }

  entrar(): void {
    this.usuarioService.login(this.entidade).subscribe (resultado => {
      if(resultado && resultado.token) {
        localStorage.setItem('usuarioLogado', JSON.stringify(resultado));
        this.abrirSnackBar("Usuário logado!", "Fechar");
        this.router.navigate(['/ajuda']);
      }
      else {
        this.abrirSnackBar("Erro ao fazer login!", "Fechar");
      }
    });
  }

  abrirSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
