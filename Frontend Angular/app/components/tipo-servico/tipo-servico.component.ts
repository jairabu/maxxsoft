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

import { TipoServico } from '../../entities/tipo-servico';
import { TipoServicoService } from '../../services/tipo-servico.service';

@Component({
  selector: 'app-tipo-servico',
  templateUrl: './tipo-servico.component.html',
  styleUrls: ['./tipo-servico.component.css']
})
export class TipoServicoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  entidade: TipoServico;
  entidades = new MatTableDataSource<TipoServico>();
  indiceAbas = 0;
  colunasTabela = ['id', 'nome'];

  constructor(
    public snackBar: MatSnackBar,
    private entidadeService: TipoServicoService,
  ) { }

  ngOnInit() {
    this.carregarListagem();
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
    this.entidade = new TipoServico();
    this.getEntidades();
  }

  carregarFormulario(linha: TipoServico): void {
    this.entidade = linha;
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
      this.abrirSnackBar("Tipo de Serviço salvo!", "Fechar");
    });
    this.selecionarAba(0);
  }

  atualizar(): void {
    this.entidadeService.updateEntidade(this.entidade).subscribe(() => {
      this.carregarListagem();
      this.abrirSnackBar("Tipo de Serviço atualizado!", "Fechar");
    });
    this.selecionarAba(0);
  }

  remover(): void {
    this.entidadeService.deleteEntidade(this.entidade).subscribe(() => {
      this.carregarListagem();
      this.abrirSnackBar("Tipo de Serviço removido!", "Fechar");
    });
    this.selecionarAba(0);
  }
}
