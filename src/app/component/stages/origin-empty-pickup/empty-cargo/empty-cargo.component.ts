import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import OriginEmptyPickup, {EmptyCargo} from "../../../../_model/Jobcard/Stages/OriginEmptyPickup";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../../../services/helper/helper.service";
export const EmptySurveyColumns = [
  {
    key: 'ScopeType',
    type: 'select',
    label: 'ScopeType',
    options:[
      'Scope Type',
      'Empty Pickup',
      'Factory Stuffing',
      'CFS Stuffing',
      'Empty Storage',
      'Forwarding'
    ]
  },
  {
    key: 'TransporterName',
    type: 'text',
    label: 'TransporterName',
  },
  {
    key: 'TruckNumber',
    type: 'text',
    label: 'TruckNumber',
  },
  {
    key: 'EmptyPickupPoint',
    type: 'text',
    label: 'EmptyPickupPoint',
  },
  {
    key: 'EmptyDropPoint',
    type: 'text',
    label: 'EmptyDropPoint',
  },
  {
    key: 'CNTRNO',
    type: 'text',
    label: 'CNTRNO',
  },
  {
    key: 'EmptyPickupDate',
    type: 'date',
    label: 'EmptyPickupDate',
  },
  {
    key: 'EmptyOutDate',
    type: 'date',
    label: 'EmptyOutDate',
  },
  {
    key: 'DropPointArrivedDate',
    type: 'date',
    label: 'DropPointArrivedDate',
  },
  {
    key: 'StuffingCompletedDate',
    type: 'date',
    label: 'StuffingCompletedDate',
  },
  {
    key: 'FactoryOutDate',
    type: 'date',
    label: 'FactoryOutDate',
  },
  {
    key: 'WarehouseArrivedDate',
    type: 'date',
    label: 'WarehouseArrivedDate',
  },
  {
    key: 'WarehouseOutDate',
    type: 'date',
    label: 'WarehouseOutDate',
  },
  {
    key: 'TerminalOffloadingDate',
    type: 'date',
    label: 'TerminalOffloadingDate',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
@Component({
  selector: 'app-empty-cargo',
  templateUrl: './empty-cargo.component.html',
  styleUrls: ['./empty-cargo.component.css']
})
export class EmptyCargoComponent implements OnInit {

  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  @Input() emptyCargoData: EmptyCargo[] = []
  @Output() emptyCargoTableData = new EventEmitter<EmptyCargo[]>();
  @Input() emptyCargoData_UpdateForm: Subject<OriginEmptyPickup> = new Subject<OriginEmptyPickup>();
  isEditActive = false

  displayedColumns: string[] = EmptySurveyColumns.map((col) => col.key);
  columnsSchema: any = EmptySurveyColumns;
  dataSource = new MatTableDataSource<EmptyCargo>();
  valid: any = {};

  constructor(
    public dialog: MatDialog,
    public helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.emptyCargoData

    this.isSubmittedStat.subscribe((stat)=>{
      if(stat){
        this.emptyCargoTableData.emit(this.emptyCargoData)
      }
    })

    this.emptyCargoData_UpdateForm.subscribe((bookingData)=>{
      if(bookingData) this.getTableData(bookingData.emptycargo)
    })

  }

  getTableData(emptyCargoData:EmptyCargo[]){
    this.emptyCargoData = emptyCargoData ?? []
    this.dataSource.data = this.emptyCargoData
  }

  editRow(row: EmptyCargo) {
    // if (row._id === 0) {
    //   row._id = Date.now()
    //   this.emptyCargoData.push(row)
    //   row.isEdit = false
    // } else {
    //   let index = this.emptyCargoData.findIndex(t =>t._id === row._id)
    //   this.emptyCargoData[index] = row
    //   row.isEdit = false
    //
    //
    // }
    this.isEditActive = false
  }

  addRow() {
    // const newRow: EmptyCargo = {
    //   _id: 0,
    //   TransporterName:'',
    //   CNTRNO:'',
    //   EmptyDropPoint:'',
    //   EmptyOutDate:'',
    //   EmptyPickupDate:'',
    //   EmptyPickupPoint:'',
    //   TruckNumber:'',
    //   DropPointArrivedDate:'',
    //   FactoryOutDate:'',
    //   ScopeType:'',
    //   StuffingCompletedDate:'',
    //   TerminalOffloadingDate:'',
    //   WarehouseArrivedDate:'',
    //   WarehouseOutDate:'',
    //   isEdit:true,
    //   isSelected:false
    // };
    // this.dataSource.data = [newRow, ...this.dataSource.data];
    // this.isEditActive = true
  }

  removeRow(id: number) {
    // this.dataSource.data = this.dataSource.data.filter(
    //   (u: EmptyCargo) => u._id !== id
    // );
    // this.emptyCargoData = this.dataSource.data
    // this.isEditActive = false
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }


}
