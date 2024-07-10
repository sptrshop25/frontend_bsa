import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  paymentMethods: any[] = [];
  selectedPaymentMethod: string = '';
  courseId: string = '';
  isLoading = false;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['course_id'];
      // console.log(this.courseId); // Untuk debugging
    });
    this.getPaymentMethods();
  }
  async getPaymentMethods() {
    try {
      const response = await axios.get(`${environment.apiUrl}/list-payment`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        },
      });
      this.paymentMethods = response.data;
      if (this.paymentMethods.length > 0) {
        this.selectedPaymentMethod = this.paymentMethods[0].payment_method_code;
      }
      // console.log(this.paymentMethods);
      
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  }

  checkout() {
    this.isLoading = true;
    const data = {
      'course_id': this.courseId,
      'transaction_method': this.selectedPaymentMethod
    }
    
    axios.post(`${environment.apiUrl}/buy-course`, data, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
        'X-API-KEY': environment.bsaApiKey,
      },
    })
    .then((response) => {
      console.log('Response:', response.data);
      let url = response.data.data.checkout_url;
      // window.location.href = url;
      this.router.navigate(['/pay-checkout'], { queryParams: { url: url } });
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      this.isLoading = false;
    });
  }
}
