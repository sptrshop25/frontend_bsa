import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-reset-password',
  templateUrl: './alert-reset-password.component.html',
  styleUrls: ['./alert-reset-password.component.scss'],
})
export class AlertResetPasswordComponent {
  @Input() message!: string;
  @Output() goToLogin = new EventEmitter<void>();

  constructor(private modalController: ModalController) {}

  handleGoToLogin() {
    this.goToLogin.emit();
    this.modalController.dismiss({ goToLogin: true });
  }
}
