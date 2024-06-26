import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pay-checkout',
  templateUrl: './pay-checkout.page.html',
  styleUrls: ['./pay-checkout.page.scss'],
})
export class PayCheckoutPage implements OnInit {
  url: SafeResourceUrl = '';

  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(params['url']);
    });
  }
}
