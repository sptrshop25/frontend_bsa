import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
@Component({
  selector: 'app-verification-forgot-password',
  templateUrl: './verification-forgot-password.page.html',
  styleUrls: ['../sign-up/sign-up.page.scss'],
})
export class VerificationForgotPasswordPage implements OnInit {
  formData = {
    email: '',
    otp: '',
  };
  isButtonDisabled: boolean = false;
  isLoading: boolean = false;
  showOtpError: boolean = false;
  showEmailError: boolean = false;
  countdown: number = 0;
  countdownInterval: any;

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

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

  sendOtp() {
    axios
      .post(`${environment.apiUrl}/request/reset-password`, this.formData)
      .then((response) => {
        this.startCountdown();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          if (error.response.data.message === 'Email not found') {
            this.showEmailError = true;
          }
        } else {
          this.errorAlert('Terjadi kesalahan');
        }
      });
  }

  startCountdown() {
    this.countdown = 60;
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  validateOtp() {
    this.isLoading = true;
    axios
      .post(`${environment.apiUrl}/verify_otp`, this.formData)
      .then((response) => {
        localStorage.setItem('otp', response.data.otp);
        this.router.navigate(['/reset-password']);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === 'Wrong otp'
        ) {
        this.showOtpError = true;
        } else {
          this.errorAlert('Terjadi kesalahan');
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  isFormValid() {
    return !!this.formData.email && this.isEmailValid && this.formData.otp;
  }

  isOtpValid() {
    return !!this.formData.otp;
  }

  isEmailValided() {
    return this.isEmailValid && !!this.formData.email;
  }

  isEmailValid: boolean = true;

  validateEmail() {
    this.showEmailError = false;
    const email = this.formData.email;
    const emailCriteria = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isEmailValid = emailCriteria.test(email);
  }

  ngOnInit() {
    this.formData.email = '';
    this.formData.otp = '';
    // if (localStorage.getItem('authToken')) {
    //   this.router.navigate(['/home']);
    // }
  }

}
