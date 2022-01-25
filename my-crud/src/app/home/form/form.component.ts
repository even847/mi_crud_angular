import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(protected crudService: CrudService,protected router:Router) { }

  ngOnInit(): void {
  }


  back(){
    this.router.navigate(['/home'])
  }
}
