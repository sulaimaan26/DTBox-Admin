import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { headerButtons } from 'src/app/_model/headerButtons';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, pluck} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {StageName, stageType} from "../../_model/templateConfig/stages";
import {MappingInfo} from "../../_model/templateConfig/menuConfig";
import {Header, RouteData} from "../../_model/header";
import {data} from "jquery";
import {Data} from "@angular/router";

export interface User {
  id: number;
  username: string;
}

export class Album {
  userId: number;
  id: number;
  title: string;

  static asFormGroup(album: Album): FormGroup {
    const fg = new FormGroup({
      userId: new FormControl(album.userId, Validators.required),
      id: new FormControl(album.id, Validators.required),
      title: new FormControl(album.title, Validators.required)
    });
    return fg;
  }
}

@Injectable({
  providedIn: 'root'
})


export class ButtonControlService {

  public triggerButton:BehaviorSubject<headerButtons> = new BehaviorSubject(null);
  public triggerMenu:BehaviorSubject<boolean> = new BehaviorSubject(null);
  public mapId:BehaviorSubject<number | string> = new BehaviorSubject(null);
  public tableName:BehaviorSubject<string> = new BehaviorSubject(null);


  /*
  * Form Stage
  * */
  public sendMappingConfig:BehaviorSubject<MappingInfo> = new BehaviorSubject(null);
  public goNext:BehaviorSubject<boolean> = new BehaviorSubject(null);
  public goBack:BehaviorSubject<boolean> = new BehaviorSubject(null);


  /*
  *
  * Breadcrumb
  * */

  updateBreadCrumb:BehaviorSubject<Header> = new BehaviorSubject<Header>(null);

  constructor(private _http: HttpClient) {  }

  /** Returns 4 Albums from 100 */
  getAll(): Observable<Album[]> {
    const url = 'https://jsonplaceholder.typicode.com/albums';
    return this._http.get<Album[]>(url)
      .pipe(map((albums: Album[]) => {
        return albums.slice(8, 12);
      }));
  }

  updateCrumb(routeData:Observable<Data>){
    routeData.pipe(pluck("header")).subscribe((data:Header)=>{
      this.updateBreadCrumb.next(data)
    })

  }

  getAllAsFormArray(): Observable<FormArray> {
    return this.getAll().pipe(map((albums: Album[]) => {
      // Maps all the albums into a formGroup defined in tge album.model.ts
      const fgs = albums.map(Album.asFormGroup);
      return new FormArray(fgs);
    }));
  }

  getAlls(): Observable<User[]> {
    const url = 'https://jsonplaceholder.typicode.com/users';
    return this._http.get<User[]>(url);
  }
}
