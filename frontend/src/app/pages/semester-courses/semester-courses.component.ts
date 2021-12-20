import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BossService } from 'src/app/services/boss.service';

@Component({
  selector: 'app-semester-courses',
  templateUrl: './semester-courses.component.html',
  styleUrls: ['./semester-courses.component.css'],
})
export class SemesterCoursesComponent implements OnInit {
  semestres: any[] = [
    { nombre: 1 },
    { nombre: 2 },
    { nombre: 3 },
    { nombre: 4 },
    { nombre: 5 },
    { nombre: 6 },
    { nombre: 7 },
    { nombre: 8 },
    { nombre: 9 },
    { nombre: 10 },
    { nombre: 11 },
    { nombre: 12 },
    { nombre: 13 },
  ];
  courses: any = [];
  groups = [];
  showGroup: boolean = false;
  constructor(private bossService: BossService) {
    this.counterSemesterProgrmag();
  }

  ngOnInit(): void {}

  async counterSemesterProgrmag() {
    const numberSemester = await this.bossService.counterSemesterProgrmag();
    this.semestres.length = numberSemester.data.semestres;
    console.log(this.semestres);
  }

  async showSemesterCourse(e) {
    const i = e.target.value;
    console.log('semestre = ');
    const courses = await this.bossService.showSemesterCourses(i);
    courses.data.map((course) => (course.mostrar = false));

    if (courses.data) {
    
      const groups= this.showCoursesGroups(courses.data[i].codigo)
      courses.data.map((course) => {
        course.groups = groups;
      });
    }
    this.courses = courses.data;
    console.log(this.courses);
  }

  async showCoursesGroups(codigo: string) {
    const codeProgram = codigo.slice(0, -4);
    const codeCourse = codigo.slice(-4);
    const groups = await this.bossService.showCoursesGroups(
      codeProgram,
      codeCourse
    );
    this.groups = groups.data;

    console.log('grupos', this.groups);
  }
  showGroups(i) {
    this.courses[i].mostrar = !this.courses[i].mostrar;
  }
}
