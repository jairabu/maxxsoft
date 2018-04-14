import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TipoServico } from '../entities/tipo-servico';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TipoServicoService {
  private urlService = '//localhost:8080/api/tipo-servico';

  constructor(
    private http: HttpClient
  ) { }

  getEntidades (): Observable<TipoServico[]> {
    return this.http.get<any>(this.urlService)
      .pipe(
        tap(entidades => this.log('getTipoServicos')),
        catchError(this.handleError('getTipoServicos', []))
      );
  }

  addEntidade (entidade: TipoServico): Observable<TipoServico> {
    return this.http.post<TipoServico>(this.urlService, entidade, httpOptions).pipe(
      tap((entidade: TipoServico) => this.log('addTipoServico')),
      catchError(this.handleError<TipoServico>('addTipoServico'))
    );
  }

  updateEntidade (entidade: TipoServico): Observable<any> {
    return this.http.put(this.urlService, entidade, httpOptions).pipe(
      tap(_ => this.log('updateTipoServico')),
      catchError(this.handleError<any>('updateTipoServico'))
    );
  }

  deleteEntidade (entidade: TipoServico): Observable<TipoServico> {
    const url = this.urlService+"/"+entidade.id;
    return this.http.delete<TipoServico>(url, httpOptions).pipe(
      tap(_ => this.log('deleteTipoServico')),
      catchError(this.handleError<TipoServico>('deleteTipoServico'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log('${operation} failed: ${error.message}');
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
