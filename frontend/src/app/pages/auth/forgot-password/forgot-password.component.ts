import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {
    this.formForgot = this.createFormLogin();
  }

  ngOnInit(): void {}

  onSubmit() {}

  get email() {
    return this.formForgot.get('email');
  }
}
