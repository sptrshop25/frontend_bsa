import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

interface Course {
  course_id: string;
  course_title: string;
  course_description: string;
  course_price: number;
  course_image: string;
  course_rating: string;
}

@Component({
  selector: 'app-manajemen-kursus',
  templateUrl: './manajemen-kursus.page.html',
  styleUrls: ['./manajemen-kursus.page.scss'],
})
export class ManajemenKursusPage implements OnInit {
  courses: Course[] = [];
  noCoursesMessage = '';

  constructor(private route: Router) { }

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    const apiUrl = `${environment.apiUrl}/teacher/list-my-course`;
    axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => {
        this.courses = response.data;
        if (this.courses.length === 0) {
          this.noCoursesMessage = 'Belum ada kursus yang dibuat, yuk mulai buat kursusmu!';
        } else {
          this.noCoursesMessage = '';
        }
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }

  addCourse() {
    this.route.navigate(['/form-course']);
  }
}
