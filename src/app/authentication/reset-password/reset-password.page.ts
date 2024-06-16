import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertResetPasswordComponent } from '../../alert-reset-password/alert-reset-password.component';
import { Router } from '@angular/router';
import axios from 'axios';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['../sign-up/sign-up.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  formData = {
    password: '',
    otp: localStorage.getItem('otp'),
    confirmPassword: ''
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
      component: AlertResetPasswordComponent,
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

  resetPassword() {
    this.isLoading = true;

    axios
      .post(`${environment.apiUrl}/reset_password`, this.formData)
      .then((response) => {
        this.isLoading = false;
        this.presentAlert("Password Berhasil Diubah");
      })
      .catch((error) => {
        console.log('Error:', error);
        
        this.isLoading = false;
        this.errorAlert("Terjadi kesalahan");
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
      !!this.formData.password &&
      this.passwordsMatch &&
      this.isPasswordValid
    );
  }

  isPasswordValid: boolean = true;
  validatePassword() {
    const password = this.formData.password;
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    this.isPasswordValid = passwordCriteria.test(password);
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibilityConfirm() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/tab/tabs/home']);
    } 
  }
}
