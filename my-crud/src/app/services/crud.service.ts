import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import IContact from '../models/IContact.model';
import IResponseContacts from '../models/IContact.model';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  //Mock De crud
  END_POINT_ALL_CONTACTS: string =
    'https://run.mocky.io/v3/f18a49f0-5cc2-4186-b7ad-e1f4f1077000';

  constructor(protected http: HttpClient) {}

  //Retorna un array de contactos
  getAllContacts(): Observable<IResponseContacts> {
    return this.http.get<IResponseContacts>(`${this.END_POINT_ALL_CONTACTS}`);
  }

  //deletea un contacto
  deleteContact(id: number): Observable<any> {
    console.log('Fetch para que se borre en el backen el registro', id);
    return this.http.delete(`${this.END_POINT_ALL_CONTACTS}/${id}`);
  }

  //crear un contacto
  createContact(contact: IContact): Observable<IContact> {
    return this.http.post<IContact>(`${this.END_POINT_ALL_CONTACTS}`, {
      contact,
    });
  }

  //Edita un contacto
  editContact(contact: IContact, id: number): Observable<IContact> {
    return this.http.put<IContact>(`${this.END_POINT_ALL_CONTACTS}/${id}`, {
      contact,
    });
  }

  //Busca por id
  getById(id: number): Observable<IContact> {
    return this.http.get<IContact>(`${this.END_POINT_ALL_CONTACTS}/${id}`);
  }
}
