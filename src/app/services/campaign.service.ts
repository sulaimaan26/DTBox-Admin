import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICampaign } from '../_model/campaign';
import { TableColumn } from '../_model/TableColumn';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  create(formData: ICampaign) {
    return this.http.post<ICampaign>(`${this.apiUrl}/campaign`, formData);
  }

  update(campaignId: number, formData: ICampaign) {
    return this.http.put<ICampaign>(
      `${this.apiUrl}/campaign/${campaignId}`,
      formData
    );
  }

  getAll() {
    return this.http.get<ICampaign[]>(`${this.apiUrl}/campaign`);
  }

  get(id): any {
    return this.http.get(`${this.apiUrl}/campaign/${id}`);
  }

  patch(id, formData: ICampaign): any {
    return this.http.patch<ICampaign[]>(`${this.apiUrl}/campaign/${id}`, formData);
  }

  getColumn(): TableColumn<Partial<ICampaign>>[] {
    return [
      {
        key: 'CampaignId',
        type: 'text',
        label: 'CampaignId',
      },
      {
        key: 'Title',
        type: 'text',
        label: 'Title',
      },
      {
        key: 'CampaignType',
        type: 'text',
        label: 'Type',
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
        key: 'IsActive',
        label: 'Active',
        type: 'boolean',
      },
    ];
  }

  getdropdown(): any {
    return this.http.get(`${this.apiUrl}/campaign/dropdown/`);
  }

}
