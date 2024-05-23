import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  formData = {
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    nickname: '',
    gender: '',
    phone: '',
  };

  token = '1395a7e8110da037f48dbf031b71e82d62121b1a8e809bef601885bd7706794f';

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router,
    
  ) {}
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Berhasil',
      message: 'Selamat Akun Anda Berhasil Dibuat',
      buttons: [
        {
          text: 'Lanjut Login',
          handler: () => {
            this.router.navigate(['/login']);
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
      .post('https://d9c7-203-130-212-204.ngrok-free.app/api/register', this.formData)
      .then((response) => {
        console.log('Response:', response);
        this.presentAlert();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          if (error.response.data.email != null) {
            this.errorAlert('Email sudah terdaftar');
          } else if (error.response.data.message === 'Nickname already exist') {
            this.errorAlert('Nickname sudah terdaftar');
          } else if (error.response.data.message === 'Phone already exist') {
            this.errorAlert('Nomor Handphone sudah terdaftar');
          } else {
            this.errorAlert('Terjadi kesalahan');
          }
        } else {
          this.errorAlert('Terjadi kesalahan');
        }
        console.log('Error:', error);
      });
  }

  get passwordsMatch(): boolean {
    return this.formData.password === this.formData.confirmPassword;
  }
  isFormValid() {
    return (
      !!this.formData.email &&
      !!this.formData.password &&
      !!this.formData.fullname &&
      !!this.formData.nickname &&
      !!this.formData.gender &&
      !!this.formData.phone &&
      this.passwordsMatch &&
      this.isEmailValid &&
      this.isNicknameValid &&
      this.isPasswordValid
    );
  }
  isPasswordValid: boolean = true;
  validatePassword() {
    const password = this.formData.password;
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    this.isPasswordValid = passwordCriteria.test(password);
  }

  isNicknameValid: boolean = true;
  validateNickname() {
    const nickname = this.formData.nickname;
    const nicknameCriteria = /^[a-z0-9_]+$/;
    this.isNicknameValid = nicknameCriteria.test(nickname);
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

  togglePasswordVisibilityConfirm() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit() {}
}
