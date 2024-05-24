import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CustomAlertComponent } from '../../custom-alert/custom-alert.component';
import { Router } from '@angular/router';
import axios from 'axios';
import { ModalController } from '@ionic/angular';

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
      .post('https://930b-110-138-88-26.ngrok-free.app/api/register', this.formData)
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

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibilityConfirm() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {}
}
