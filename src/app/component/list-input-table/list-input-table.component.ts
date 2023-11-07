import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { EditableTableWithSuggestion } from '../../_model/ApiResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from '../../services/helper/helper.service';
import { NotificationService } from '../../services/NotificationService/notification-service.service';
import { ButtonControlService } from '../../services/buttonControl/button-control.service';
import { ActivatedRoute } from '@angular/router';
import { allowedServices, TableColumn } from '../../_model/TableColumn';
import { pluck } from 'rxjs/operators';
import { allowedDropdowns, dropdown } from '../../_model/Dropdowns';

@Component({
  selector: 'app-list-input-table',
  templateUrl: './list-input-table.component.html',
  styleUrls: ['./list-input-table.component.css'],
})
export class ListInputTableComponent implements OnInit {
  @Input() parentService: EditableTableWithSuggestion<allowedServices>;
  @Input() tableName: string;
  @Input() optionList: Observable<allowedDropdowns>;
  @Input() TableData: allowedServices[];
  @Input() Columns: TableColumn<allowedServices>[];
  @Input() $makeTableEditInActive = new Subject<allowedServices>();
  @Input() isDeleteRequired = true;
  @Input() sortColumnKey:keyof allowedServices;
  @Output() savedData = new EventEmitter<allowedServices>();

  $subscription: Subscription;
  isEditActive = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  search = new BehaviorSubject<string>('');

  options: Observable<dropdown>;
  listStat = {};
  listValue: string;

  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;

  showMessage$: Subject<boolean> = new Subject<boolean>();
  isTableChanged: Subject<boolean> = new Subject<boolean>();

  displayedColumns: string[];
  columnsSchema: TableColumn<allowedServices>[];

  dataSource = new MatTableDataSource<allowedServices>();
  tableData: allowedServices[] = [];
  allTableData: allowedServices[] = [];
  activeRow: allowedServices;
  valid: any = {};

  //Only If it is used as option selector
  @Input() isOptionSelector = false;
  @Output() selectedValue = new EventEmitter<any>();
  @Output() addedValue = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog,
    public helperService: HelperService,
    private notificationService: NotificationService,
    private buttonControlService: ButtonControlService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.buttonControlService.updateCrumb(this.route.data)
    //this.getTableData()

    this.$subscription = this.buttonControlService.tableName.subscribe(
      (name) => {
        if (name == this.tableName) {
          this.addRow();
        }
      }
    );

    this.$subscription = this.$makeTableEditInActive.subscribe((res) => {
      if (res && !res.isEdit) this.isEditActive = false;
    });

