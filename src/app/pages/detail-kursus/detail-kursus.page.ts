import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-kursus',
  templateUrl: './detail-kursus.page.html',
  styleUrls: ['./detail-kursus.page.scss'],
})
export class DetailKursusPage implements OnInit {
  courseId: string = '';
  courseDetails: any;
  reviews: any[] = [
    {
      student_name: 'Nama Pelajar',
      date: '4/7/2024',
      rating: 3,
      comment: 'Kursus online Python ini sangat direkomendasikan...',
      teacher_response: 'Terima kasih banyak atas ulasan Anda yang sangat positif!...',
    },
  ];
  ratingDistribution = [
    { percentage: 98, value: 0.98, stars: 5 },
    { percentage: 70, value: 0.70, stars: 4 },
    { percentage: 45, value: 0.45, stars: 3 },
    { percentage: 10, value: 0.10, stars: 2 },
    { percentage: 5, value: 0.05, stars: 1 },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['course_id'];
      if (this.courseId) {
        this.getCourseDetails(this.courseId);
      }
    });
  }

  async getCourseDetails(courseId: string) {
    try {
      const response = await axios.get(`${environment.apiUrl}/detail-course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      console.log(response.data);
      
      this.courseDetails = response.data;
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  }
}
