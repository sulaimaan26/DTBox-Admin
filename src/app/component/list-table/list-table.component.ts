import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Commondisplay} from "../../_model/commondisplay";
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
import {CRUDOperation} from "../../_model/ApiResponse";
import {ContainerSpec} from "../../_model/CurrencyCode";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {allowedDropdowns, dropdown} from "../../_model/Dropdowns";

type allowedTypes = ContainerSpec
@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})

export class ListTableComponent implements OnInit {

  columns:TableColumn<allowedTypes>[]
  detailPageLink:Observable<string>
  @Input() parentService:CRUDOperation<allowedListTable>
  @Input() optionList:Observable<allowedTableDropdown>


  displayedColumns:string[]
  showMessage$:Subject<boolean> = new Subject<boolean>()

  $subscription:Subscription
  // MatPaginator Output
  pageEvent: PageEvent;
  tableData: Commondisplay[] = [];

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
    private _httpClient: HttpClient,
    public customerService:CommonDiplayService
  ) {}

  ngOnInit(): void {
    this.columns = this.parentService.getColumn()
    this.displayedColumns = this.columns.map(c => c.key);
    this.detailPageLink = this.parentService.getDetailLink()
  }

  public setParentService(services:CRUDOperation<allowedListTable>){
    this.parentService = services
  }

  ngAfterViewInit() {


    // If the user changes the sort order, reset back to the first page.
    this.$subscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.$subscription = this.search.subscribe(() => this.paginator.pageIndex = 0)

    this.$subscription = merge(this.sort.sortChange, this.paginator.page, this.search)
      .pipe(
        startWith({}),
        switchMap((search) => {

          this.isLoadingResults = true;
          return this.parentService!.getAll(
            // this.sort.active,
            // this.sort.direction == 'asc' ? true : false,
            // this.pageEvent == undefined ? 10 : this.pageEvent.pageSize,
            // this.paginator.pageIndex+1,
            // typeof search == 'string' ? search+'' : ''
          ).pipe(
            catchError(() => of(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data.result === null;

          if (data.result === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalCount;

          return data.result;
        }),
        map((data =>{
          if(data.length == 0) this.showMessage$.next(true);
          else this.showMessage$.next(false);
          return data;
        } ))
      )

      .subscribe(data => {
        this.tableData = data
      });

  }

  navigateToCustomer(data){
    console.log(data)
  }

  performSearch(keyword){
    this.search.next(keyword.target.value)
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
