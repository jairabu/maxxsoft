import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Servico } from '../entities/servico';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ServicoService {
  private urlService = '//localhost:8080/api/servico';

  constructor(
    private http: HttpClient
  ) { }

  getEntidades (): Observable<Servico[]> {
    return this.http.get<any>(this.urlService)
      .pipe(
        tap(entidades => this.log('getServicos')),
        catchError(this.handleError('getServicos', []))
      );
  }

  addEntidade (entidade: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.urlService, entidade, httpOptions).pipe(
      tap((entidade: Servico) => this.log('addServico')),
      catchError(this.handleError<Servico>('addServico'))
    );
  }

  updateEntidade (entidade: Servico): Observable<any> {
    return this.http.put(this.urlService, entidade, httpOptions).pipe(
      tap(_ => this.log('updateServico')),
      catchError(this.handleError<any>('updateServico'))
    );
  }

  deleteEntidade (entidade: Servico): Observable<Servico> {
    const url = this.urlService+"/"+entidade.id;
    return this.http.delete<Servico>(url, httpOptions).pipe(
      tap(_ => this.log('deleteServico')),
      catchError(this.handleError<Servico>('deleteServico'))
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
