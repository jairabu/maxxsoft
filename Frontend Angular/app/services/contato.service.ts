import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Contato } from '../entities/contato';
import { Usuario } from '../entities/usuario';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ContatoService {
  private urlService = '//localhost:8080/api/contato';

  constructor(
    private http: HttpClient
  ) { }

  getEntidades (): Observable<Contato[]> {
    var usuario: Usuario = this.getUsuario();
    if(usuario && usuario.id) {
      return this.http.get<any>(this.urlService+"/usuario/"+usuario.id)
        .pipe(
          tap(entidades => this.log('getContatos')),
          catchError(this.handleError('getContatos', []))
        );
    }
  }

  addEntidade (entidade: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.urlService, entidade, httpOptions).pipe(
      tap((entidade: Contato) => this.log('addContato')),
      catchError(this.handleError<Contato>('addContato'))
    );
  }

  updateEntidade (entidade: Contato): Observable<any> {
    return this.http.put(this.urlService, entidade, httpOptions).pipe(
      tap(_ => this.log('updateContato')),
      catchError(this.handleError<any>('updateContato'))
    );
  }

  deleteEntidade (entidade: Contato): Observable<Contato> {
    const url = this.urlService+"/"+entidade.id;
    return this.http.delete<Contato>(url, httpOptions).pipe(
      tap(_ => this.log('deleteContato')),
      catchError(this.handleError<Contato>('deleteContato'))
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

  getUsuario(): Usuario {
    return JSON.parse(localStorage.getItem('usuarioLogado'));
  }
}
