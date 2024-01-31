import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBanner, IBannerVideo } from '../_model/banner';
import { TableColumn } from '../_model/TableColumn';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  create(formData: IBanner) {
    return this.http.post<IBanner>(`${this.apiUrl}/banner`, formData);
  }

  update(bannerId: number, formData: IBanner) {
    return this.http.put<IBanner>(
      `${this.apiUrl}/banner/${bannerId}`,
      formData
    );
  }

  getAll() {
    return this.http.get<IBanner[]>(`${this.apiUrl}/banner`);
  }

  get(id): any {
    return this.http.get(`${this.apiUrl}/banner/${id}`);
  }

  patch(id, formData: IBanner): any {
    return this.http.patch<IBanner[]>(`${this.apiUrl}/banner/${id}`, formData);
  }

  getColumn(): TableColumn<Partial<IBanner>>[] {
    return [
      {
        key: 'BannerId',
        type: 'text',
        label: 'BannerId',
      },
      {
        key: 'StartDate',
        label: 'StartDate',
        type: 'date',
      },
      {
        key: 'EndDate',
        label: 'StartDate',
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
    return this.http.get(`${this.apiUrl}/event/dropdown/`);
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

  patchBannerVideo(videoId, bannerId, formData: IBannerVideo): Observable<IBanner> {
    return this.http.patch<IBanner>(
      `${this.apiUrl}/banner/video/${bannerId}?videoId=${videoId}`,
      formData
    );
  }
}
