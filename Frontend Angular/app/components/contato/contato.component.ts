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

import { Contato } from '../../entities/contato';
import { Usuario } from '../../entities/usuario';
import { ContatoService } from '../../services/contato.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  entidade: Contato;
  entidades = new MatTableDataSource<Contato>();
  contatos: Contato[];
  indiceAbas = 0;
  colunasTabela = ['id', 'nome', 'sobrenome', 'email'];
  colunasTabelaMobile = ['id', 'nome'];
  colunas =  this.colunasTabela;
  usuarios: Usuario[];
  usuarioAutocomplete = new FormControl();

  constructor(
    public snackBar: MatSnackBar,
    private entidadeService: ContatoService,
    private usuarioService: UsuarioService
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

  usuarioDisplay(usuario?: Usuario): string | undefined {
    return usuario ? usuario.nome : undefined;
  }

  carregarListagem(): void {
    this.entidade = new Contato();
    this.getEntidades();
    this.getUsuarios();
  }

  carregarFormulario(linha: Contato): void {
    this.entidade = linha;
    if(this.entidade.dataCadastro) {
      this.entidade.dataCadastro = new Date(this.entidade.dataCadastro);
    }
  }

  getEntidades(): void {
    this.entidadeService.getEntidades().subscribe (entidades => {
      this.contatos = entidades;
      this.entidades.data = this.contatos;
    });
  }

  getUsuarios(): void {
    this.usuarioService.getEntidades().subscribe (entidades => {
      this.usuarios = entidades;
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
    this.selecionarAba(0);
    this.carregarListagem();
  }

  salvar(): void {
    this.entidadeService.addEntidade(this.entidade).subscribe(() => {
      this.abrirSnackBar("Contato salvo!", "Fechar");
      this.selecionarAba(0);
      this.carregarListagem();
    });
  }

  atualizar(): void {
    this.entidadeService.updateEntidade(this.entidade).subscribe(() => {
      this.abrirSnackBar("Contato atualizado!", "Fechar");
      this.selecionarAba(0);
      this.carregarListagem();
    });
  }

  remover(): void {
    this.entidadeService.deleteEntidade(this.entidade).subscribe(() => {
      this.abrirSnackBar("Contato removido!", "Fechar");
      this.selecionarAba(0);
      this.carregarListagem();
    });
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
}
