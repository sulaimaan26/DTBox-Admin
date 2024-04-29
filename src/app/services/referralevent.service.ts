import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IReferralEvent } from '../_model/ReferralEvent';
import { TableColumn } from '../_model/TableColumn';

@Injectable({
  providedIn: 'root',
})
export class ReferralEventService {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  create(formData: IReferralEvent) {
    return this.http.post<IReferralEvent>(
      `${this.apiUrl}/referralevent`,
      formData
    );
  }

  update(id: number, formData: IReferralEvent) {
    return this.http.put<IReferralEvent>(
      `${this.apiUrl}/referralevent/${id}`,
      formData
    );
  }

  getAll() {
    return this.http.get<IReferralEvent[]>(`${this.apiUrl}/referralevent`);
  }

  get(id): any {
    return this.http.get(`${this.apiUrl}/referralevent/${id}`);
  }

  patch(id, formData: IReferralEvent): any {
    return this.http.patch<IReferralEvent[]>(
      `${this.apiUrl}/referralevent/${id}`,
      formData
    );
  }

  getColumn(): TableColumn<Partial<IReferralEvent>>[] {
    return [
      {
        key: 'EventId',
        type: 'text',
        label: 'Event ID',
      },
      {
        key: 'StartDate',
        label: 'Start Date',
        type: 'datetime',
      },
      {
        key: 'EndDate',
        label: 'End Date',
        type: 'datetime',
      },
      {
        key: 'IsActive',
        label: 'Active',
        type: 'boolean',
      },
      {
        key: 'IsCompleted',
        label: 'Completed',
        type: 'boolean',
      },
    ];
  }
}
