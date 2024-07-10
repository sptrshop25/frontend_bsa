import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-verification-phone-number',
  templateUrl: './verification-phone-number.page.html',
  styleUrls: ['../sign-up/sign-up.page.scss'],
})
export class VerificationPhoneNumberPage implements OnInit {
  formData = {
    number: '',
    otp: '',
  };
  isButtonDisabled: boolean = false;
  isLoading: boolean = false;
  showOtpError: boolean = false;
  showPhoneError: boolean = false;
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
      .post(`${environment.apiUrl}/send_otp_phone`, this.formData, {
        headers: {
          'X-API-KEY': environment.bsaApiKey,
        },
      })
      .then((response) => {
        this.startCountdown();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          if (error.response.data.message === 'Phone not found') {
            this.showPhoneError = true;
          }
        } else {
          this.errorAlert('Terjadi kesalahan');
        }
        console.log('Error:', error);
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
      .post(`${environment.apiUrl}/verify_otp_phone`, this.formData, {
        headers: {
          'X-API-KEY': environment.bsaApiKey,
        },
      })
      .then((response) => {
        this.alertToLogin('Nomor WhatsApp anda telah terverifikasi, silahkan login kembali');
      })
      .catch((error) => {
        console.log('Error:', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === 'Wrong otp'
        ) {
        this.showOtpError = true;
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message === "Otp expired"
        ) {
          this.showOtpError = true;
        }else {
          this.errorAlert('Terjadi kesalahan');
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async alertToLogin(messages?: string) {
    const alert = await this.alertController.create({
      header: 'Berhasil',
      message: messages,
      buttons: [
        {
          text: 'Login',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }
  isFormValid() {
    return !!this.formData.number && this.isPhoneValid && this.formData.otp;
  }

  isOtpValid() {
    return !!this.formData.otp;
  }

  isPhoneValided() {
    return this.isPhoneValid && !!this.formData.number;
  }

  isPhoneValid: boolean = true;

  validateNumber() {
    const phoneNumber = this.formData.number;
    const regex = /^(0852|0853|0811|0812|0813|0821|0822|0823|0851|0855|0856|0857|0858|0814|0815|0816|0817|0818|0819|0859|0877|0878|0832|0833|0838|0895|0896|0897|0898|0899|0881|0882|0883|0884|0885|0886|0887|0888|0889)(\d{8,10})$/;
    this.isPhoneValid = regex.test(phoneNumber);
  }
  
  ngOnInit() {
    this.formData.number = '';
    this.formData.otp = '';
    // if (localStorage.getItem('authToken')) {
    //   this.router.navigate(['/home']);
    // }
  }

}