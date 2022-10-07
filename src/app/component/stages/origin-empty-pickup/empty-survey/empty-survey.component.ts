import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import Booking, {Transhipment} from "../../../../_model/Jobcard/Stages/Booking";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../../../services/helper/helper.service";
import OriginEmptyPickup, {EmptyCargo, EmptyPickup} from "../../../../_model/Jobcard/Stages/OriginEmptyPickup";

export const EmptySurveyColumns = [
  {
    key: 'SurveyorName',
    type: 'text',
    label: 'Survey/Name',
  },
  {
    key: 'SurveyLocation',
    type: 'text',
    label: 'Survey Location',
  },
  {
    key: 'SurveyDate',
    type: 'date',
    label: 'Survey Date',
  },
  {
    key: 'ContainerNumber',
    type: 'text',
    label: 'Container Number',

  },
  {
    key: 'SurveyReferenceNumber',
    type: 'text',
    label: 'Survey Reference Number',
    required: true
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];


@Component({
  selector: 'app-empty-survey',
  templateUrl: './empty-survey.component.html',
  styleUrls: ['./empty-survey.component.css']
})
export class EmptySurveyComponent implements OnInit {

  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  @Input() emptySurveyData: EmptyPickup[] = []
  @Output() emptySurveyTableData = new EventEmitter<EmptyPickup[]>();
  @Input() emptySurveyData_UpdateForm: Subject<OriginEmptyPickup> = new Subject<OriginEmptyPickup>();
  isEditActive = false

  displayedColumns: string[] = EmptySurveyColumns.map((col) => col.key);
  columnsSchema: any = EmptySurveyColumns;
  dataSource = new MatTableDataSource<EmptyPickup>();
  valid: any = {};

  constructor(
    public dialog: MatDialog,
    public helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.emptySurveyData

    this.isSubmittedStat.subscribe((stat)=>{
      if(stat){
        this.emptySurveyTableData.emit(this.emptySurveyData)
      }
    })

    this.emptySurveyData_UpdateForm.subscribe((bookingData)=>{

      if(bookingData) this.getTableData(bookingData.emptypickup)
    })


  }

  getTableData(emptySurveyData:EmptyPickup[]){
    this.emptySurveyData = emptySurveyData ?? []
    console.log(this.emptySurveyData)

    this.dataSource.data = this.emptySurveyData
  }

  editRow(row: EmptyCargo) {
    // if (row._id === 0) {
    //   row._id = Date.now()
    //   this.emptySurveyData.push(row)
    //   row.isEdit = false
    // } else {
    //   let index = this.emptySurveyData.findIndex(t =>t._id === row._id)
    //   this.emptySurveyData[index] = row
    //   row.isEdit = false
    //
    //
    // }
    // this.isEditActive = false
  }

  addRow() {
    // const newRow: EmptyPickup = {
    //   _id: 0,
    //   isEdit:true,
    //   SurveyDate: '',
    //   SurveyLocation: '',
    //   ContainerNumber:'',
    //   SurveyorName:'',
    //   SurveyReferenceNumber:'',
    //   isSelected:false
    // };
    // this.dataSource.data = [newRow, ...this.dataSource.data];
    // this.isEditActive = true
  }

  removeRow(id: number) {
    // this.dataSource.data = this.dataSource.data.filter(
    //   (u: EmptyCargo) => u._id !== id
    // );
    // this.emptySurveyData = this.dataSource.data
    // this.isEditActive = false
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }


}