    // this.Columns = this.parentService.getColumn();
    this.displayedColumns = this.Columns.map((col) => col.key);
    this.columnsSchema = this.Columns;
  }

  ngAfterViewInit() {
    this.dataSource.data = this.TableData;
    this.tableData = this.TableData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // If the user changes the sort order, reset back to the first page.
    // this.$subscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // this.$subscription = this.search.subscribe(() => this.paginator.pageIndex = 0)

    // this.$subscription = merge(this.sort.sortChange, this.paginator.page, this.search,this.isTableChanged)
    //   .pipe(
    //     startWith({}),
    //     switchMap((search) => {

    //       this.isLoadingResults = true;
    //       return this.parentService!.getAll(
    //       ).pipe(
    //         catchError(() => of(null)));
    //     }),
    //     map(data => {
    //       // Flip flag to show that loading has finished.
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = data.result === null;

    //       if (data.result === null) {
    //         return [];
    //       }

    //       // Only refresh the result length if there is new data. In case of rate
    //       // limit errors, we do not want to reset the paginator to zero, as that
    //       // would prevent users from re-triggering requests.
    //       this.resultsLength = data.totalCount;

    //       return data.result;
    //     }),
    //     map((data =>{
    //       if(data.length == 0) this.showMessage$.next(true);
    //       else this.showMessage$.next(false);
    //       return data;
    //     } ))
    //   )

    //   .subscribe((data) => {
    //     this.dataSource.data = data
    //     this.tableData = this.TableData
    //     // this.getAllData()
    //   });
  }

  performSearch($event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllData() {
    if (!this.parentService.getAllData) return;
    this.parentService
      .getAllData(this.resultsLength)
      .pipe(pluck('result'))
      .subscribe((data) => {
        // this.allTableData = data
      });
  }

  saveChanges(row: allowedServices) {
    this.savedData.emit(row);
    // this.parentService.saveChanges(row).subscribe(
    //   (res) => {
    //     // if (row._id === 0) {

    //     //   this.notificationService.showSuccess("Created Successfully!!!", "Success")

    //     //   row._id = res.id
    //     //   row.id = res.id
    //     //   this.tableData.push(row)
    //     //   this.dataSource.data = this.tableData
    //     //   row.isEdit = false
    //     //   this.isEditActive = false

    //     // }
    //     // else {
    //     //   this.notificationService.showSuccess("Updated Successfully!!!", "Success")
    //     //   let index = this.tableData.findIndex(t => t.id === row.id)
    //     //   this.tableData[index] = row
    //     //   this.dataSource.data = this.tableData
    //     //   row.isEdit = false
    //     //   this.isEditActive = false
    //     // }
    //     this.showMessage$.next(false);
    //     this.addedValue.emit(true);
    //     //this.isTableChanged.next(true)
    //   },
    //   (err) => {
    //     this.notificationService.showError(err, 'Failed');
    //   }
    // );
  }

  cancelChanges(row: allowedServices) {
    let index = this.tableData.findIndex((e) => e.id == row.id);
    this.tableData[index] = this.activeRow;
    this.dataSource.data = [...this.tableData];
    // row.isEdit = false
    this.isEditActive = false;
    this.isTableChanged.next(true);
  }

  addRow() {
    if (this.isEditActive) return;

    const newRow: allowedServices = this.parentService.addRow();
    this.dataSource.data = [newRow, ...this.dataSource.data];
    this.isEditActive = true;
  }

  removeRow(id: number) {
    this.$subscription = this.parentService.removeRow(id).subscribe(
      () => {
        this.notificationService.showSuccess('Deleted Successfully', 'Success');

        --this.resultsLength;
        // if((this.resultsLength % this.pageEvent.pageSize) == 0){
        //   this.paginator.previousPage()
        //   this.paginator.pageIndex = 0
        // }

        this.dataSource.data = this.dataSource.data.filter(
          (u: allowedServices) => u.id !== id
        );
        this.tableData = this.dataSource.data;
      },
      (err) => {
        this.notificationService.showError(err, 'Failed');
      }
    );

    this.isEditActive = false;
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  showInputField(element) {
    if (this.isEditActive) return;
    this.activeRow = { ...element };
    element.isEdit = !element.isEdit;
    this.isEditActive = true;
  }

  ngOnDestroy(): void {
    if (this.$subscription) this.$subscription.unsubscribe();
    this.buttonControlService.tableName.next(null);
  }

  getDropDownOptions(dropdownkey: string): Observable<dropdown[]> {
    return this.optionList.pipe(pluck(dropdownkey));
  }

  getMultipleDropdownOptions(dropdownkey: string): Observable<dropdown[]> {
    return this.optionList.pipe(pluck(dropdownkey));
  }

  showList(key) {
    this.listStat = true;
  }

  getListOptions(key, value) {
    let filteredResult = this.allTableData.filter((data) => {
      return (
        data[key] !== null &&
        data[key].toLowerCase().includes(value.toLowerCase())
      );
    });

    return [...new Set(filteredResult.map((result) => result[key]))];
  }

  sect(element, optionKey) {
    console.log(optionKey);
    console.log(element);
    console.log(element[optionKey]);
  }

  whenRowClicked(row) {
    if (this.isOptionSelector) {
      row.id = parseInt(row.id);
      this.selectedValue.emit(row);
    }
  }
}
