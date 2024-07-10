import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CustomAlertComponent } from '../../custom-alert/custom-alert.component';
import { Router } from '@angular/router';
import axios from 'axios';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';

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

  @ViewChild('alertContainer', { read: ViewContainerRef, static: true }) alertContainer!: ViewContainerRef;

  isLoading = false;
  constructor(
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    private resolver: ComponentFactoryResolver
  ) {}

  async presentAlert(message: string) {
    const modal = await this.modalController.create({
      component: CustomAlertComponent,
      componentProps: {
        message: message
      },
      backdropDismiss: false
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.goToLogin) {
        this.router.navigate(['/login']);
      }
    });

    await modal.present();
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
      .post(`${environment.apiUrl}/register`, this.formData, {
        headers: {
          'X-API-KEY': environment.bsaApiKey,
        },
      })
      .then((response) => {
        this.presentAlert('Register Berhasil');
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
      })
      .finally(() => {
        this.isLoading = false;
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

  isPhoneValid: boolean = true;
  validatePhone() {
    const phonephone = this.formData.phone;
    const regex = /^(0852|0853|0811|0812|0813|0821|0822|0823|0851|0855|0856|0857|0858|0814|0815|0816|0817|0818|0819|0859|0877|0878|0832|0833|0838|0895|0896|0897|0898|0899|0881|0882|0883|0884|0885|0886|0887|0888|0889)(\d{8,10})$/;
    this.isPhoneValid = regex.test(phonephone);
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibilityConfirm() {
    this.showPassword = !this.showPassword;
  }

  presenAlert(message: string) {
    this.presentAlert(message);
  }

  ngOnInit() {
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/tab/tabs/home']);
    } 
  }
}
