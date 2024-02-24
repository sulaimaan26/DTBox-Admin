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
import {
  allowedServices,
  EditableTable,
  TableColumn,
} from '../../_model/TableColumn';
import { pluck } from 'rxjs/operators';
import { allowedDropdowns, dropdown } from '../../_model/Dropdowns';
import { DateFormatterService } from 'src/app/services/dateformatter.service';

@Component({
  selector: 'app-list-input-table',
  templateUrl: './list-input-table.component.html',
  styleUrls: ['./list-input-table.component.css'],
})
export class ListInputTableComponent implements OnInit {
  // @Input() parentService: EditableTableWithSuggestion<allowedServices>;
  @Input() newRowModel: EditableTable;
  @Input() tableName: string;
  @Input() optionList: Observable<allowedDropdowns>;
  @Input() TableData: EditableTable[];
  @Input() Columns: TableColumn<EditableTable>[];
  @Input() $makeTableEditInActive = new Subject<allowedServices>();
  @Input() isDeleteRequired = true;
  @Input() sortColumnKey: string;
  @Input() sortType: 'asc' | 'desc' = 'desc';
  @Input() $updateTable = new Subject<EditableTable[]>();
  @Output() savedData = new EventEmitter<any>();
  @Output() removedData = new EventEmitter<any>();
  @Output() addRowEvent = new EventEmitter<any>();
  @Input() addRowsAsEvent = false;
  @Output() rowClickEvent = new EventEmitter<EditableTable>();

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

  dataSource = new MatTableDataSource<EditableTable>();
  tableData: EditableTable[] = [];
  allTableData: allowedServices[] = [];
  activeRow: allowedServices;
  valid: any = {};

  //Only If it is used as option selector
  @Input() allowAddingRow = false;
  @Output() selectedValue = new EventEmitter<any>();
  @Output() addedValue = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog,
    public helperService: HelperService,
    public dateFormatterService: DateFormatterService,
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
    this.$subscription = this.$updateTable.subscribe((tableData) => {
      this.dataSource.data = tableData;
      this.tableData = tableData;
    });
  }

  ngAfterViewInit() {
    this.dataSource.data = this.TableData;
    this.tableData = this.TableData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  performSearch($event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  saveChanges(row: allowedServices) {
    this.savedData.emit(row);
  }

  cancelChanges(row: allowedServices) {
    let index = this.tableData.findIndex((e) => e.id == row.id);
    this.tableData[index] = this.activeRow;
    this.dataSource.data = [...this.tableData];
    // row.isEdit = false
    this.isEditActive = false;
    this.$updateTable.next(this.tableData);
  }

  addRow() {
    if (this.isEditActive) return;
    this.addRowEvent.emit(true);
    if (this.addRowsAsEvent) return;
    // const newRow: allowedServices = this.parentService.addRow();
    this.dataSource.data = [{ ...this.newRowModel }, ...this.dataSource.data];
    this.isEditActive = true;
  }

  removeRow($event) {
    this.removedData.emit($event);

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
    if (this.allowAddingRow) {
      row.id = parseInt(row.id);
      this.selectedValue.emit(row);
    }
  }

  clickedRow($event) {
    this.rowClickEvent.emit($event);
  }
}
