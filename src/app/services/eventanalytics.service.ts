import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EventReport, IEventAnalytics } from '../_model/eventanalytics';
import {
  CRUDOperation,
  EditableTableCRUDOperation,
  EditableTableWithDropdown,
  EditableTableWithSuggestion,
  getAllApiResponse,
} from '../_model/ApiResponse';
import { Observable } from 'rxjs';
import { MasterTypeDropDown } from '../_model/Dropdowns';
import { TableColumn } from '../_model/TableColumn';
@Injectable({
  providedIn: 'root',
})
export class EventAnalyticsService
  implements EditableTableWithSuggestion<EventReport>
{
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  updateReport(formdata: any) {
    return this.http.patch<EventReport[]>(
      `${this.apiUrl}/event/report/`,
      formdata
    );
  }

  getDropdown(): Observable<MasterTypeDropDown> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  saveChanges(row: EventReport): Observable<EventReport> {
    throw new Error('Method not implemented.');
  }
  addRow(): EventReport {
    throw new Error('Method not implemented.');
  }
  removeRow(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  get(id: number): Observable<EventReport> {
    throw new Error('Method not implemented.');
  }
  create(formData: FormData): Observable<EventReport> {
    throw new Error('Method not implemented.');
  }
  update(id: number, formData: FormData): Observable<EventReport> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<getAllApiResponse<EventReport>> {
    throw new Error('Method not implemented.');
  }
  getColumn(): TableColumn<EventReport>[] {
    return [
      {
        key: 'id',
        label: '#Id',
        type: 'text',
        disabled: true,
      },
      {
        key: 'PublicUserId',
        label: 'Public Id',
        type: 'text',
        disabled: true,
      },
      {
        key: 'totalpoints',
        label: 'Points',
        type: 'text',
        disabled: true,
      },
      {
        key: 'isWinner',
        label: 'Winner',
        type: 'boolean',
        disabled: true,
      },
      {
        key: 'PhoneNumber',
        label: 'Phone Number',
        type: 'text',
        disabled: true,
      },
      {
        key: 'PinCode',
        label: 'Pincode',
        type: 'text',
        disabled: true,
      },
      {
        key: 'Gender',
        label: 'Gender',
        type: 'text',
        disabled: true,
      },
      {
        key: 'DOB',
        label: 'Date Of Birth',
        type: 'date',
        disabled: true,
      },

      {
        key: 'DistributedDate',
        label: 'Distributed Date',
        type: 'date',
      },
      {
        key: 'Remarks',
        label: 'Remarks    ',
        type: 'text',
      },
      {
        key: 'IsPriceDistributed',
        label: 'Is Distributed',
        type: 'boolean',
      },
      {
        key: 'isEdit',
        label: 'Action',
        type: 'isEdit',
      },
    ];
  }
  getDetailLink(): Observable<string> {
    throw new Error('Method not implemented.');
  }

  getEventReport(eventId: number) {
    return this.http.get<IEventAnalytics>(
      `${this.apiUrl}/event/report/` + eventId
    );
  }

  getAllData(limit: number): Observable<getAllApiResponse<EventReport>> {
    throw this.http.get<IEventAnalytics>(`${this.apiUrl}/event/report/`);
  }

  getRouteParam() {
    return 'id'; //Should be from route key
  }
}
