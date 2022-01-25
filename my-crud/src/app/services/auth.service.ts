import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IUser from '../models/IUser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Endpoint para crear el token
END_POINT_SUCCESS:string='https://run.mocky.io/v3/c5416354-9053-471e-9855-e8ab645a333d'
END_POINT_ERROR:string='https://run.mocky.io/v3/1dd2d332-a83a-4a67-85bd-e203ee5fb7af'
//la palabra secreta que requiere el backend para crear el token
SECRET_SEED='12345'

  constructor(protected http:HttpClient) {

   }


   //Crear El token de Auth
   getLogin(user:string,password:string):Observable<IUser>{
    //Se crear los headers
    const params = new HttpParams()
    .set('Authorization', this.SECRET_SEED)
    // Se realiza el fetch, pasando la url y los headers
    return this.http.post<IUser>(this.END_POINT_ERROR,{user,password},{params})
   }
}
