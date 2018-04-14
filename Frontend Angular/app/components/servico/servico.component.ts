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

import { Servico } from '../../entities/servico';
import { TipoServico } from '../../entities/tipo-servico';
import { StatusServico } from '../../entities/status-servico';
import { Contato } from '../../entities/contato';
import { ServicoService } from '../../services/servico.service';
import { TipoServicoService } from '../../services/tipo-servico.service';
import { StatusServicoService } from '../../services/status-servico.service';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  entidade: Servico;
  entidades = new MatTableDataSource<Servico>();
  indiceAbas = 0;
  colunasTabela = ['id', 'valorTotal', 'status', 'contato'];
  colunasTabelaMobile = ['id', 'valorTotal'];
  colunas =  this.colunasTabela;
  tipoServicos: TipoServico[];
  tipoServicoAutocomplete = new FormControl();
  statusServicos: StatusServico[];
  statusServicoAutocomplete = new FormControl();
  contatos: Contato[];
  contatoAutocomplete = new FormControl();

  constructor(
    public snackBar: MatSnackBar,
    private entidadeService: ServicoService,
    private tipoServicoService: TipoServicoService,
    private statusServicoService: StatusServicoService,
    private contatoService: ContatoService
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

  tipoServicoDisplay(tipoServico?: TipoServico): string | undefined {
    return tipoServico ? tipoServico.nome : undefined;
  }

  statusServicoDisplay(statusServico?: StatusServico): string | undefined {
    return statusServico ? statusServico.nome : undefined;
  }

  contatoDisplay(contato?: Contato): string | undefined {
    return contato ? contato.nome : undefined;
  }

  carregarListagem(): void {
    this.entidade = new Servico();
    this.getEntidades();
    this.getTipoServicos();
    this.getStatusServicos();
    this.getContatos();
  }

  carregarFormulario(linha: Servico): void {
    this.entidade = linha;
    if(this.entidade.inicioAtendimento) {
      this.entidade.inicioAtendimento = new Date(this.entidade.inicioAtendimento);
    }
    if(this.entidade.fimAtendimento) {
      this.entidade.fimAtendimento = new Date(this.entidade.fimAtendimento);
    }
  }

  getEntidades(): void {
    this.entidadeService.getEntidades().subscribe (entidades => {
      this.entidades.data = entidades;
    });
  }

  getTipoServicos(): void {
    this.tipoServicoService.getEntidades().subscribe (tipoServicos => {
      this.tipoServicos = tipoServicos;
    });
  }

  getStatusServicos(): void {
    this.statusServicoService.getEntidades().subscribe (statusServicos => {
      this.statusServicos = statusServicos;
    });
  }

  getContatos(): void {
    this.contatoService.getEntidades().subscribe (contatos => {
      this.contatos = contatos;
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
      this.abrirSnackBar("Serviço salvo!", "Fechar");
      this.carregarListagem();
      this.selecionarAba(0);
    });
  }

  atualizar(): void {
    this.entidadeService.updateEntidade(this.entidade).subscribe(() => {
      this.abrirSnackBar("Serviço atualizado!", "Fechar");
      this.carregarListagem();
      this.selecionarAba(0);
    });
  }

  remover(): void {
    this.entidadeService.deleteEntidade(this.entidade).subscribe(() => {
      this.abrirSnackBar("Serviço removido!", "Fechar");
      this.carregarListagem();
      this.selecionarAba(0);
    });
  }
}
