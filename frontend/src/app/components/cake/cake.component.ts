import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { showAlert } from 'src/app/helpers/alert';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css'],
})
export class CakeComponent implements OnInit {
  view: [number, number] = [700, 200];
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  loading: boolean = false;
  show: boolean = false;
  averageScore: number = 0;
  exam: String = '1p';

  colorScheme: any = {
    domain: ['#14c25a', '#ff8300', '#bb0b20', '#353343'],
  };

  single = [
    {
      name: '> 4,0',
      value: 0,
    },
    {
      name: '> 3,0',
      value: 0,
    },
    {
      name: '< 3,0',
      value: 0,
    },
    {
      name: '0,0',
      value: 0,
    },
  ];

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getNotes(this.exam);
  }

  async getNotes(exam: String) {
    this.loading = true;
    this.exam = exam;
    const code = this.route.snapshot.paramMap.get('code');
    const group = this.route.snapshot.paramMap.get('group');
    const courseInfo = { code, group, exam };
    const res = await this.teacherService.getNotesCourse(courseInfo);
    if (res.ok) {
      const { aprobados, reprobados, excelente, SinPresentar, promedio } =
        res.data;
      this.single[0].value = excelente;
      this.single[1].value = aprobados;
      this.single[2].value = reprobados;
      this.single[3].value = SinPresentar;
      this.averageScore = promedio;
      this.show = true;
    } else {
      showAlert('error', 'No hay notas disponibles');
      this.show = false;
    }
    this.loading = false;
  }

  changeShow() {
    !this.exam ? this.getNotes('1p') : (this.show = !this.show);
  }
}
