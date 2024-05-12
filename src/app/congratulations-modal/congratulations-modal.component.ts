import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congratulations-modal',
  templateUrl: './congratulations-modal.component.html',
  styleUrls: ['./congratulations-modal.component.scss'],
})
export class CongratulationsModalComponent implements OnInit {

  public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Name',
    },
    {
      placeholder: 'Nickname (max 8 characters)',
      attributes: {
        maxlength: 8,
      },
    },
    {
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
    {
      type: 'textarea',
      placeholder: 'A little about yourself',
    },
  ];
  constructor() { }

  ngOnInit() { }

}
