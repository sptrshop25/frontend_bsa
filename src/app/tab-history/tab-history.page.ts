import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab-history',
  templateUrl: './tab-history.page.html',
  styleUrls: ['./tab-history.page.scss'],
})
export class TabHistoryPage implements OnInit {

  segmentValue: string = 'proses';
  isModalOpen: boolean = false;
  transactions: any[] = [];

  constructor() { }

  async ngOnInit() {
    await this.fetchTransactions();
  }

  async fetchTransactions() {
    try {
      const response = await axios.get(`${environment.apiUrl}/my-transaction`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getFilteredTransactions(status: string) {
    if (status === 'semua') {
      return this.transactions;
    }
    return this.transactions.filter(transaction => 
      status === 'proses' ? transaction.transaction_status !== 'PAID' : transaction.transaction_status === 'PAID'
    );
  }
  
}
