import {Component,EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ButtonControlService} from "../../../../services/buttonControl/button-control.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../../services/user/user.service";
import {ConfirmDialogComponent} from "../../../confirm-dialog/confirm-dialog.component";
import Booking, {LessContainerLoad} from "../../../../_model/Jobcard/Stages/Booking";
import {BehaviorSubject, Subject} from "rxjs";


export const UserColumns = [
  // {
  //   key: 'isSelected',
  //   type: 'isSelected',
  //   label: '',
  // },
  {
    key: 'Dimension',
    type: 'text',
    label: 'Dimension',
  },
  // {
  //   key: 'email',
  //   type: 'email',
  //   label: 'Email',
  //   required: true,
  //   pattern: '.+@.+',
  // },
  // {
  //   key: 'birthDate',
  //   type: 'date',
  //   label: 'Date of Birth',
  // },
  {
    key: 'VesselName',
    type: 'text',
    label: 'Vessel Name',
  },
  {
    key: 'VesselCode',
    type: 'text',
    label: 'Vessel Code',
  },
  {
    key: 'CarrierAgentBookingValidity',
    type: 'text',
    label: 'Carrier Agent Booking Validity',
  },
  {
    key: 'TransitCount',
    type: 'text',
    label: 'Transit Count',
  },
  {
    key: 'PackageCount',
    type: 'text',
    label: 'Package Count',
  },
  {
    key: 'EachPackageGrossWeight',
    type: 'text',
    label: 'Each Package GrossWeight',
  },
  {
    key: 'EachPackageDimension',
    type: 'text',
    label: 'Each Package Dimension'
  },
  {
    key: 'CargoVolume',
    type: 'text',
    label: 'Cargo Volume',
  },
  {
    key: 'ChargeableWeight',
    type: 'text',
    label: 'Chargeable Weight',
  },
  {
    key: 'CarrierAgentBookingNo',
    type: 'text',
    label: 'Carrier Agent BookingNo',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];



@Component({
  selector: 'app-less-container-related',
  templateUrl: './less-container-related.component.html',
  styleUrls: ['./less-container-related.component.css']
})
export class LessContainerRelatedComponent implements OnInit {

  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  @Input() LCLData: LessContainerLoad[] = []
  @Output() LCLTableData = new EventEmitter<LessContainerLoad[]>();
  @Input() LCLData_UpdateForm: Subject<Booking> = new Subject<Booking>();
  isEditActive = false

  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<LessContainerLoad>();
  valid: any = {};

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    // this.userService.getUsers().subscribe((res: any) => {
    //   this.dataSource.data = res;
    // });
    this.dataSource.data = this.LCLData

    this.isSubmittedStat.subscribe((stat)=>{
      if(stat){
        this.LCLTableData.emit(this.LCLData)
      }
    })

    this.LCLData_UpdateForm.subscribe((bookingData)=>{

      if(bookingData) this.getTableData(bookingData.lessContainerLoad)
    })
  }

  getTableData(lclData:LessContainerLoad[]){
    this.LCLData = lclData
    this.dataSource.data = this.LCLData
   }

  editRow(row: LessContainerLoad) {
    if (row._id === 0) {
      row._id = Date.now()
      this.LCLData.push(row)
      row.isEdit = false
    } else {
      let index = this.LCLData.findIndex( t =>t._id === row._id)
      this.LCLData[index] = row
      row.isEdit = false
    }
    this.isEditActive = false
  }

  addRow() {
    console.log('addrow')
    // const newRow: LessContainerLoad = {
    //   _id: 0,
    //   Dimension: '',
    //   VesselName: '',
    //   VesselCode: '',
    //   CarrierAgentBookingValidity: '',
    //   TransitCount: '',
    //   PackageCount:'',
    //   EachPackageGrossWeight:'',
    //   EachPackageDimension:'',
    //   CargoVolume:'',
    //   ChargeableWeight:'',
    //   CarrierAgentBookingNo:'',
    //   isEdit: true,
    //   isSelected:false
    // };
    // this.dataSource.data = [newRow, ...this.dataSource.data];
    // this.isEditActive = true
  }

  removeRow(id: number) {
    this.dataSource.data = this.dataSource.data.filter(
        (u: LessContainerLoad) => u._id !== id
      );
    this.LCLData = this.dataSource.data
    this.isEditActive = false

    // this.userService.deleteUser(id).subscribe(() => {
    //   this.dataSource.data = this.dataSource.data.filter(
    //     (u: LessContainerLoad) => u.id !== id
    //   );
    // });
  }

  removeSelectedRows() {
    // const users = this.dataSource.data.filter((u: User) => u.isSelected);
    // this.dialog
    //   .open(ConfirmDialogComponent)
    //   .afterClosed()
    //   .subscribe((confirm) => {
    //     if (confirm) {
    //       this.userService.deleteUsers(users).subscribe(() => {
    //         this.dataSource.data = this.dataSource.data.filter(
    //           (u: User) => !u.isSelected
    //         );
    //       });
    //     }
    //   });
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    // if (this.valid[id]) {
    //   return Object.values(this.valid[id]).some((item) => item === false);
    // }
    //return false;
  }

}
