import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { showAlert } from 'src/app/helpers/alert';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  formForgot: FormGroup;
  loading: boolean = false;

  createFormLogin(): FormGroup {
    return new FormGroup({
      email: new FormControl('niverdromero12@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  constructor(private authService: AuthService, private router: Router) {
    this.formForgot = this.createFormLogin();
  }

  ngOnInit(): void {}

  async onSubmit() {
    const email = this.formForgot.value;
    const res = await this.authService.sendEmailUpdatePassword(email);
    if (!res) {
      showAlert('error', 'No se pudo recuperar la contraseña');
    } else {
      this.router.navigate(['/administrativo/iniciar-sesion']);
      showAlert('success', 'Revise su correo para continuar con el proceso');
    }
  }

  get email() {
    return this.formForgot.get('email');
  }
}
