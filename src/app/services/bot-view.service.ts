import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  BotInactiveSearchResponse,
  IBotLog,
  IBotViewDropdown,
  IBotViewReport,
} from '../_model/bot-view';
import { ICustomer } from '../_model/customer';
import { IEvents } from '../_model/events';
import {
  ISalesCodeDashboard,
  ISalesReferralCode,
  SalesDropdown,
} from '../_model/sales-referral-code';
import { TableColumn } from '../_model/TableColumn';

@Injectable({
  providedIn: 'root',
})
export class BotViewService {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  create(formData) {
    return this.http.post<IBotLog>(`${this.apiUrl}/botview`, formData);
  }

  getBotViewReport(eventId: number) {
    return this.http.get<IBotViewReport[]>(`${this.apiUrl}/botview/${eventId}`);
  }

  get(id): any {
    return this.http.get<ISalesReferralCode>(
      `${this.apiUrl}/salesreferralcode/${id}`
    );
  }

  patch(id, formData): any {
    return this.http.patch<ISalesCodeDashboard>(
      `${this.apiUrl}/salesreferralcode/${id}`,
      formData
    );
  }

  getColumn(): TableColumn<Partial<BotInactiveSearchResponse>>[] {
    return [
      {
        key: 'isSelected',
        label: 'isSelected',
        type: 'isSelected',
        disabled: false,
      },
      {
        key: 'PublicUserId',
        label: 'PublicUserId',
        type: 'number',
      },
      {
        key: 'UserName',
        label: 'UserName',
        type: 'text',
      },

      {
        key: 'PhoneNumber',
        label: 'PhoneNumber',
        type: 'text',
      },
      {
        key: 'lastLogin',
        label: 'lastLogin',
        type: 'datetime',
      },
      {
        key: 'IsGenerated',
        label: 'IsGenerated',
        type: 'boolean',
        disabled: true,
      },
    ];
  }

  getReportColumn(): TableColumn<Partial<IBotViewReport>>[] {
    return [
      {
        key: 'VideoId',
        label: 'VideoId',
        type: 'number',
      },
      {
        key: 'Title',
        label: 'Title',
        type: 'text',
      },
      {
        key: 'PublicUserId',
        label: 'PublicUserId',
        type: 'number',
      },
      {
        key: 'UserName',
        label: 'UserName',
        type: 'text',
      },
      {
        key: 'Views',
        label: 'Views',
        type: 'number',
      },
      {
        key: 'blcreatedat',
        label: 'Generated At',
        type: 'datetime',
      },
    ];
  }

  getdropdown(eventId: number) {
    return this.http.get<IBotViewDropdown>(`${this.apiUrl}/botview/dropdown`, {
      params: {
        eventid: eventId,
      },
    });
  }

  searchInActiveUser(formData) {
    return this.http.post<BotInactiveSearchResponse[]>(
      `${this.apiUrl}/botview/inactiveuser`,
      formData
    );
  }

  generateView(formData, count: number) {
    return this.http.post<any[]>(
      `${this.apiUrl}/customer/admin/generate`,
      formData,
      {
        params: {
          count,
        },
      }
    );
  }
}
