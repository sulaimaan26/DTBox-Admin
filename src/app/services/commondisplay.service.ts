import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable, of} from "rxjs";
import {numberSeries} from "../_model/numberseries";
import {CommonDisplay, Commondisplay, CustomerDropdown, getAllCustomerApiResponse} from "../_model/commondisplay";
import {CRUDOperation, CRUDOperationV2, getAllApiResponse} from "../_model/ApiResponse";

@Injectable({
  providedIn: 'root'
})
export class CommonDiplayService implements CRUDOperationV2<CommonDisplay> {

  private apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  getCreateLink(): Observable<string> {
    return of('/admin/commondisplay/create/')
  }

  getDetailLink(): Observable<string> {
    ``
    return of('/admin/commondisplay/update/')
  }

  create(formData: FormData): any {
    return this.http.post(`${this.apiUrl}/commondisplay`, formData)
  }

  getAll() {
    return this.http.get<getAllApiResponse<CommonDisplay>>(`${this.apiUrl}/commondisplay`)
  }

  get(commonDisplayId): any {
    return this.http.get(`${this.apiUrl}/commondisplay/${commonDisplayId}`)
  }

  getdropdown(): any {
    return this.http.get(`${this.apiUrl}/commondisplay/dropdown/`)
  }

  update(customerid, formData: FormData): any {
    return this.http.put(`${this.apiUrl}/commondisplay/${customerid}`, formData)
  }


  getColumn() {
    return [
      {
        key: 'id',
        type: 'text',
        label: 'Id',
      },
      {
        key: 'messages',
        type: 'text',
        label: 'messages',
      },
      {
        key: 'messageDuration',
        type: 'text',
        label: 'message Duration',
      },
      {
        key: 'adDuration',
        type: 'text',
        label: 'Ad Duration',
      },
      {
        key: 'isActive',
        type: 'text',
        label: 'is Active',
      }

    ]
  }

  uploadFile(formData: FormData): any {
    formData.append('path', 'commondisplay')
    return this.http.post(`${this.apiUrl}/file/upload`, formData, {
      reportProgress: true,
      observe:'response'
    })
  }

  downloadFile(url:string): any {
    return this.http.get(url, {responseType: 'blob'})
  }
}
