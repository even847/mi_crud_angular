import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { TokenInterceptorService } from '../interceptors/token-interceptor.service';
import ITokenResponse from '../models/ITokenResponse.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  //fomulario reactivo
  myForm: FormGroup;

  constructor(protected authService: AuthService, protected router: Router) {
    this.myForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  //resetea el form
  resetForm() {
    this.myForm.reset();
  }

  //se ececuta desde el html
  login() {
    //tomamos el user y password
    const user = this.myForm.value.user;
    const password = this.myForm.value.password;
    //Levantamos modal loading
    Swal.fire({
      title: 'Cargando',
      text: 'Loading',
      showCancelButton: false,
      showConfirmButton: false,
    });
    //si el form es valido
    if (this.myForm.valid) {
      //fetch al servicio de auth
      this.authService.getLogin(user, password).subscribe(
        //si todo ok
        (res) => this.redirectHome(res),
        //si ocurre error
        (error) => this.hasError()
      );
    }
  }

  //esta funcio se ejecuta en caso de todo OK al generar el token
  redirectHome(res: ITokenResponse) {
    //guardamos el token en el local store, para q lo lea el interCeptorToken
    localStorage.setItem('token', JSON.stringify(res.bearer));
    //redireccion
    this.router.navigate(['/home']);
    //cerrar el modal
    Swal.close();
  }

  //esta funcio se ejecuta en caso de Error al generar el token
  hasError() {
    Swal.fire('Ha Ocurrido un Error');
  }
}
