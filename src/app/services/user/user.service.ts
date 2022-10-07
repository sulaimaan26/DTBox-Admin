import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl;


  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }

  createCustomer(userformdata:FormData){
    return this.http.post<any>(`${this.apiUrl}/user/`,userformdata)
  }

}
