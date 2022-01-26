import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IContactSave } from 'src/app/models/IContact.model';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

   //fomulario reactivo
   myForm: FormGroup;

  constructor(protected crudService: CrudService,protected router:Router) { 
    this.myForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }


  back(){
    this.router.navigate(['/home'])
  }

  guardar(){
      //Levantamos modal loading
      Swal.fire({
        title: 'Cargando',
        text: 'Loading',
        showCancelButton: false,
        showConfirmButton: false,
      });


      //Obtenemos la data
      const nombre=this.myForm.value.nombre
      const apellido=this.myForm.value.apellido
      const telefono=this.myForm.value.telefono
      let contact:IContactSave={
        nombre,apellido,telefono
      }
    //Guardamos el registro
    this.crudService.createContact(contact).subscribe(res=>{
      Swal.close()
      Swal.fire('El usuario '+nombre+" "+apellido+" fue creado con éxito").then(e=>this.back());
    })
  }


}
