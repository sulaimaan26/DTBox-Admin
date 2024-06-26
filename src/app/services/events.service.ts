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
import { Adfile, IEvents } from '../_model/events';
import { TableColumn } from '../_model/TableColumn';

@Injectable({
  providedIn: 'root',
})
export class EventService implements CRUDOperationV2<IEvents> {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  getCreateLink(): Observable<string> {
    return of('/admin/events/create/');
  }

  getDetailLink(): Observable<string> {
    return of('/admin/events/update/');
  }

  create(formData): any {
    return this.http.post(`${this.apiUrl}/event`, formData);
  }

  getAll() {
    return this.http.get<getAllApiResponse<IEvents>>(`${this.apiUrl}/event`);
  }

  get(commonDisplayId): any {
    return this.http.get(`${this.apiUrl}/event/${commonDisplayId}`);
  }

  getdropdown(): any {
    return this.http.get(`${this.apiUrl}/event/dropdown/`);
  }

  update(customerid, formData): any {
    return this.http.put(`${this.apiUrl}/event/${customerid}`, formData);
  }

  getColumn(): TableColumn<Partial<IEvents>>[] {
    return [
      {
        key: 'EventId',
        type: 'text',
        label: 'Event Id',
      },
      {
        key: 'Title',
        type: 'text',
        label: 'Title',
      },
      {
        key: 'Description',
        type: 'text',
        label: 'Description',
      },
      {
        key: 'AdStartDate',
        type: 'text',
        label: 'AdStartDate',
      },
      {
        key: 'AdEndDate',
        type: 'text',
        label: 'AdEndDate',
      },
      {
        key: 'IsActive',
        type: 'text',
        label: 'Active',
      },
    ];
  }

  uploadFile(formData: FormData): any {
    return this.http.post(`${this.apiUrl}/file/upload`, formData, {
      reportProgress: true,
      observe: 'response',
    });
  }

  downloadFile(url: string): any {
    return this.http.get(url, {
      responseType: 'blob',
      headers: {
        skip: 'true',
      },
    });
  }

  patchAdFile(fileId, eventId, formData: Adfile): Observable<IEvents> {
    return this.http.patch<IEvents>(
      `${this.apiUrl}/event/adfile/${eventId}?fileId=${fileId}`,
      formData
    );
  }
}
