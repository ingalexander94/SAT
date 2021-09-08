import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { showAlert } from 'src/app/helpers/alert';
import { User } from 'src/app/model/auth';
import { Role } from 'src/app/model/role';
import { AuthService } from 'src/app/services/auth.service';
import { WellnessService } from 'src/app/services/wellness.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  formCreateUser: FormGroup;
  loading: Boolean = false;
  create: Boolean = false;
  roles: Role[] = [];
  subscription: Subscription = new Subscription();

  createFormCreateUser(): FormGroup {
    return new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      tipoDocumento: new FormControl('cedulaCiudadania', Validators.required),
      documento: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/i),
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/i),
      ]),
      rol: new FormControl('', [Validators.required]),
    });
  }

  constructor(
    private wellnessService: WellnessService,
    private authService: AuthService
  ) {
    this.formCreateUser = this.createFormCreateUser();
  }

  ngOnInit(): void {
    this.listRoles();
  }

  async onSubmit() {
    this.loading = true;
    if (!this.formCreateUser.invalid) {
      const user: User = this.formCreateUser.value;
      user.fechaIngreso = new Date().toISOString();
      const res = await this.wellnessService.createUser(user);
      if (!res) showAlert('error', 'No se pudo crear la cuenta');
      else {
        showAlert('success', 'Cuenta creada con exito');
        this.formCreateUser.reset();
      }
    }
    this.loading = false;
  }

  get nombre() {
    return this.formCreateUser.get('nombre');
  }

  get apellido() {
    return this.formCreateUser.get('apellido');
  }

  get tipoDocumento() {
    return this.formCreateUser.get('tipoDocumento');
  }

  get documento() {
    return this.formCreateUser.get('documento');
  }

  get correo() {
    return this.formCreateUser.get('correo');
  }

  get telefono() {
    return this.formCreateUser.get('telefono');
  }

  get rol() {
    return this.formCreateUser.get('rol');
  }

  createRole(answer: boolean = true) {
    this.create = answer;
  }
  addRole(res) {
    const role = {
      _id: res._id,
      role: res.role
        .split('')
        .map((letra) => (/^[A-Z]*$/.test(letra) ? [' ', letra] : letra))
        .flat()
        .join('')
        .toUpperCase(),
    };
    this.roles = [role, ...this.roles];
  }

  async listRoles() {
    const res = await this.authService.listRoles();
    const roles = res.map((rol) => ({
      _id: rol._id.$oid,
      role: rol.role
        .split('')
        .map((letra) =>
          /^[A-Z]*$/.test(letra) ? [' ', letra].join('') : letra
        )
        .join('')
        .toUpperCase(),
    }));
    this.roles = roles;
  }
}
