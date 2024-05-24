import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';

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
      buttons: []
    });

    await alert.present();

    const interval = setInterval(() => {
      countdown--;
      alert.message = `Akan dialihkan ke halaman home dalam ${countdown} detik.`;
      if (countdown === 0) {
        clearInterval(interval);
        alert.dismiss();
        this.router.navigate(['/home']);
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

  register() {
    this.isLoading = true;
    axios
      .post('https://d226-114-10-113-78.ngrok-free.app/api/login', this.formData)
      .then((response) => {
        if (response.data.Token) {
          this.saveToken(response.data.Token);
        }
        this.presentAlert();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message === "Email or password is incorrect") {
          this.errorAlert('Email atau Password salah');
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
    return (
      !!this.formData.email &&
      this.isEmailValid
    );
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
  }
}
