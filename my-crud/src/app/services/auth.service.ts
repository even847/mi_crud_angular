import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IUser from '../models/IUser.model';
import { TokenInterceptorService } from '../interceptors/token-interceptor.service';
import ITokenResponse from '../models/ITokenResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Endpoint para crear el token
  END_POINT_SUCCESS: string =
    'https://run.mocky.io/v3/c5416354-9053-471e-9855-e8ab645a333d';
    //Este enpoing genera un error
  END_POINT_ERROR: string =
    'https://run.mocky.io/v3/1dd2d332-a83a-4a67-85bd-e203ee5fb7af';
  //la palabra secreta que requiere el backend para crear el token
  SECRET_SEED = '12345';


  constructor(protected http: HttpClient) {}

  //Realiza el Fetch al api de token (emite un Observable)
  getLogin(user: string, password: string): Observable<ITokenResponse> {
    //Se crear los headers
    const params = new HttpParams().set('Authorization', this.SECRET_SEED);
    // Se realiza el fetch, pasando la url y los headers
    return this.http.post<ITokenResponse>(
      this.END_POINT_SUCCESS,
      { user, password },
      { params }
    )
  }
}
