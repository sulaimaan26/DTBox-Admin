import { Injectable } from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  datePipe: DatePipe = new DatePipe('en-US');

  constructor() { }

  getCurrentDate(){
    let date = new Date();
    let transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return transformDate;
  }
}
