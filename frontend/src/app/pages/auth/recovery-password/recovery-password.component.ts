import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
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
import { ActivatedRoute, Router } from '@angular/router';
import { showAlert } from 'src/app/helpers/alert';
import { saveInLocalStorage } from 'src/app/helpers/localStorage';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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

  async onSubmit() {
    const password = this.formRecovery.value;
    delete password.confirmPassword;
    const token = this.route.snapshot.paramMap.get('token');
    localStorage.setItem('x-token', token);
    const res = await this.authService.updatePassword(password);
    if (!res) {
      showAlert('error', 'la contraseña no coiciden');
    } else {
      localStorage.clear();
      this.router.navigate(['/administrativo/iniciar-sesion']);
      showAlert('success', 'Contraseña Actualizada');
    }
  }

  get newPassword() {
    return this.formRecovery.get('newPassword');
  }

  get confirmPassword() {
    return this.formRecovery.get('confirmPassword');
  }
}
