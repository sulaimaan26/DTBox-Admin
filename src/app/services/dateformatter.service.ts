import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { numberSeries } from '../_model/numberseries';
import {
  CRUDOperation,
  CRUDOperationV2,
  getAllApiResponse,
} from '../_model/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class DateFormatterService {
  constructor() {}

  getCurrentDate(date: string): string {
    const timezone = 'Asia/Kolkata'; // Replace with your desired timezone
    const now = new Date(date);
    const year = now.toLocaleDateString('en-US', {
      timeZone: timezone,
      year: 'numeric',
    });
    const month = this.formatToTwoDigit(
      // now.toLocaleDateString('en-US', { timeZone: timezone, month: '2-digit' })
      now.getUTCMonth() + 1
    );
    const day = this.formatToTwoDigit(
      // now.toLocaleDateString('en-US', { timeZone: timezone, day: '2-digit' })
      now.getUTCDate()
    );

    return `${year}-${month}-${day}`;
  }

  getCurrentTime(date, hour12 = false): string {
    const now = new Date(date);
    return (
      this.formatToTwoDigit(now.getUTCHours()) +
      ':' +
      this.formatToTwoDigit(now.getUTCMinutes())
    );
  }

  convertDate(date: string) {
    return this.getCurrentDate(date) + ' ' + this.getCurrentTime(date);
  }

  formatToTwoDigit(value: number) {
    return String(value).padStart(2, '0');
  }

  addHours(date: string,hours:number) {
    let dat = new Date(date)
    dat.setHours(dat.getHours()+hours)
    return this.dateWithoutTimezone(dat);
  }

  decrementHours(date: string,hours:number) {
    let dat = new Date(date)
    dat.setHours(dat.getHours()-hours)
    return this.dateWithoutTimezone(dat);
  }

  dateWithoutTimezone(date: Date) {
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const withoutTimezone = new Date(date.valueOf() - tzoffset)
      .toISOString()
      .slice(0, -1);
    return withoutTimezone;
  };
}
