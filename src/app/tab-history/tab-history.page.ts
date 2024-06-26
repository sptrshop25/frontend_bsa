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
  rating: number = 0;
  comment: string = '';
  selectedCourseId: string = '';

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

  setOpen(isOpen: boolean, courseId?: string) {
    this.isModalOpen = isOpen;
    if (courseId) {
      this.selectedCourseId = courseId;
    }
  }

  getFilteredTransactions(status: string) {
    if (status === 'semua') {
      return this.transactions;
    }
    return this.transactions.filter(transaction => 
      status === 'proses' ? transaction.transaction_status !== 'PAID' : transaction.transaction_status === 'PAID'
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
      const response = await axios.post(`${environment.apiUrl}/rating_course `, {
        course_id: this.selectedCourseId,
        rating: this.rating,
        comment: this.comment
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      console.log('Review submitted successfully:', response.data);
      this.setOpen(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  }
}
