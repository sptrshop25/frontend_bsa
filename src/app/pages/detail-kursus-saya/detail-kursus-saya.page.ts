// detail-kursus-saya.page.ts

import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-kursus-saya',
  templateUrl: './detail-kursus-saya.page.html',
  styleUrls: ['./detail-kursus-saya.page.scss'],
})
export class DetailKursusSayaPage implements OnInit {

  courses: any[] = [];
  segmentValue = 'custom';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const materialId = this.route.snapshot.queryParamMap.get('material_id');
    // console.log('materialId:', materialId);
    
    this.fetchCourses(materialId);
  }

  segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
  }

  fetchCourses(materialId : string | null) {
    axios.get(`${environment.apiUrl}/detail-course/${materialId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    .then((response) => {
      console.log('Response:', response.data);
      if (response.data && response.data.course && response.data.course.material_bab) {
        this.courses = response.data.course.material_bab;
      } else {
        console.error('Invalid response structure');
      }
    })
    .catch((error) => {
      console.error('Error fetching courses:', error);
    });
  }
}
