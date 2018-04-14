import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { StatusServico } from '../entities/status-servico';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StatusServicoService {
  private urlService = '//localhost:8080/api/status-servico';

  constructor(
    private http: HttpClient
  ) { }

  getEntidades (): Observable<StatusServico[]> {
    return this.http.get<any>(this.urlService)
      .pipe(
        tap(entidades => this.log('getStatusServicos')),
        catchError(this.handleError('getStatusServicos', []))
      );
  }

  addEntidade (entidade: StatusServico): Observable<StatusServico> {
    return this.http.post<StatusServico>(this.urlService, entidade, httpOptions).pipe(
      tap((entidade: StatusServico) => this.log('addStatusServico')),
      catchError(this.handleError<StatusServico>('addStatusServico'))
    );
  }

  updateEntidade (entidade: StatusServico): Observable<any> {
    return this.http.put(this.urlService, entidade, httpOptions).pipe(
      tap(_ => this.log('updateStatusServico')),
      catchError(this.handleError<any>('updateStatusServico'))
    );
  }

  deleteEntidade (entidade: StatusServico): Observable<StatusServico> {
    const url = this.urlService+"/"+entidade.id;
    return this.http.delete<StatusServico>(url, httpOptions).pipe(
      tap(_ => this.log('deleteStatusServico')),
      catchError(this.handleError<StatusServico>('deleteStatusServico'))
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
