import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
export class ToastMessageComponent implements OnInit {

  @Input() message = '';

  constructor() { }

  ngOnInit(): void {
  }

}
