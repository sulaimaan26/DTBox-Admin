import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  public localStorageData:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  addItem(key,value){
    localStorage.setItem(key,value)
    this.localStorageData.next(true)
  }

  removeItem(key){
    localStorage.removeItem(key)
    this.localStorageData.next(true)
  }

  getItem(key){
    return localStorage.getItem(key)
  }
}
