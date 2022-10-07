import {Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {allowedServices, TableColumn} from "../../_model/TableColumn";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {BehaviorSubject, merge, Observable, of, Subject, Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {EditableTableWithSuggestion} from "../../_model/ApiResponse";
import {allowedDropdowns, dropdown} from "../../_model/Dropdowns";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../services/helper/helper.service";
import {CurrencycodeService} from "../../services/currencycode/currencycode.service";
import {NotificationService} from "../../services/NotificationService/notification-service.service";
import {ButtonControlService} from "../../services/buttonControl/button-control.service";
import {ActivatedRoute} from "@angular/router";
import {catchError, filter, map, pluck, startWith, switchMap, take, tap} from "rxjs/operators";
import {FullContainerLoad} from "../../_model/Jobcard/Stages/Booking";
import {allowedFormTable} from "../../_model/FormInputTable";


@Component({
  selector: 'app-form-list-input-table',
  templateUrl: './form-list-input-table.component.html',
  styleUrls: ['./form-list-input-table.component.css']
})
export class FormListInputTableComponent implements OnInit {

  @Input() formTableData:BehaviorSubject<allowedFormTable[]>
  tableData:allowedFormTable[]
  @Input() newRow:allowedFormTable
  @Input() Columns:TableColumn<allowedFormTable>[]
  @Output() sendTableData = new EventEmitter<allowedFormTable[]>()
  hasData = false
  @Input() optionList:Observable<dropdown[]>
  dropdownOptions:dropdown[]
  isEditActive = false
  activeRow: allowedServices;
  pageEvent: PageEvent;
  resultsLength = 0;
  displayedColumns: string[]
  dataSource: MatTableDataSource<allowedFormTable>;
  search = new BehaviorSubject<string>('');
  valid: any = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  $subscription:Subscription

  constructor(
    public helperService:HelperService,
    private ngZone: NgZone
  ) {  }

  ngOnInit(): void {
    this.displayedColumns = this.Columns.map((col) => col.key);

    //Options for synchronous activity
    if(this.optionList){
      this.optionList.subscribe((options) => {
        this.dropdownOptions = options
      })
    }

  }

  @ViewChild('matTable') table: MatTable<any>;


  ngAfterViewInit() {
    this.formTableData.subscribe((data)=>{
      // Assign the data to the data source for the table to render
      this.tableData = data
      this.hasData = this.tableData.length > 0
      this.dataSource = new MatTableDataSource(this.tableData);
      //this.dataSource.data = this.tableData
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })


  }

  ngAfterViewChecked(){
    if (this.table) this.ngZone.onMicrotaskEmpty.pipe(take(5)).subscribe(() => this.table.updateStickyColumnStyles());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  showInputField(element) {
    if (this.isEditActive) return;
    this.activeRow = {...element}
    element.isEdit = !element.isEdit;
    this.isEditActive = true
  }

  addRow() {

    if (this.isEditActive) return;
    //this.newRow.isEdit = true
    //this.dataSource.data = [newRow, ...this.dataSource.data];
    this.dataSource = new MatTableDataSource([JSON.parse(JSON.stringify(this.newRow)), ...this.dataSource.data]);
    this.isEditActive = true
    this.hasData = true
  }

  removeRow(id: string) {

    this.dataSource.data = this.dataSource.data.filter((u: allowedServices) => u._id !== id);
    this.tableData = this.dataSource.data

    this.isEditActive = false
    this.sendTableData.emit(this.tableData)
  }

  whenRowClicked(element){

  }

  saveChanges(row){
    console.log(row)
    if (row._id === 0) {
      row._id = new Date()
      this.tableData.push(row)
      this.sendTableData.emit(this.tableData)
      this.dataSource.data = this.tableData
      row.isEdit = false
      this.isEditActive = false
    }
    else {
      let index = this.tableData.findIndex(t => t._id === row._id)
      this.tableData[index] = row
      this.sendTableData.emit(this.tableData)
      this.dataSource.data = this.tableData
      row.isEdit = false
      this.isEditActive = false
    }
    this.hasData = this.tableData.length > 0
  }

  cancelChanges(row){
    let index = this.tableData.findIndex((e) => e._id == row._id)
    this.tableData[index] = this.activeRow
    this.dataSource.data = [...this.tableData]
    row.isEdit = false
    this.isEditActive = false
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  getDropDownOptions(dropdownKey:string){
    return this.optionList.pipe(pluck(dropdownKey)) as Observable<dropdown[]>
  }


  getDependentDropDownOptions(col:TableColumn<any>, ele){
    if(ele[col.referenceCol1] == undefined) {
      return of([{
        id:null,
        code:'',
        value:''
      }])
    }

    return this.optionList.pipe(pluck(col.dropdownkey),
      map( (d:any[]) =>{
        return  d.filter( d => d !== undefined)
      } ),
      map((dropdown:dropdown[])=>{
        return dropdown.filter( d=> d['type'].toString().toLowerCase() == ele[col.referenceCol1].toString().toLowerCase())
      })) as Observable<dropdown[]>
  }


  getFirstLevelDependentDropDownOptions(col:TableColumn<any>, ele){

    if(this.dropdownOptions == undefined) {
      return of([{
        id:null,
        code:'',
        value:''
      }])
    }

    let dependentOptionDropdownKey = this.Columns.filter( c=> c.key == col.referenceCol1)[0].dropdownkey

    let Depentdropdonval = this.dropdownOptions[dependentOptionDropdownKey].filter(options => options.id ==  ele[col.referenceCol1])

    if(Depentdropdonval .length > 0) Depentdropdonval = Depentdropdonval[0].code

    let requiredOptionKey = col.displayOptionBasedOnCol1.filter(sect => sect.referenceCol1ValueEqualTo == Depentdropdonval)

    if(requiredOptionKey.length > 0) {
      return this.optionList.pipe(pluck(requiredOptionKey[0].optionListPropertyName)) as Observable<dropdown[]>
    }else{
      return of([{
        id:null,
        code:'',
        value:''
      }])
    }
  }


  getSecondLevelDependentDropDownOptions(col:TableColumn<any>,ele){

    if(this.dropdownOptions == undefined) {
      return of([{
        id:null,
        code:'',
        value:''
      }])
    }

    let reference1ColDropdownKey = this.Columns.filter( c=> c.key == col.referenceCol1)[0].dropdownkey


    let reference1ColValue = this.dropdownOptions[reference1ColDropdownKey].filter(options => options.id ==  ele[col.referenceCol1])


    if(reference1ColValue.length > 0 ){

      let secondLevelDropdownPropertyName = col.displayOptionBasedOnCol2.filter( c => c.referenceCol1ValueEqualTo == reference1ColValue[0].code)

  //    let reference2Column = this.Columns.filter( c => c.key == secondLevelDropdownPropertyName[0].referenceCol2Name)[0]

//      let reference2ColDropdownKey = reference2Column.displayOptionBasedOnCol1.filter(sect => sect.referenceCol1ValueEqualTo == reference1ColValue[0].code)


      let reference2ColValue = ele[secondLevelDropdownPropertyName[0].referenceCol2Name]


      if(secondLevelDropdownPropertyName.length > 0){
        let dropdownKey = secondLevelDropdownPropertyName[0].optionListPropertyName

        return this.optionList.pipe(pluck(dropdownKey),
          map((arr:any[])=>{
            return arr.filter( d => d['type'] == reference2ColValue)
          })
          ) as Observable<dropdown[]>
      }else{
        return of([{
          id:'',
          code:'',
          value:''
        }])
      }

    }else{
      return of([{
        id:null,
        code:'',
        value:''
      }])
    }

  }


  updateDropdownOption(){

  }

}
