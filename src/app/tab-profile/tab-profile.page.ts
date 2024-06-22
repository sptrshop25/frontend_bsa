import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tab-profile',
  templateUrl: './tab-profile.page.html',
  styleUrls: ['./tab-profile.page.scss'],
})
export class TabProfilePage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) {
    this.setName();
    this.setPhone();
    this.setEmail();
    this.setNickname();
    this.setUserActive();
    this.statusTeacher();
  }

  name: string = '';
  phone: string = '';
  email: string = '';
  nickname: string = '';
  user_active: string = '';
  is_teacher: string = '';

  isLoading: boolean = false;
  
  async presentLogoutConfirm() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin akan keluar?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Logout dibatalkan');
          }
        }, {
          text: 'Keluar',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/login']); 
  }
  
  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
      location.reload();
    }, 2000);
  }

  setName(response: any = null) {
    if (response && response.data.data_user.user_name) { 
      this.name = response.data.data_user.user_name; 
    }
  }

  setPhone(response: any = null) {
    if (response && response.data.data_user.user_phone_number) { 
      this.phone = response.data.data_user.user_phone_number; 
    }
  }

  setEmail(response: any = null) {
    if (response && response.data.email) { 
      this.email = response.data.email; 
    }
  }

  setNickname(response: any = null) {
    if (response && response.data.data_user.user_nickname) { 
      this.nickname = response.data.data_user.user_nickname; 
    }
  }

  setUserActive(response: any = null) {
    if (response && response.data.user_status) { 
      this.user_active = response.data.user_status; 
    }
  }

  statusTeacher(response: any = null) {
    if (response && response.data.user_teacher) { 
      this.is_teacher = response.data.user_teacher; 
    }
  }

  manageCourse() {
    this.router.navigate(['/manage-course']);
  }

  registerTeacher(){
    this.router.navigate(['/teacher-register'])
  }
  
  wishlist() {
    this.router.navigate(['/wishlist']);
  }
  
  ngOnInit() {
    axios.post(`${environment.apiUrl}/info_user`, null, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`
      }
    })
    .then((response) => {
      console.log('Response:', response);
      this.setNickname(response); 
      this.setPhone(response);
      this.setName(response);
      this.setUserActive(response);
      this.statusTeacher(response);
      this.setEmail(response);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      this.isLoading = false;
    });    
  }

}
