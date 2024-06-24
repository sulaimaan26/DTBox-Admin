import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TableColumn } from '../_model/TableColumn';
import { ICustomer } from '../_model/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  getAll() {
    return this.http.get<ICustomer[]>(`${this.apiUrl}/admin/all/customer`);
  }

  patchCustomer(customerId: number, payload) {
    return this.http.patch(
      `${this.apiUrl}/admin/customer/${customerId}`,
      payload
    );
  }

  getColumn(): TableColumn<Partial<ICustomer>>[] {
    return [
      {
        key: 'id',
        type: 'number',
        label: '#id',
        disabled: true,
      },
      {
        key: 'PublicUserId',
        type: 'number',
        label: 'PubUserId',
        disabled: true,
      },
      {
        key: 'UserName',
        type: 'text',
        label: 'Name',
        disabled: true,
      },
      {
        key: 'PhoneNumber',
        type: 'number',
        label: 'Phone Number',
        disabled: true,
      },
      {
        key: 'PinCode',
        type: 'number',
        label: 'PinCode',
        disabled: true,
      },
      {
        key: 'Gender',
        type: 'text',
        label: 'Gender',
        disabled: true,
      },
      {
        key: 'createdAt',
        type: 'date',
        label: 'createdAt',
        disabled: true,
      },
      {
        key: 'lastLogin',
        type: 'datetime',
        label: 'lastLogin',
        disabled: true,
      },
      {
        key: 'IsActive',
        label: 'Active',
        type: 'boolean',
        disabled: true,
      },
      {
        key: 'IsSales',
        label: 'Sales',
        type: 'boolean',
      },
      {
        key: 'isEdit',
        label: 'Action',
        type: 'isEdit',
      },
    ];
  }
}
