import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/auth';
import { Postulation } from 'src/app/model/risk';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-validate-postulation',
  templateUrl: './validate-postulation.component.html',
  styleUrls: ['./validate-postulation.component.css'],
})
export class ValidatePostulationComponent implements OnInit {
  @Input() user: User;
  @Input() userShow: User;
  showDescription: boolean = false;
  postulation: Postulation = null;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    const { programa, correo, rol, nombre, apellido, codigo } = this.userShow;
    const data = {
      student: {
        programa,
        codigo,
        correo,
        rol,
        nombre: `${nombre} ${apellido}`,
      },
      isActive: true,
    };
    this.validate(data);
  }

  updateShowDescription(show: boolean = true) {
    this.showDescription = show;
  }

  async validate(data) {
    const postulation = await this.studentService.validatePostulation(data);
    this.postulation = postulation;
  }
}
