import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { ModalController, AlertController, NavController } from '@ionic/angular';

interface Course {
  id: string;
  title: string;
  teacher: string;
  image: string;
  progress: number;
  progressDetail: string;
  completedCount: number;
  courseMaterials: CourseMaterial[];
  activePeriod: any; // Sesuaikan dengan tipe yang sesuai dari server Laravel
  status: string;
  price: number;
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

  constructor(
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    if (localStorage.getItem('authToken')) {
      this.fetchCourseData();
    } else {
      this.alertToLogin();
    }
  }

  fetchCourseData() {
    axios.get(`${environment.apiUrl}/my-course`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
        'X-API-KEY': environment.bsaApiKey
      }
    })
      .then(response => {
        const data = response.data; 
        this.courses = data.map((courseData: any) => this.mapCourseData(courseData));
        this.filterCourses();
        this.loadActivePeriods(); // Panggil fungsi untuk memuat tanggal aktif kursus
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }

  async loadActivePeriods() {
    // Ambil setiap detail kursus yang belum memiliki data aktif periode
    const requests = this.courses
      .filter(course => !course.activePeriod)
      .map(course => this.fetchActivePeriod(course.id));

    // Tunggu semua permintaan selesai
    await Promise.all(requests);
  }

  async fetchActivePeriod(courseId: string) {
    try {
      const response = await axios.get(`${environment.apiUrl}/get-active-period/${courseId}`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey
        }
      });
      const activePeriodDate = response.data.active_period;
      // Update course dengan active_period yang diperoleh
      const courseToUpdate = this.courses.find(course => course.id === courseId);
      if (courseToUpdate) {
        courseToUpdate.activePeriod = activePeriodDate;
      }
    } catch (error) {
      console.error(`Error fetching active period for course ${courseId}:`, error);
    }
  }

  mapCourseData(courseData: any): Course {
    const totalMaterials = courseData.material_bab.reduce((acc: number, bab: any) => acc + bab.course_materials.length, 0);
    const progress = courseData.completed_count / totalMaterials;
    return {
      id: courseData.course_id,
      title: courseData.course.course_title,
      teacher: courseData.teacher,
      price: courseData.course.course_price,
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

  async navigateToDetail(materialId: string, status: string, courseId: string, price: number) {
    if (status === 'inactive') {
      if (price === 0) {
        axios.post(`${environment.apiUrl}/extend-course`, {
          'course_id': courseId,
        }, {
          headers: {
            Authorization: `${localStorage.getItem('authToken')}`,
            'X-API-KEY': environment.bsaApiKey
          }
        })
          .then(response => {
            this.presentAlert(response.data.message);
            this.fetchCourseData();
          })
          .catch(error => {
            console.error('Error extending course:', error);
            this.presentAlert("Terjadi kesalahan, silahkan coba lagi");
          });
      } else {
        this.router.navigate(['payment'], { queryParams: { course_id: courseId } });
      }
    } else {
      this.router.navigate(['/detail-my-course'], { queryParams: { material_id: materialId } });
    }
  }

  getActivePeriodDate(status: string): string {
    switch (status) {
      case 'active':
        return 'Aktif selamanya'; 
      default:
        return ''; 
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
  
  async presentAlert(message: string) {
    const modal = await this.modalController.create({
      component: CustomAlertComponent,
      componentProps: {
        message: message
      },
      backdropDismiss: false
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.goToLogin) {
        this.router.navigate(['/my-course']);
      }
    });

    await modal.present();
  }

  async errorAlert(messages?: string) {
    const alert = await this.alertController.create({
      header: 'Gagal',
      message: messages,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertToLogin() {
    const alert = await this.alertController.create({
      header: 'Gagal',
      message:
        'Untuk melihat halaman kursus, silahkan login terlebih dahulu',
      buttons: [
        {
          text: 'Login Sekarang',
          handler: () => {
            this.navCtrl.navigateForward('/login');
          },
        },
      ],
    });
    await alert.present();
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('authToken')) {
      return true;
    } else {
      return false;
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
