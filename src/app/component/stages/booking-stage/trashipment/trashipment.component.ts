import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import Booking, {LessContainerLoad, Transhipment} from "../../../../_model/Jobcard/Stages/Booking";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../../../services/helper/helper.service";

export const TranshipmentColumns = [
  {
    key: 'DateOfStatus',
    type: 'date',
    label: 'Date Of Status',
  },
  {
    key: 'TransitDetails',
    type: 'text',
    label: 'TransitDetails',
  },
  {
    key: 'POL',
    type: 'text',
    label: 'POL',
  },
  {
    key: 'POD',
    type: 'text',
    label: 'POD',
  },
  {
    key: 'VesselORFlight',
    type: 'text',
    label: 'VesselORFlight',
  },
  {
    key: 'ETD',
    type: 'text',
    label: 'ETD',
  },
  {
    key: 'ETA',
    type: 'text',
    label: 'ETA',
  },
  {
    key: 'Remark',
    type: 'text',
    label: 'Remark'
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'app-trashipment',
  templateUrl: './trashipment.component.html',
  styleUrls: ['./trashipment.component.css']
})
export class TrashipmentComponent implements OnInit {

  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  @Input() transhipmentData: Transhipment[] = []
  @Output() transhipmentTableData = new EventEmitter<Transhipment[]>();
  @Input() transhipmentData_UpdateForm: Subject<Booking> = new Subject<Booking>();
  isEditActive = false

  displayedColumns: string[] = TranshipmentColumns.map((col) => col.key);
  columnsSchema: any = TranshipmentColumns;
  dataSource = new MatTableDataSource<Transhipment>();
  valid: any = {};

  constructor(
    public dialog: MatDialog,
    public helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.transhipmentData

    this.isSubmittedStat.subscribe((stat)=>{
      if(stat){
        this.transhipmentTableData.emit(this.transhipmentData)
      }
    })

    this.transhipmentData_UpdateForm.subscribe((bookingData)=>{

      if(bookingData) this.getTableData(bookingData.transhipment)
    })
  }

  getTableData(TranshipmentData:Transhipment[]){
    this.transhipmentData = TranshipmentData
    this.dataSource.data = this.transhipmentData
    console.log(this.transhipmentData)
  }

  editRow(row: Transhipment) {
    if (row._id === 0) {
      row._id = Date.now()
      this.transhipmentData.push(row)
      row.isEdit = false
    } else {
      let index = this.transhipmentData.findIndex(t =>t._id === row._id)
      this.transhipmentData[index] = row
      row.isEdit = false


    }
    this.isEditActive = false
  }

  addRow() {
    console.log('addrow')
    const newRow: Transhipment = {
      _id: 0,
      VesselORFlight:'',
      TransitDetails:'',
      Remark:'',
      POL:'',
      POD:'',
      ETD:'',
      ETA:'',
      DateOfStatus:'',
      isEdit: true,
      isSelected:false
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
    this.isEditActive = true
  }

  removeRow(id: number) {
    this.dataSource.data = this.dataSource.data.filter(
      (u: Transhipment) => u._id !== id
    );
    this.transhipmentData = this.dataSource.data
    this.isEditActive = false

    // this.userService.deleteUser(id).subscribe(() => {
    //   this.dataSource.data = this.dataSource.data.filter(
    //     (u: LessContainerLoad) => u.id !== id
    //   );
    // });
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

}
