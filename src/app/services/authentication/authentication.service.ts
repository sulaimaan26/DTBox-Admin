import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {  UserAuth } from 'src/app/_model/user';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private companyId = new BehaviorSubject<number>(0); // {1}
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<UserAuth>;
  private apiUrl;

  constructor(private http: HttpClient,private localStorageService:LocalstorageService,private routes:Router) {
    this.apiUrl = environment.baseUrl;
    try {
      JSON.parse(localStorage.getItem('currentUser'))
    } catch (e) {
      console.log(e)
      this.logout()
    }
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
      //localStorage.getItem('currentUser')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }

  get isLoggedIn() {
    if(this.currentUserValue){
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable(); // {2}
  }



  login(username, password) {
    return this.http
      .post<any>(`${this.apiUrl}/admin/login`, { username, password })
      .pipe(
        tap(console.log),
        map((user:UserAuth) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.loggedIn.next(true);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          // if(user.companyid.toString() != ''){
          //   //this.companyId.next(user.companyid)
          //   this.localStorageService.addItem('companyid', user.companyid);
          // }
         // this.loggedIn.next(true);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    //localStorage.removeItem('currentUser');
    localStorage.clear()
    this.currentUserSubject.next(null);
    this.loggedIn.next(false);
  }
}
