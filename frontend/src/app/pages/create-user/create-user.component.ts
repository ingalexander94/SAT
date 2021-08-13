import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  formCreateUser: FormGroup;

  createFormCreateUser(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      document: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/i),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/i),
      ]),
      role: new FormControl('', [Validators.required]),
    });
  }

  constructor() {
    this.formCreateUser = this.createFormCreateUser();
  }

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.formCreateUser.value);
  }

  get name() {
    return this.formCreateUser.get('name');
  }
  get surname() {
    return this.formCreateUser.get('surname');
  }
  get type() {
    return this.formCreateUser.get('type');
  }
  get document() {
    return this.formCreateUser.get('document');
  }

  get email() {
    return this.formCreateUser.get('email');
  }

  get phone() {
    return this.formCreateUser.get('phone');
  }
  get role() {
    return this.formCreateUser.get('role');
  }
}
