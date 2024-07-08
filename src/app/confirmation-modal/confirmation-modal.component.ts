import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {

  @Input() withdrawAmount: number = 0;
  @Input() selectedWallet: string = '';
  @Input() selectedBank: string = '';
  @Input() accountNumber: string = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  confirmWithdrawal() {
    // Implement withdrawal logic here
    // You can call an API to process the withdrawal
    this.dismissModal();
  }

}
