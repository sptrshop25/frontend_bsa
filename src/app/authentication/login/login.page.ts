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

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login Berhasil',
      message: 'Selamat Anda Berhasil Login',
      buttons: [
        {
          text: 'Go to Home',
          handler: () => {
            this.router.navigate(['/home']);
          },
        },
      ],
    });

    await alert.present();
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
    axios
      .post('https://d9c7-203-130-212-204.ngrok-free.app/api/login', this.formData)
      .then((response) => {
        console.log('Response:', response.data.Token);
        if (response.data.Token) {
          this.saveToken(response.data.Token);
          console.log('Token:', response.data.Token);
        }
        this.presentAlert();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message === "Email or password is incorrect") {
          this.errorAlert('Email atau Password salah');
        } else {
          this.errorAlert('Terjadi kesalahan');
        }
        console.log('Error:', error);
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
