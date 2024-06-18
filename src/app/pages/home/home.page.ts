import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  name: string = '';
  no_hp: string = '';
  email: string = '';
  count_courses: number = 0;
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
    if (response && response.data.balance) { 
      this.balance = response.data.balance; 
    }
  }

  setPendingBalance(response: any = null) { 
    if (response && response.data.pb_balance) { 
      this.pending_balance = response.data.pb_balance; 
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
        const validRatings = courses.filter((course: any) => course.course_rating !== null && course.course_rating !== undefined);
        const totalRating = validRatings.reduce((sum: number, course: any) => sum + course.course_rating, 0);
        this.average_rating = validRatings.length > 0 ? totalRating / validRatings.length : 0;
      } else {
        this.average_rating = 0;
      }
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
      console.log(qrText);
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
        Authorization: `${localStorage.getItem('authToken')}`
      }
    })
    .then((response) => {
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

    axios.post(`${environment.apiUrl}/get_my_courses`, null, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`
      }
    })
    .then((response) => {
      console.log('Response:', response);  
      this.setCountCoursesAndRating(response);
    })
    .catch((error) => {
      console.log('Error:', error);
    })
    .finally(() => {
      this.isLoading = false;
    });
  }
}
