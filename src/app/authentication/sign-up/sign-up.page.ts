import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  formData = {
    email: '',
    password: '',
    fullname: '',
    nickname: '',
    gender: '',
    phone: ''
  };
  
  token = '1395a7e8110da037f48dbf031b71e82d62121b1a8e809bef601885bd7706794f';

  constructor(private http: HttpClient, private alertController: AlertController, private router: Router) { }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Berhasil',
      message: 'Selamat Akun Anda Berhasil Dibuat',
      buttons: [
        {
          text: 'Lanjut Login',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
  
    await alert.present();
  }
  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Gagal',
      message: 'Gagal Membuat Akun, Email Sudah Terdaftar',
      buttons: ['Coba Lagi'],
    });
  
    await alert.present();
  }
  

  register() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post('https://7685-110-138-89-145.ngrok-free.app/api/register', this.formData, { headers })
      .subscribe((response) => {
        console.log('Response:', response);
        this.presentAlert();
      }, (error) => {
        console.error('Error:', error);
        this.errorAlert();
      });
  }
  isFormValid() {
    return !!this.formData.email && !!this.formData.password && !!this.formData.fullname && !!this.formData.nickname && !!this.formData.gender && !!this.formData.phone;
  }
  ngOnInit() {
  }

}
