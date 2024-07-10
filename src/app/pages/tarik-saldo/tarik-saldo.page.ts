import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-tarik-saldo',
  templateUrl: './tarik-saldo.page.html',
  styleUrls: ['./tarik-saldo.page.scss'],
})
export class TarikSaldoPage implements OnInit {

  balance: number = 0;
  ewalletWithdrawalFee: number = 2500;
  bankTransferFee: number = 6500;
  teacherBalance: number = 0;
  withdrawalFee: number = 0;
  totalWithdrawal: number = 0;
  withdrawAmount: number = 0;
  selectedWallet: string = '';
  selectedBank: string = '';
  accountNumber: string = '';

  constructor(private modalController: ModalController, private toastController: ToastController) { }

  ngOnInit() {
    this.fetchTeacherBalance();
  }

  fetchTeacherBalance() {
    axios.get(`${environment.apiUrl}/info_teacher`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
        'X-API-KEY': environment.bsaApiKey,
      }
    })
    .then((response) => {
      this.teacherBalance = response.data.teacher_balance[0].balance;
      this.balance = this.teacherBalance;
      
    })
    .catch((error) => {
      console.log('Error fetching teacher balance:', error);
    });
  }

  openModal() {
    if (this.selectedWallet === 'dana') {
      this.requestEWallet('dana', this.accountNumber);
    } else if (this.selectedWallet === 'gopay') {
      this.requestEWallet('gopay', this.accountNumber);
    } else if (this.selectedWallet === 'ovo') {
      this.requestEWallet('ovo', this.accountNumber);
    } else if (this.selectedWallet === 'shopeepay') {
      this.requestEWallet('shopeepay', this.accountNumber);
    } else {
      this.requestBank();
    }
  }

  requestEWallet(walletType: string, accountNumber?: string) {
    const apiUrl = `https://api-otomatis.my.id/trueid/ewallet/${walletType}/?hp=${accountNumber}&key=d792126605d480174d68825c86beb234`;

    axios.get(apiUrl)
      .then((response) => {
        this.calculateFees();
        if (!this.isValidWithdrawal()) {
          this.presentToast('Tarik saldo gagal diajukan. Silahkan coba kembali.', 'danger');
          return;
        }
        this.presentModal();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  requestBank() {
    const apiUrl = `https://api-otomatis.my.id/trueid/bank/?norek=${this.accountNumber}&kode=${this.selectedBank}&key=d792126605d480174d68825c86beb234`;

    axios.get(apiUrl)
      .then((response) => {
        this.calculateFees();
        if (!this.isValidWithdrawal()) {
          this.presentToast('Tarik saldo gagal diajukan. Silahkan coba kembali.', 'danger');
          return;
        }
        this.presentModal();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  presentModal() {
    this.modalController.create({
      component: ConfirmationModalComponent,
      componentProps: {
        withdrawAmount: this.withdrawAmount,
        selectedWallet: this.selectedWallet,
        selectedBank: this.selectedBank,
        accountNumber: this.accountNumber
      }
    }).then((modal) => {
      modal.present();
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  confirmWithdrawal() {
    // Implement withdrawal logic here
    // You can call an API to process the withdrawal
    this.presentToast('Tarik saldo berhasil diajukan.');
    this.dismissModal();
  }

  isValidWithdrawal(): boolean {
    return this.withdrawAmount > 0 && 
           this.withdrawAmount + this.withdrawalFee <= this.teacherBalance &&
           (this.selectedWallet !== '' || this.selectedBank !== '') && 
           this.accountNumber !== '';
  }

  calculateFees() {
    if (this.selectedWallet) {
      this.withdrawalFee = this.ewalletWithdrawalFee;
    } else {
      this.withdrawalFee = this.bankTransferFee;
    }
    this.totalWithdrawal = this.withdrawAmount + this.withdrawalFee;
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
