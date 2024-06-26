import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

interface Course {
  id: string;
  title: string;
  teacher: string;
  image: string;
  progress: number;
  progressDetail: string;
  completedCount: number;
  courseMaterials: CourseMaterial[];
  activePeriod: any;
  status: string;
}

interface CourseMaterial {
  materialId: string;
}

@Component({
  selector: 'app-kursus-saya',
  templateUrl: './kursus-saya.page.html',
  styleUrls: ['./kursus-saya.page.scss'],
})
export class KursusSayaPage implements OnInit {
  segmentValue = 'all';
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchCourseData();
  }

  fetchCourseData() {
    axios.get(`${environment.apiUrl}/my-course`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => {
        const data = response.data; 
        this.courses = data.map((courseData: any) => this.mapCourseData(courseData));
        this.filterCourses();
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }

  mapCourseData(courseData: any): Course {
    // console.log(courseData.active_period);
    
    const totalMaterials = courseData.material_bab.reduce((acc: number, bab: any) => acc + bab.course_materials.length, 0);
    const progress = courseData.completed_count / totalMaterials;
    return {
      id: courseData.course_id,
      title: courseData.course.course_title,
      teacher: courseData.teacher,
      image: courseData.course.course_image,
      progress: progress,
      progressDetail: `${courseData.completed_count}/${totalMaterials}`,
      completedCount: courseData.completed_count,
      courseMaterials: this.extractCourseMaterials(courseData.material_bab),
      activePeriod: courseData.active_period,
      status: courseData.status
    };
  }

  extractCourseMaterials(materialBab: any[]): CourseMaterial[] {
    return materialBab.flatMap(bab =>
      bab.course_materials.map((material: any) => ({
        materialId: material.material_id,
      }))
    );
  }

  segmentChanged(event: any) {
    this.filterCourses();
  }

  filterCourses() {
    if (this.segmentValue === 'all') {
      this.filteredCourses = this.courses;
    } else if (this.segmentValue === 'in-progress') {
      this.filteredCourses = this.courses.filter(course => course.progress < 1);
    } else if (this.segmentValue === 'completed') {
      this.filteredCourses = this.courses.filter(course => course.progress === 1);
    }
  }

  navigateToDetail(materialId: string, status: string) {
    if (status !== 'inactive') {
      this.router.navigate(['/detail-my-course'], { queryParams: { material_id: materialId } });
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'inactive':
        return 'Tidak aktif';
      case 'completed':
        return 'Selesai';
      default:
        return '';
    }
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'inactive':
        return 'bg-danger';
      case 'completed':
        return 'bg-purple';
      default:
        return '';
    }
  }
  
}
