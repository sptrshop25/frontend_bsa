import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Clipboard } from '@capacitor/clipboard';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  transaction: any;

  constructor(private route: ActivatedRoute, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    const transactionId = this.route.snapshot.queryParamMap.get('transaction_id') || '';
    this.fetchTransactionDetails(transactionId);
  }

  async fetchTransactionDetails(transactionId: string) {
    try {
      const response = await axios.get(`${environment.apiUrl}/detail-transaction/${transactionId}`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        },
      });
      this.transaction = response.data[0];
    } catch (error) {
      console.error('Error fetching transaction details', error);
    }
  }

  async copyToClipboard(text: string) {
    try {
      await Clipboard['write']({
        string: text,
      });      
      const toast = await this.toastController.create({
        message: 'ID Transaksi disalin ke clipboard',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    } catch (error) {
      console.error('Error copying to clipboard', error);
      const toast = await this.toastController.create({
        message: 'Gagal menyalin ID Transaksi',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
