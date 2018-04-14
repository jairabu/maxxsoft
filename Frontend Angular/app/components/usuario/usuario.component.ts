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

import { Usuario } from '../../entities/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  entidade: Usuario;
  entidades = new MatTableDataSource<Usuario>();
  indiceAbas = 0;
  colunasTabela = ['id', 'nome', 'login'];
  colunasTabelaMobile = ['id', 'nome'];
  colunas =  this.colunasTabela;

  constructor(
    public snackBar: MatSnackBar,
    private entidadeService: UsuarioService,
  ) { }

  ngOnInit() {
    this.carregarListagem();
    this.ajustarListagem(window.innerWidth);
  }

  onResize(event) {
    this.ajustarListagem(event.target.innerWidth);
  }

  ajustarListagem(width: number) {
    this.colunas = width<=500 ? this.colunasTabelaMobile : this.colunasTabela;
  }

  ngAfterViewInit() {
    this.entidades.paginator = this.paginator;
    this.entidades.sort = this.sort;
  }

  public aplicarFiltro(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.entidades.filter = filterValue;
  }

  public alterarAba(tabChangeEvent: MatTabChangeEvent): void {
      this.indiceAbas = tabChangeEvent.index;
  }

  selecionarAba(index: number): void {
    this.indiceAbas = index;
  }

  carregarListagem(): void {
    this.entidade = new Usuario();
    this.getEntidades();
  }

  carregarFormulario(linha: Usuario): void {
    this.entidade = linha;
    if(this.entidade.dataCadastro) {
      this.entidade.dataCadastro = new Date(this.entidade.dataCadastro);
    }
  }

  getEntidades(): void {
    this.entidadeService.getEntidades().subscribe (entidades => {
      this.entidades.data = entidades;
    });
  }

  selecionarLinha(linha): void {
    this.carregarFormulario(linha);
    this.selecionarAba(1);
  }

  abrirSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  cancelar(): void {
    this.carregarListagem();
    this.selecionarAba(0);
  }

  salvar(): void {
    this.entidadeService.addEntidade(this.entidade).subscribe(() => {
      this.carregarListagem();
      this.abrirSnackBar("Usuário salvo!", "Fechar");
    });
    this.selecionarAba(0);
  }

  atualizar(): void {
    this.entidadeService.updateEntidade(this.entidade).subscribe(() => {
      this.carregarListagem();
      this.abrirSnackBar("Usuário atualizado!", "Fechar");
    });
    this.selecionarAba(0);
  }

  remover(): void {
    this.entidadeService.deleteEntidade(this.entidade).subscribe(() => {
      this.carregarListagem();
      this.abrirSnackBar("Usuário removido!", "Fechar");
    });
    this.selecionarAba(0);
  }
}
