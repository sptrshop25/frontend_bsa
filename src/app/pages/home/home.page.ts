import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private route: Router) { }

  name: string = '';
  no_hp: string = '';
  email: string = '';
  count_courses: number = 0;
  count_student: number = 0;
  average_rating: number = 0; 
  isLoading: boolean = false;
  qrCodeImageUrl: string = '';
  balance: number = 0;
  pending_balance: number = 0;

  setName(response: any = null) { 
    if (response && response.data.data_user.user_name) { 
      this.name = response.data.data_user.user_name; 
    }
  }

  setNoHp(response: any = null) { 
    if (response && response.data.data_user.user_phone_number) { 
      this.no_hp = response.data.data_user.user_phone_number; 
    }
  }

  setBalance(response: any = null) { 
    if (response && response.data.teacher_balance && response.data.teacher_balance.length > 0) { 
      this.balance = response.data.teacher_balance[0].balance; 
    }
  }

  setPendingBalance(response: any = null) { 
    if (response && response.data.pending_balance && response.data.pending_balance.length > 0) { 
      this.pending_balance = response.data.pending_balance[0].balance; 
    }
  }

  setEmail(response: any = null) { 
    if (response && response.data.data_user.user.email) { 
      this.email = response.data.data_user.user.email; 
    }
  }

  setCountCoursesAndRating(response: any = null) { 
    if (response && response.data) { 
        const courses = response.data;
        this.count_courses = courses.length;

        if (this.count_courses > 0) {
            const validRatings = courses.filter((course: any) => course.course_rating !== null && course.course_rating > 0);
            const totalRating = validRatings.reduce((sum: number, course: any) => sum + parseFloat(course.course_rating), 0);
            this.average_rating = validRatings.length > 0 ? totalRating / validRatings.length : 0;
        } else {
            this.average_rating = 0;
        }
    }
}

  

  setCountStudents(response: any = null) { 
    if (response && response.data) { 
      const courses = response.data.course;
      let totalStudents = 0;

      courses.forEach((course: any) => {
        totalStudents += course.enrollment.length;
      });

      this.count_student = totalStudents;
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
      location.reload();
    }, 2000);
  }

  async generateQRCode() {
    try {
      const qrText = `Nama: ${this.name}, Email: ${this.email}`;
      const qrImageBase64 = await QRCode.toDataURL(qrText);
      this.qrCodeImageUrl = qrImageBase64;
      // console.log(qrText);
    } catch (error) {
      console.error('Gagal membuat QR Code', error);
    }
  }

  captureCard() {
    const cardElement = document.getElementById('cardToCapture');
    if (cardElement) {
      html2canvas(cardElement).then(canvas => {
        canvas.toBlob(blob => {
          if (blob) {
            saveAs(blob, 'card-image.png');
          }
        });
      });
    }
  }

  ngOnInit() {
    this.isLoading = true;

    axios.get(`${environment.apiUrl}/info_teacher`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
        'X-API-KEY': environment.bsaApiKey
      }
    })
    .then((response) => {
      console.log('Response:', response.data.course.enrollment);
      this.setCountStudents(response);
      this.setName(response);
      this.setNoHp(response);
      this.setEmail(response);
      this.setBalance(response);
      this.setPendingBalance(response);
      this.generateQRCode();
    })
    .catch((error) => {
      console.log('Error:', error);
    });

    axios.get(`${environment.apiUrl}/teacher/list-my-course`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
        'X-API-KEY': environment.bsaApiKey
      }
    })
    .then((response) => {
      // console.log('Response:', response);  
      this.setCountCoursesAndRating(response);
    })
    .catch((error) => {
      console.log('Error:', error);
    })
    .finally(() => {
      this.isLoading = false;
    });
  }

  goToManageCourse() {
    this.route.navigate(['/management-course']);
  }

  editTeacherProfile() {
    this.route.navigate(['/edit-teacher-profile']);
  }

  withdraw() {
    this.route.navigate(['/tarik-saldo']);
  } 

  studentManagement() {
    this.route.navigate(['/student-manajement']);
  }
}
