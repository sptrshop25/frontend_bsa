import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.page.html',
  styleUrls: ['./teacher-register.page.scss'],
})
export class TeacherRegisterPage implements OnInit {

  constructor() { }

  teacherData: any[] = [{ gelar: '', sekolah: '', jurusan: '', tahun: '' }];
  pengalamanData: string[] = [''];

  addPendidikan() {
    this.teacherData.push({ gelar: '', sekolah: '', jurusan: '', tahun: '' });
  }

  addPengalaman() {
    this.pengalamanData.push('');
  }
  ngOnInit() {
  }

}
