import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import {
  CRUDOperation,
  CRUDOperationV2,
  EditableTableWithSuggestion,
  getAllApiResponse,
} from '../_model/ApiResponse';
import { Adfile, IEvents } from '../_model/events';
import { ILocation } from '../_model/location';
import { TableColumn } from '../_model/TableColumn';
import { MasterTypeDropDown } from '../_model/Dropdowns';
import { ICouponCode } from '../_model/couponcode';

@Injectable({
  providedIn: 'root',
})
export class CouponCodeService {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  create(formData: ICouponCode) {
    return this.http.post<ICouponCode[]>(`${this.apiUrl}/couponcode`, formData);
  }

  getAll() {
    return this.http.get<ICouponCode[]>(`${this.apiUrl}/couponcode`);
  }

  get(id): any {
    return this.http.get(`${this.apiUrl}/couponcode/${id}`);
  }

  patch(id, formData: ICouponCode): any {
    return this.http.patch<ICouponCode[]>(`${this.apiUrl}/couponcode/${id}`, formData);
  }

  getColumn(): TableColumn<Partial<ICouponCode>>[] {
    return [
      {
        key: 'CouponCode',
        type: 'text',
        label: 'Coupon',
        disabled:true
      },
      // {
      //   key: 'VendorId',
      //   type: 'number',
      //   label: 'Vendor'
      // },
      {
        key: 'Description',
        type: 'text',
        label: 'Description',
      },
      {
        key: 'StartDate',
        label: 'StartDate',
        type: 'date',
      },
      {
        key: 'EndDate',
        label: 'EndDate',
        type: 'date',
      },
      {
        key: 'BooseterValue',
        label: 'Value',
        type: 'number',
      },
      {
        key: 'IsOnlyForNewUser',
        label: 'NewUser',
        type: 'boolean',
      },
      {
        key: 'RedeemerId',
        label: 'Redeemer',
        type: 'number',
        disabled:true
      },
      {
        key: 'RedeemDate',
        label: 'RedeemOn',
        type: 'datetime',
        disabled:true
      },
      // {
      //   key: 'IsRedeemed',
      //   label: 'Redeemed',
      //   type: 'boolean',
      //   disabled:true
      // },
      {
        key: 'IsActive',
        label: 'Active',
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
