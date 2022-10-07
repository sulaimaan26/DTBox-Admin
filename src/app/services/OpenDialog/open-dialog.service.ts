import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BehaviorSubject, Observable} from "rxjs";
import {ListTableComponent} from "../../component/list-table/list-table.component";
import {headerButtons} from "../../_model/headerButtons";
import {allowedListTable, allowedServices} from "../../_model/TableColumn";
import {CRUDOperation} from "../../_model/ApiResponse";

interface openDialog {
  serviceName:CRUDOperation<allowedListTable>
  showPopup:boolean
}

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  public serviceInfo:BehaviorSubject<openDialog> = new BehaviorSubject(null);
  public showPopup:BehaviorSubject<openDialog> = new BehaviorSubject(null);



  constructor(public dialog: MatDialog) {

  }

  openDialog(){

  }


}
