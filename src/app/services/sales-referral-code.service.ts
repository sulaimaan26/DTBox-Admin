import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ISalesCodeDashboard,
  ISalesReferralCode,
  SalesDropdown,
} from '../_model/sales-referral-code';
import { TableColumn } from '../_model/TableColumn';

@Injectable({
  providedIn: 'root',
})
export class SalesReferralCodeService {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  create(formData) {
    return this.http.post<ISalesReferralCode>(
      `${this.apiUrl}/salesreferralcode`,
      formData
    );
  }

  getAll() {
    return this.http.get<ISalesCodeDashboard[]>(
      `${this.apiUrl}/salesreferralcode`
    );
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

  getColumn(): TableColumn<Partial<ISalesCodeDashboard>>[] {
    return [
      {
        key: 'id',
        type: 'number',
        label: '#Id',
      },
      {
        key: 'SalesReferralCode',
        label: 'Code',
        type: 'text',
      },
      {
        key: 'UserName',
        label: 'User Name',
        type: 'text',
      },
      {
        key: 'PublicUserId',
        label: 'UserId',
        type: 'number',
      },
      {
        key: 'PhoneNumber',
        label: 'Phone Number',
        type: 'number',
      },
    ];
  }

  getdropdown() {
    return this.http.get<SalesDropdown>(
      `${this.apiUrl}/salesreferralcode/dropdown/`
    );
  }
}
