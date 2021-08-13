import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css'],
})
export class RecoveryPasswordComponent implements OnInit {
  formRecovery: FormGroup;
  loading: boolean = false;
  showPassword: boolean = false;
  typePassword: String = 'password';
  showPassword2: boolean = false;
  typePassword2: String = 'password';

  constructor(private formBuilder: FormBuilder) {
    this.formRecovery = this.createFormLogin();
  }

  createFormLogin(): FormGroup {
    return this.formBuilder.group(
      {
        newPassword: new FormControl('0000', [
          Validators.required,
          Validators.minLength(4),
        ]),
        confirmPassword: new FormControl('0000', [
          Validators.required,
          Validators.minLength(4),
        ]),
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };

  ngOnInit(): void {}

  changeShowPassword() {
    this.showPassword = !this.showPassword;
    this.typePassword = this.showPassword ? 'text' : 'password';
  }

  changeShowPassword2() {
    this.showPassword2 = !this.showPassword2;
    this.typePassword2 = this.showPassword2 ? 'text' : 'password';
  }

  onSubmit() {}

  get newPassword() {
    return this.formRecovery.get('newPassword');
  }

  get confirmPassword() {
    return this.formRecovery.get('confirmPassword');
  }
}
