import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../entities/usuario';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsuarioService {
  private urlService = '//localhost:8080/api/usuario';

  constructor(
    private http: HttpClient
  ) { }

  getEntidades (): Observable<Usuario[]> {
    return this.http.get<any>(this.urlService)
      .pipe(
        tap(entidades => this.log('getUsuarios')),
        catchError(this.handleError('getUsuarios', []))
      );
  }

  addEntidade (entidade: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlService, entidade, httpOptions).pipe(
      tap((entidade: Usuario) => this.log('addUsuario')),
      catchError(this.handleError<Usuario>('addUsuario'))
    );
  }

  updateEntidade (entidade: Usuario): Observable<any> {
    return this.http.put(this.urlService, entidade, httpOptions).pipe(
      tap(_ => this.log('updateUsuario')),
      catchError(this.handleError<any>('updateUsuario'))
    );
  }

  deleteEntidade (entidade: Usuario): Observable<Usuario> {
    const url = this.urlService+"/"+entidade.id;
    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => this.log('deleteUsuario')),
      catchError(this.handleError<Usuario>('deleteUsuario'))
    );
  }

  login (usuario: Usuario): Observable<Usuario> {
    const url = this.urlService+"/login/"+usuario.login+":"+usuario.senha;
    return this.http.get<any>(url)
      .pipe(
        tap(entidades => this.log('getUsuario')),
        catchError(this.handleError('getUsuario', []))
      );
  }

  logout (usuario: Usuario): any {
    const url = this.urlService+"/logout/"+usuario.login;
    return this.http.get<any>(url)
      .pipe(
        tap(entidades => this.log('getUsuario')),
        catchError(this.handleError('getUsuario', []))
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
