// detail-kursus-saya.page.ts

import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-kursus-saya',
  templateUrl: './detail-kursus-saya.page.html',
  styleUrls: ['./detail-kursus-saya.page.scss'],
})
export class DetailKursusSayaPage implements OnInit {

  courses: any[] = [];
  title_course: string = '';
  segmentValue = 'custom';
  isMaterialSuccessEmpty = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const materialId = this.route.snapshot.queryParamMap.get('material_id');
    // console.log('materialId:', materialId);
    
    this.fetchCourses(materialId);
  }

  segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
  }

  detailMaterial(materialId: string) {
    this.router.navigate(['/detail-material', { material_id: materialId, course_id: this.route.snapshot.queryParamMap.get('material_id') }]);
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
        this.title_course = response.data.course.course_title;
        this.checkMaterialSuccessEmpty();
      } else {
        console.error('Invalid response structure');
      }
    })
    .catch((error) => {
      console.error('Error fetching courses:', error);
    });
  }

  isMaterialSuccessNotEmpty(material: any): boolean {
    return material.material_success && material.material_success.length > 0;
  }

  checkMaterialSuccessEmpty() {
    this.isMaterialSuccessEmpty = this.courses.every(course => !this.isMaterialSuccessNotEmpty(course));
  }

  isSegmentDisabled(): boolean {
    return this.isMaterialSuccessEmpty;
  }
}
