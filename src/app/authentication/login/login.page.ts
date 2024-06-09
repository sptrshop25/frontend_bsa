import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../sign-up/sign-up.page.scss'],
})
export class LoginPage implements OnInit {
  formData = {
    email: '',
    password: '',
  };

  isLoading = false;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router
  ) {}

  async presentAlert() {
    let countdown = 3;
    const alert = await this.alertController.create({
      header: 'Login Berhasil',
      message: `Akan dialihkan ke halaman home dalam ${countdown} detik.`,
      buttons: [],
    });

    await alert.present();

    const interval = setInterval(() => {
      countdown--;
      alert.message = `Akan dialihkan ke halaman home dalam ${countdown} detik.`;
      if (countdown === 0) {
        clearInterval(interval);
        alert.dismiss();
        this.router.navigate(['/tab/tabs/home']);
      }
    }, 1000);
  }

  async errorAlert(messages?: string) {
    const alert = await this.alertController.create({
      header: 'Gagal',
      message: messages,
      buttons: ['Coba Lagi'],
    });

    await alert.present();
  }

  async successAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Sukses',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async errorVerifiedAlert(messages?: string) {
    const alert = await this.alertController.create({
      header: 'Gagal',
      message: messages,
      buttons: [
        {
          text: 'Kirim Ulang',
          handler: async () => {
            try {
              const response = await axios.post(`${environment.apiUrl}/resend/email`, {
                email: this.formData.email
              });
              this.successAlert('Konfirmasi email berhasil dikirim ulang, cek email anda dan lakukan verifikasi lalu login kembali');
            } catch (error) {
              this.errorAlert('Gagal mengirim ulang email konfirmasi. Silakan coba lagi nanti.');
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  register() {
    this.isLoading = true;
    axios
      .post(`${environment.apiUrl}/login`, this.formData)
      .then((response) => {
        console.log('Response:', response);

        if (response.data.Token) {
          this.saveToken(response.data.Token);
          localStorage.setItem('userId', response.data.UserId);
        }
        this.presentAlert();
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === 'Email or password is incorrect'
        ) {
          this.errorAlert('Email atau Password salah');
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message === 'Email not verified'
        ) {
          this.errorVerifiedAlert('Email belum terverifikasi, lakukan verifikasi dengan klik link yang dikirimkan ke email anda. Jika belum menerima email, silahkan kirim ulang klik tombol kirim ulang');
        } else {
          this.errorAlert('Terjadi kesalahan');
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isFormValid() {
    return !!this.formData.email && this.isEmailValid;
  }

  isEmailValid: boolean = true;

  validateEmail() {
    const email = this.formData.email;
    const emailCriteria = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isEmailValid = emailCriteria.test(email);
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    this.formData.email = '';
    this.formData.password = '';
    // if (localStorage.getItem('authToken')) {
    //   this.router.navigate(['/home']);
    // }
  }
}
