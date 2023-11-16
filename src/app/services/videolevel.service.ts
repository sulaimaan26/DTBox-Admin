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
import { IVideoLevel } from '../_model/videolevel';

@Injectable({
  providedIn: 'root',
})
export class VideoLevelService {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  create(formData: IVideoLevel) {
    return this.http.post<IVideoLevel[]>(`${this.apiUrl}/videolevel`, formData);
  }

  getAll() {
    return this.http.get<IVideoLevel[]>(`${this.apiUrl}/videolevel`);
  }

  get(id): any {
    return this.http.get(`${this.apiUrl}/videolevel/${id}`);
  }

  update(id, formData: IVideoLevel): any {
    return this.http.put<IVideoLevel[]>(`${this.apiUrl}/videolevel/${id}`, formData);
  }

  delete(id): any {
    return this.http.delete<IVideoLevel[]>(`${this.apiUrl}/videolevel/${id}`);
  }

  getColumn(): TableColumn<Partial<IVideoLevel>>[] {
    return [
      {
        key: 'ViewCount',
        type: 'number',
        label: 'View Count',
      },
      {
        key: 'TimeOut',
        type: 'number',
        label: 'TimeOut',
      },
      {
        key: 'isEdit',
        label: 'Action',
        type: 'isEdit',
      },
    ];
  }
}
