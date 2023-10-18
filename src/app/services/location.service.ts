import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import {
  CRUDOperation,
  CRUDOperationV2,
  getAllApiResponse,
} from '../_model/ApiResponse';
import { Adfile, IEvents } from '../_model/events';
import { ILocation } from '../_model/location';
import { TableColumn } from '../_model/TableColumn';

@Injectable({
  providedIn: 'root',
})
export class LocationService implements CRUDOperationV2<ILocation> {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  getCreateLink(): Observable<string> {
    return of('/admin/location/create');
  }

  getDetailLink(): Observable<string> {
    return of('/admin/location/update/');
  }

  create(formData: FormData): any {
    return this.http.post(`${this.apiUrl}/location`, formData);
  }

  getAll() {
    return this.http.get<getAllApiResponse<ILocation>>(
      `${this.apiUrl}/location`
    );
  }

  get(commonDisplayId): any {
    return this.http.get(`${this.apiUrl}/location/${commonDisplayId}`);
  }

  getdropdown(): any {
    return this.http.get(`${this.apiUrl}/location/dropdown/`);
  }

  update(customerid, formData: FormData): any {
    return this.http.put(`${this.apiUrl}/location/${customerid}`, formData);
  }

  getColumn(): TableColumn<ILocation>[] {
    return [
      // {
      //   key: 'id',
      //   type: 'text',
      //   label: '#Id',
      // },
      {
        key: 'pincode',
        type: 'text',
        label: 'Pin Code',
      },
      {
        key: 'state',
        type: 'text',
        label: 'State',
      },
      {
        key: 'city',
        type: 'text',
        label: 'City',
      },
      {
        key: 'country',
        type: 'text',
        label: 'Country',
      },
    ];
  }
}
