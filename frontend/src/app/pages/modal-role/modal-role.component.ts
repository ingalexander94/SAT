import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { showAlert } from 'src/app/helpers/alert';
import { Role } from '../../model/role';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-role',
  templateUrl: './modal-role.component.html',
  styleUrls: ['./modal-role.component.css'],
})
export class ModalRoleComponent implements OnInit {
  @Output() isClosed = new EventEmitter<boolean>();
  @Output() listRoles = new EventEmitter<any>();

  formRole: FormGroup;

  createFormRole(): FormGroup {
    return new FormGroup({
      role: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z]/i),
      ]),
    });
  }

  constructor(private authService: AuthService) {
    this.formRole = this.createFormRole();
  }
  get role() {
    return this.formRole.get('role');
  }

  ngOnInit(): void {}
  close() {
    this.isClosed.emit(false);
  }

  convert() {
    const text = this.formRole.get('role').value;
    const normalizeText = text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .split(' ');
    const camelCase = normalizeText
      .map((word, i) =>
        i > 0 ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : word
      )
      .join('');
    this.formRole.get('role').setValue(camelCase);
  }

  async onSubmit() {
    this.convert();
    const role: Role = this.formRole.value;
    const res = await this.authService.createRole(role);
    if (res.ok) {
      showAlert('success', 'El rol fue creado exitosamente');
      const role = {
        ...res.data,
        _id: res.data._id.$oid,
      };
      this.listRoles.emit(role);
      this.close();
    } else {
      this.formRole.reset();
      showAlert('error', 'El rol ya existe');
    }
  }

  onClick({ target }) {
    if (target.className === 'wrapper_alert') {
      this.close();
    }
  }
}
