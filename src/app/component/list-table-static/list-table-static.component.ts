import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {CommonDiplayService} from "../../services/commondisplay.service";
import {ActivatedRoute} from "@angular/router";
import {ButtonControlService} from "../../services/buttonControl/button-control.service";
import {BehaviorSubject, merge, Observable, of, Subject, Subscription} from "rxjs";
import {catchError, map, pluck, startWith, switchMap, tap} from "rxjs/operators";
import {
  allowedListTable,
  allowedSearchFieldDropdown,
  allowedServices,
  allowedTableDropdown,
  TableColumn
} from "../../_model/TableColumn";
import {CRUDOperation, CRUDOperationV2} from "../../_model/ApiResponse";
import {ContainerSpec} from "../../_model/CurrencyCode";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {allowedDropdowns, dropdown} from "../../_model/Dropdowns";
import { MatTableDataSource } from '@angular/material/table';

type allowedTypes = ContainerSpec
@Component({
  selector: 'app-list-table-static',
  templateUrl: './list-table-static.component.html',
  styleUrls: ['./list-table-static.component.css']
})

export class ListTableStaticComponent implements OnInit {

  columns:TableColumn<allowedTypes>[]
  detailPageLink:Observable<string>
  @Input() parentService:CRUDOperationV2<allowedListTable>
  @Input() optionList:Observable<allowedTableDropdown>
  createPageLink:Observable<string>


  displayedColumns:string[]
  showMessage$:Subject<boolean> = new Subject<boolean>()

  $subscription:Subscription
  // MatPaginator Output
  pageEvent: PageEvent;
  tableData: allowedListTable[] = [];
  dataSource: MatTableDataSource<allowedListTable>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  search = new BehaviorSubject<string>('');


  //Only If it is used as option selector
  @Input() isOptionSelector = false
  @Output() selectedValue = new EventEmitter<any>()

  constructor(
    public customerService:CommonDiplayService
  ) {}

  ngOnInit(): void {
    this.columns = this.parentService.getColumn()
    this.displayedColumns = this.columns.map(c => c.key);
    this.detailPageLink = this.parentService.getDetailLink()
    this.createPageLink = this.parentService.getCreateLink()
  }

  public setParentService(services:CRUDOperationV2<allowedListTable>){
    this.parentService = services
  }

  ngAfterViewInit() {


    this.$subscription = this.parentService.getAll().subscribe((data)=>{
        this.tableData = data
        this.dataSource = new MatTableDataSource(this.tableData)
        this.resultsLength = data.length
        this.isLoadingResults = false

    })

  }

  navigateToCustomer(data){
    console.log(data)
  }

  performSearch(keyword){
    this.dataSource.filter = keyword.target.value.trim().toLowerCase();
  }

  whenRowClicked(row){
    if(this.isOptionSelector){
      this.selectedValue.emit(row)
    }
  }

  getDropDownOptions(dropdownkey:string):Observable<dropdown[]>{
    return this.optionList.pipe(pluck(dropdownkey))
  }

  ngOnDestroy(): void {
    if(this.$subscription) this.$subscription.unsubscribe()
  }

}
