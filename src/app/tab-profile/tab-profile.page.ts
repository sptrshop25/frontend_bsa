import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tab-profile',
  templateUrl: './tab-profile.page.html',
  styleUrls: ['./tab-profile.page.scss'],
})
export class TabProfilePage implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private modalController: ModalController, private navCtrl: NavController, private ref: ChangeDetectorRef) {
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
  image_profile: string = '';
  user_active: string = '';
  is_teacher: string = '';

  isLoading: boolean = false;
  
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
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

  async alertToLogin() {
    const alert = await this.alertController.create({
      header: 'Gagal',
      message:
        'Untuk melihat halaman profil, silahkan login terlebih dahulu',
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

  setImageProfile(response: any = null) {
    // if (response && response.data.data_user.user_image_profile) { 
      this.image_profile = response.data.data_user.user_profile_picture; 
    // }
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
    if (localStorage.getItem('authToken')) {
      axios.get(`${environment.apiUrl}/info_user`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        }
      })
      .then((response) => {
        this.setNickname(response); 
        this.setPhone(response);
        this.setName(response);
        this.setUserActive(response);
        this.statusTeacher(response);
        this.setEmail(response);
        this.setImageProfile(response);
        // console.log(response.data.data_user.user_profile_picture);
        
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });    
    } else {
      this.alertToLogin();
    }
  }

  isLoggedIn() {
    if (localStorage.getItem('authToken')) {
      return true;
    } else {
      return false;
    }
  }

  helpCenter() {
    this.router.navigate(['/help-center']);
  }

  editProfile() {
    this.router.navigate(['/change-profile']);
  }

  faq() {
    this.router.navigate(['/faq']);
  }
}
