import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISettings } from '../_model/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  getAllSettings() {
    return this.http.get<ISettings[]>(`${this.apiUrl}/settings/`);
  }

  saveAllSettings(formdata: ISettings[]) {
    return this.http.put<ISettings[]>(`${this.apiUrl}/settings/`, formdata);
  }

  sendNotification(formdata: any) {
    return this.http.post<any>(`${this.apiUrl}/notifications/`, formdata);
  }
}
