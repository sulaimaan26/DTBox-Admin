import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IReferralLog, ReferralLogRequest } from '../_model/referralog';
import { TableColumn } from '../_model/TableColumn';

@Injectable({
  providedIn: 'root',
})
export class ReferralLogService {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  getAll(formData: ReferralLogRequest) {
    return this.http.post<IReferralLog[]>(
      `${this.apiUrl}/salesreferralcode/analytics`,
      formData
    );
  }

  getColumn(): TableColumn<Partial<IReferralLog>>[] {
    return [
      {
        key: 'id',
        type: 'number',
        label: '#Id',
      },
      {
        key: 'UserName',
        label: 'Redeemer',
        type: 'text',
      },
      {
        key: 'PublicUserId',
        label: 'Redeemer Id',
        type: 'number',
      },
      {
        key: 'createdAt',
        label: 'Date',
        type: 'datetime',
      },
      {
        key: 'PhoneNumber',
        label: 'Redeemer Number',
        type: 'number',
      },
      {
        key: 'IsSuccess',
        label: 'Success',
        type: 'boolean',
      },
      {
        key: 'Remarks',
        label: 'Remarks',
        type: 'text',
      },
    ];
  }
}
