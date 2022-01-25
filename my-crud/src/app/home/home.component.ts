import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CrudService } from '../services/crud.service';
import IContact from '../models/IContact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contacts: IContact[] = [];

  constructor(protected crudService: CrudService,protected router:Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    //Get de todos los contactos
    this.crudService.getAllContacts().subscribe(
      (res) => (this.contacts = res.contacts),
      (error) => console.log(error)
    );
  }

  delete(contact: IContact) {
    //eliminarlo localmente
    this.contacts= this.contacts.filter((cont) => cont.id !== contact.id);
    //Fetch para borrarlo del backend
    this.crudService.deleteContact(contact.id)
  }

  crearContact(){
    this.router.navigate(['home/form'])
  }
}
