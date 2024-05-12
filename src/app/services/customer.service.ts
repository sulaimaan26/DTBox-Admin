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

  getColumn(): TableColumn<Partial<ICustomer>>[] {
    return [
      {
        key: 'id',
        type: 'number',
        label: '#id',
      },
      {
        key: 'PublicUserId',
        type: 'number',
        label: 'PubUserId',
      },
      {
        key: 'UserName',
        type: 'text',
        label: 'Name',
      },
      {
        key: 'PhoneNumber',
        type: 'number',
        label: 'Phone Number',
      },
      {
        key: 'PinCode',
        type: 'number',
        label: 'PinCode',
      },
      {
        key: 'Gender',
        type: 'text',
        label: 'Gender',
      },
      {
        key: 'createdAt',
        type: 'date',
        label: 'createdAt',
      },
      {
        key: 'lastLogin',
        type: 'datetime',
        label: 'lastLogin',
      },
      {
        key: 'IsActive',
        label: 'Active',
        type: 'boolean',
      },
    ];
  }
}
