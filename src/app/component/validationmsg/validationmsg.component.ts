import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validationmsg',
  templateUrl: './validationmsg.component.html',
  styleUrls: ['./validationmsg.component.css']
})
export class ValidationmsgComponent implements OnInit {

  @Input() isSubmitted;
  @Input() message;
  @Input() error;


  constructor() { }

  ngOnInit(): void {
  }

}
