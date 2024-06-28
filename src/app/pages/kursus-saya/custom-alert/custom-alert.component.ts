import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent {
  @Input() message!: string;
  @Output() goToLogin = new EventEmitter<void>();

  constructor(private modalController: ModalController) {}

  handleGoToLogin() {
    this.goToLogin.emit();
    this.modalController.dismiss({ goToLogin: true });
  }
}
