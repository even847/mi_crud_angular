import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import ITokenResponse from '../models/ITokenResponse.model';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  //Este metodo se llama siempre que se ejecuta una peticion http
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //aqui se obtiene el token del local Store
    let token: string = localStorage.getItem('token')!;

    //Si no consigue token no agrege al header el token
    if (!token) {
      return next.handle(req);
    }

    //de lo contrario,creo el header le agrego eltoken y clono el request y se le agregan los header y se retorna la nueva request(clone)
    const headers = new HttpHeaders()
      .set('Authorization', token)
      .set('Content-Type', 'application/json');

    const cloneReq = req.clone({
      headers,
    });

    //retorno el clone request
    return next.handle(cloneReq);
  }
}
