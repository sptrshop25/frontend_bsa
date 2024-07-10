import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import {
  ModalController,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-tab-history',
  templateUrl: './tab-history.page.html',
  styleUrls: ['./tab-history.page.scss'],
})
export class TabHistoryPage implements OnInit {
  segmentValue: string = 'proses';
  isModalOpen: boolean = false;
  transactions: any[] = [];
  rating: number = 0;
  comment: string = '';
  selectedCourseId: string = '';

  constructor(
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    if (localStorage.getItem('authToken')) {
      await this.fetchTransactions();
    } else {
      this.alertToLogin();
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  isLoggedIn() {
    if (localStorage.getItem('authToken')) {
      return true;
    } else {
      return false;
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  async alertToLogin() {
    const alert = await this.alertController.create({
      header: 'Gagal',
      message:
        'Untuk melihat riwayat transaksi, silahkan login terlebih dahulu',
      buttons: [
        {
          text: 'Login Sekarang',
          handler: () => {
            this.navCtrl.navigateForward('/login');
          },
        },
      ],
    });
    await alert.present();
  }

  async fetchTransactions() {
    try {
      const response = await axios.get(`${environment.apiUrl}/my-transaction`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        },
      });
      this.transactions = response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }

  setSegmentValue(event: CustomEvent) {
    const value = event.detail.value as string;
    if (value) {
      this.segmentValue = value;
    }
  }

  setOpen(
    isOpen: boolean,
    courseId?: string,
    transactionId?: string,
    status?: string,
    url?: string
  ) {
    if (isOpen && courseId) {
      const transaction = this.transactions.find(
        (t) => t.course[0]?.course_id === courseId
      );
      if (transaction && transaction.course[0]?.rating?.length >= 0) {
        if (status === 'PAID') {
          this.router.navigate(['/receipt'], {
            queryParams: { transaction_id: transactionId },
          });
        } else {
          this.router.navigate(['/pay-checkout'], {
            queryParams: { url: url },
          });
        }
        return;
      }
    }
    this.isModalOpen = isOpen;
    if (courseId) {
      this.selectedCourseId = courseId;
    }
  }

  getFilteredTransactions(status: string) {
    if (status === 'semua') {
      return this.transactions;
    }
    return this.transactions.filter((transaction) =>
      status === 'proses'
        ? transaction.transaction_status !== 'PAID'
        : transaction.transaction_status === 'PAID'
    );
  }

  setRating(value: number) {
    this.rating = value;
  }
  isStarFilled(starNumber: number): boolean {
    return starNumber <= this.rating;
  }

  canSubmitReview(): boolean {
    return this.rating > 0 && this.comment.trim().length > 0;
  }

  async submitReview() {
    try {
      const response = await axios.post(
        `${environment.apiUrl}/rating_course `,
        {
          course_id: this.selectedCourseId,
          rating: this.rating,
          comment: this.comment,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('authToken')}`,
            'X-API-KEY': environment.bsaApiKey,
          },
        }
      );
      this.presentAlert('Ulasan Anda Berhasil');
      await this.fetchTransactions();
      this.setOpen(false);
    } catch (error) {
      this.errorAlert('Terjadi kesalahan');
      console.error('Error submitting review:', error);
    }
  }

  async presentAlert(message: string) {
    const modal = await this.modalController.create({
      component: CustomAlertComponent,
      componentProps: {
        message: message,
      },
      backdropDismiss: false,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.goToLogin) {
        this.router.navigate(['/tab/tabs/history']);
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
}
