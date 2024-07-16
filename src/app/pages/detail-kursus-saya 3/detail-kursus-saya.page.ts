import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { last } from 'rxjs';


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

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    
  ) { 
    
  }


  ngOnInit() {
    const materialId = this.route.snapshot.queryParamMap.get('material_id');
    this.fetchCourses(materialId); 
  }
  myname = localStorage.getItem("myname");

  year:any;
  
  checkCourseFinish(materialBab: any) {
    const materialBabLength = materialBab.length;
    let materialSuccessLength = 0;
    let lastSuccessYear: number | null = null;
  
    materialBab.forEach((bab: any) => {
      bab.course_materials.forEach((material: any) => {
        if (material.material_success) {
          materialSuccessLength += material.material_success.length;
          const lastSuccess = material.material_success[material.material_success.length - 1];
          if (lastSuccess) {
            const lastSuccessDate = new Date(lastSuccess.created_at);
            lastSuccessYear = lastSuccessDate.getFullYear();
          }
        }
      });
    });
  
    if (materialBabLength === materialSuccessLength) {
      console.log('Length of material_bab is equal to length of material_success');
      this.isMaterialSuccessEmpty = !this.isMaterialSuccessEmpty;
  
      
      if (lastSuccessYear) {
        console.log('Year of the last material_success:', lastSuccessYear);
        this.year = lastSuccessYear;
      } else {
        console.log('No material_success found');
      }
    } else {
      console.log('Length of material_bab is not equal to length of material_success');
    }
  }
  
  detailQuiz(quizId: string) {
    this.router.navigate(['/start-quiz', { quiz_id: quizId }]);
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
        Authorization: `${localStorage.getItem('authToken')}`,
        'X-API-KEY': environment.bsaApiKey,
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
    this.checkCourseFinish(this.courses);
    
  }

  isSegmentDisabled(): boolean {
    return this.isMaterialSuccessEmpty;
  }

  generatePNG() {
    
  
    setTimeout(() => {
      const data: any = document.getElementById('certificate');
      if (data) {
        const options = {
          scale: 5, // sesuaikan dengan skala yang diperlukan
          
        };
  
        html2canvas(data, options).then((canvas) => {
          const contentDataURL = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = contentDataURL;
          link.download = 'Certificate.png';
          link.click();
        }).catch(error => {
          console.error('Error generating canvas:', error);
        });
      } else {
        console.error('Element not found: certificate');
      }
    }, 1000); // waktu tunggu dapat disesuaikan
  }
  isPreviousMaterialCompleted(courseIndex: number, materialIndex: number): boolean {
    // Jika materi pertama dari bab pertama, tidak perlu mengecek materi sebelumnya
    if (courseIndex === 0 && materialIndex === 0) {
      return true;
    }

    // Cek materi sebelumnya dalam bab yang sama
    if (materialIndex > 0) {
      const previousMaterial = this.courses[courseIndex].course_materials[materialIndex - 1];
      return this.isMaterialSuccessNotEmpty(previousMaterial);
    }

    // Cek materi terakhir dari bab sebelumnya
    if (courseIndex > 0) {
      const previousCourse = this.courses[courseIndex - 1];
      const lastMaterialInPreviousCourse = previousCourse.course_materials[previousCourse.course_materials.length - 1];
      return this.isMaterialSuccessNotEmpty(lastMaterialInPreviousCourse);
    }

    return false;
  }
}
