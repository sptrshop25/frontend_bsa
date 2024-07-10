import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

interface Course {
  course_id: string;
  course_title: string;
  namaPelajar: string; // Menambahkan properti namaPelajar untuk menampung nama pengguna pelajar
  enrollment: any[]; // Kamu bisa menyesuaikan struktur ini sesuai kebutuhan
  // Tambahkan properti lain yang dibutuhkan
}

@Component({
  selector: 'app-student-manajement',
  templateUrl: './student-manajement.page.html',
  styleUrls: ['./student-manajement.page.scss'],
})
export class StudentManajementPage implements OnInit {
  searchTerm: string = '';
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  constructor() { }

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    axios.get<any[]>(`${environment.apiUrl}/list-student-course`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
        'X-API-KEY': environment.bsaApiKey,
      }
    })
      .then(response => {
        this.courses = response.data.filter(course => course.enrollment.length > 0)
                                   .map(course => ({
                                      course_id: course.course_id,
                                      course_title: course.course_title,
                                      namaPelajar: course.enrollment[0].data_user[0].user_name, // Ambil nama pelajar dari data_user
                                      enrollment: course.enrollment
                                    }));
        this.filteredCourses = this.courses; 
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }

  filterItems() {
    this.filteredCourses = this.courses.filter(course => {
      return course.course_title.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}
