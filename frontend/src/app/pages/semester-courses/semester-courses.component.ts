import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BossService } from 'src/app/services/boss.service';

@Component({
  selector: 'app-semester-courses',
  templateUrl: './semester-courses.component.html',
  styleUrls: ['./semester-courses.component.css'],
})
export class SemesterCoursesComponent implements OnInit {
  romanos: String[] = [
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'XI',
    'XII',
    'XIII',
  ];
  courses = [];
  groups = [];
  constructor(private bossService: BossService) {
    this.counterSemesterProgrmag();
  }

  ngOnInit(): void {}

  async counterSemesterProgrmag() {
    const numberSemester = await this.bossService.counterSemesterProgrmag();
    this.romanos.length = numberSemester.data.semestres;
  }

  async showSemesterCourse(semester: number) {
    console.log('semestre = ', semester);
    const courses = await this.bossService.showSemesterCourses(semester);
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
}
