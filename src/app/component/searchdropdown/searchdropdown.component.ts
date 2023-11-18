import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSelect} from "@angular/material/select";
import {allowedDropdowns, dropdown} from "../../_model/Dropdowns";
import {Observable, of, ReplaySubject, Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {pluck, take, takeUntil, tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ListTableComponent} from "../list-table/list-table.component";
import {CommonDiplayService} from "../../services/commondisplay.service";
import {VendorService} from "../../services/vendor/vendor.service";
import {OpenDialogService} from "../../services/OpenDialog/open-dialog.service";
import {OptionDialogComponent} from "../option-dialog/option-dialog.component";
import {UnitOfMeasureService} from "../../services/unitofmeasure/unit-of-measure.service";
import {
  CRUDOperation,
  EditableTableCRUDOperation,
  EditableTableWithDropdown,
  EditableTableWithSuggestion
} from "../../_model/ApiResponse";
import {allowedListTable, allowedSearchFieldDropdown, allowedServices, TableName} from "../../_model/TableColumn";
import {ListInputTableComponent} from "../list-input-table/list-input-table.component";

@Component({
  selector: 'app-searchdropdown',
  templateUrl: './searchdropdown.component.html',
  styleUrls: ['./searchdropdown.component.css']
})
export class SearchdropdownComponent implements OnInit {

  //ShippingTypeDropdown
  @ViewChild('searchselect', { static: true }) shippingtype: MatSelect;
  dropdownOptions:dropdown[]
  @Input() dropdownKey:string
  @Input() dropDowns:ReplaySubject<allowedSearchFieldDropdown>
  @Input() dropDownsFetch:ReplaySubject<allowedSearchFieldDropdown>
  @Input() selectedOption:number| string
  @Output() selectedOptionId = new EventEmitter();
  @Input() placeholder:string
  @Input() TableSelector:boolean
  @Input() inputTableSelector:boolean
  @Input() parentService:CRUDOperation<allowedListTable>
  @Input() inputTableParentService:EditableTableWithDropdown<allowedServices> | EditableTableWithSuggestion<allowedServices> | EditableTableCRUDOperation<allowedServices>
  //@Input() dropdownKeyForInputTable
  displayDialog = false
  selectedValueFromPopup = new Subject<any>();
  @Output() makeDropdownRequest = new EventEmitter<boolean>();
  @Input() popHasDropdown = false

  public selectedOptionCtrl = new FormControl();
  filteredOptions: ReplaySubject<dropdown[]> = new ReplaySubject<dropdown[]>(1);
  public shippingTypeFilterCtrl = new FormControl();
  protected _onDestroy = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    public vendorService:VendorService,
    private openDialogService:OpenDialogService
  ) { }

  ngOnInit(): void {
    this.dropDowns.pipe(pluck(this.dropdownKey)).subscribe((options:dropdown[])=>{
      this.dropdownOptions = options

      this.selectedOptionCtrl.setValue(this.dropdownOptions.filter(options => (options.id ?? options.code) == this.selectedOption)[0])

      this.filteredOptions.next(this.dropdownOptions.slice());
      this.shippingTypeFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy))
        .subscribe(()=> {
          this.filterShippingType()
        });
    })



    this.selectedOptionCtrl.valueChanges.subscribe((selectedOption)=>{
      if(selectedOption == undefined) return;
      this.emitSelectedDropDownId(selectedOption)
    })

    this.selectedValueFromPopup.subscribe((selectedOptionFromPopup)=>{
      this.selectedOptionCtrl.setValue(selectedOptionFromPopup)
      this.dialog.closeAll()
    })

  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  protected setInitialValue() {
    this.filteredOptions
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.shippingtype.compareWith = (a: dropdown, b: dropdown) => a && b && (a.id ?? a.code) === (b.id ?? b.code);
      });
  }

  protected filterShippingType() {
    if (!this.dropdownOptions) {
      return;
    }
    // get the search keyword
    let search = this.shippingTypeFilterCtrl.value
    if (!search) {
      this.filteredOptions.next(this.dropdownOptions.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks

    this.filteredOptions.next(
      this.dropdownOptions.filter((bank) => {
        if(bank.value){
          return (bank.code + ' - '+ bank.value).toString().toLowerCase().indexOf(search) > -1
        }else{
          return bank.code.toString().toLowerCase().indexOf(search) > -1
        }
        //((bank.value ? bank.code + ' - '+ bank.value : '') ?? bank.code).toString().toLowerCase().indexOf(search) > -1
      })
    );
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  emitSelectedDropDownId(selectedOption:dropdown){
    let selectedId = this.dropdownOptions.filter( se => (se.id ?? se.code) == (selectedOption.id ?? selectedOption.code))[0]
    this.selectedOptionId.emit(selectedId.id ?? selectedOption.code)
  }


  showDialog(){
    this.displayDialog = true
  }


  openDialog(){
    if(this.inputTableSelector){
      if(this.popHasDropdown){
        (this.inputTableParentService as EditableTableWithDropdown<allowedServices>).getDropdown().subscribe((res)=>{
          const dialogRef = this.dialog.open(ListInputTableComponent,{
            width:'100%'
          })

          dialogRef.componentInstance.parentService = this.inputTableParentService as EditableTableWithSuggestion<allowedServices>
          dialogRef.componentInstance.tableName = TableName.ITEMMASTER
          dialogRef.componentInstance.optionList = of(res)
          dialogRef.componentInstance.allowAddingRow = true
          //
          dialogRef.componentInstance.selectedValue.subscribe((data)=>{
            this.selectedValueFromPopup.next(data)
          })

          dialogRef.componentInstance.addedValue.subscribe((status)=>{
            if(status){
              this.makeDropdownRequest.emit(true)
              this.dropDownsFetch.pipe(pluck(this.dropdownKey)).subscribe((options:dropdown[])=>{
                this.dropdownOptions = options
                this.filteredOptions.next(this.dropdownOptions.slice());
              })
            }
          })
        })
      }else{
        const dialogRef = this.dialog.open(ListInputTableComponent,{
          width:'100%'
        })

        dialogRef.componentInstance.parentService = this.inputTableParentService as EditableTableWithSuggestion<allowedServices>
        dialogRef.componentInstance.tableName = TableName.ITEMMASTER
        dialogRef.componentInstance.allowAddingRow = true
        //
        dialogRef.componentInstance.selectedValue.subscribe((data)=>{
          this.selectedValueFromPopup.next(data)
        })

        dialogRef.componentInstance.addedValue.subscribe((status)=>{
          if(status){
            this.makeDropdownRequest.emit(true)
            this.dropDownsFetch.pipe(pluck(this.dropdownKey)).subscribe((options:dropdown[])=>{
              this.dropdownOptions = options
              this.filteredOptions.next(this.dropdownOptions.slice());
            })
          }
        })
      }



    }else if(this.TableSelector){
      const dialogRef = this.dialog.open(ListTableComponent,{
        width:'100%'
      })

      dialogRef.componentInstance.parentService = this.parentService
      dialogRef.componentInstance.isOptionSelector = true

      dialogRef.componentInstance.selectedValue.subscribe((data)=>{
        this.selectedValueFromPopup.next(data)
      })
    }


  }




}
