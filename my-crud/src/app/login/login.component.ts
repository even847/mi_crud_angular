import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(protected authService: AuthService, protected router: Router) {
    this.myForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  resetForm() {
    this.myForm.reset();
  }

  login() {
    const user = this.myForm.value.user;
    const password = this.myForm.value.password;
    Swal.fire('Cargando')
    if (this.myForm.valid) {
      this.authService.getLogin(user, password).subscribe(
        (res) => this.redirectHome(),
        (error) => this.hasError()
      );
    }
  }

  redirectHome() {
    this.router.navigate(['/home']);
    Swal.close()
  }

  hasError() {
    Swal.fire('Ha Ocurrido un Error')
  }
}
