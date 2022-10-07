import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject, Subscription} from "rxjs";
import OriginEmptyPickup, {
  EmptyCargo,
  EmptyPickup
} from "../../../_model/Jobcard/Stages/OriginEmptyPickup";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../services/NotificationService/notification-service.service";
import {ButtonControlService} from "../../../services/buttonControl/button-control.service";
import {EmptyPickupService} from "../../../services/stages/EmptyPickup/empty-pickup.service";
import {MappingInfo} from "../../../_model/templateConfig/menuConfig";
import {OriginCargoPickup} from "../../../_model/Jobcard/Stages/OriginCargoPickup";
import {TableColumn} from "../../../_model/TableColumn";
import {MatDialog} from "@angular/material/dialog";
import {JobCardService} from "../../../services/stages/jobCard/job-card.service";
import {allowedFormTable} from "../../../_model/FormInputTable";

@Component({
  selector: 'app-origin-empty-cargo',
  templateUrl: './origin-empty-pickup.component.html',
  styleUrls: ['./origin-empty-pickup.component.css']
})
export class OriginEmptyPickupComponent implements OnInit, OnDestroy {

  @Input() $stageData: Observable<any>
  @Input() jobId: string
  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  @Input() mapInfo: MappingInfo
  @Input() $dropdowns: ReplaySubject<any> = new ReplaySubject<any>();
  @Input() fields: string[]

  EmptyPickupColumns: TableColumn<EmptyPickup>[] = [
    {
      key: 'ScopeType',
      type: 'text',
      label: 'ScopeType'
    },
    {
      key: 'Transporter',
      type: 'dropdown',
      label: 'Transporter',
      dropdownkey:'transport'
    },
    {
      key: 'TruckNumber',
      type: 'text',
      label: 'TruckNo.'
    },
    {
      key: 'EmptyPickupPoint',
      type: 'dropdown',
      label: 'EmptyPickupPoint',
      dropdownkey:'city'
    },
    {
      key: 'EmptyDropPoint',
      type: 'dropdown',
      label: 'EmptyDropPoint',
      dropdownkey:'city'
    },
    {
      key: 'EmptyPickupDate',
      type: 'date',
      label: 'EmptyPickupDate'
    },
    {
      key: 'EmptyOutDate',
      type: 'date',
      label: 'EmptyOutDate'
    },
    {
      key: 'CNTRNO',
      type: 'text',
      capitalize:true,
      label: 'CNTRNO'
    },
    {
      key: 'ContainerType',
      type: 'dropdown',
      label: 'CNTRType',
      dropdownkey:'containermaster'
    },
    {
      key: 'Remarks',
      type: 'text',
      label: 'Remarks'
    },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: 'Action',
    }
  ]
  EmptyCargoColumns: TableColumn<EmptyCargo>[] = [
    {
      key: 'SurveyorName',
      type: 'dropdown',
      label: 'SurveyorName',
      dropdownkey:'surveyor'
    },
    {
      key: 'SurveyLocation',
      type: 'dropdown',
      label: 'SurveyLocation',
      dropdownkey:'city'
    },
    {
      key: 'SurveyDate',
      type: 'date',
      label: 'SurveyDate'
    },
    {
      key: 'ContainerNumber',
      type: 'text',
      label: 'ContainerNumber'
    },
    {
      key: 'ContainerType',
      type: 'dropdown',
      label: 'ContainerType',
      dropdownkey:'containermaster'
    },
    {
      key: 'EmptyYard',
      type: 'dropdown',
      label: 'EmptyYard',
      dropdownkey:'emptyyard'
    },
    {
      key: 'SurveyReferenceNumber',
      type: 'text',
      label: 'SurveyReferenceNumber'
    },
    {
      key: 'Remarks',
      type: 'text',
      label: 'Remarks'
    },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: 'Action',
    }
  ]

  newRowsEmptyPickup: EmptyPickup = {
    _id: 0,
    isEdit: true,
    isSelected: false,
    EmptyPickupDate: '',
    EmptyPickupPoint: '',
    EmptyDropPoint: '',
    EmptyOutDate: '',
    CNTRNO: '',
    TruckNumber: '',
    ScopeType: '',
    Transporter: '',
    ContainerType: '',
    Remarks: ''
  }
  newRowsEmptyCargo: EmptyCargo = {
    _id: 0,
    isEdit: true,
    isSelected: false,
    SurveyDate: '',
    ContainerNumber: '',
    ContainerType: '',
    SurveyLocation: '',
    SurveyorName: '',
    SurveyReferenceNumber: '',
    Remarks: '',
    EmptyYard: ''
  }


  EmptyCargoData = new BehaviorSubject<EmptyCargo[]>([]);
  EmptyPickupData = new BehaviorSubject<EmptyPickup[]>([]);

  EmptyCargoFormData: EmptyCargo[];
  EmptyPickupFormData: EmptyPickup[];

  $subscriptions: Subscription

  constructor(
    public dialog: MatDialog,
    private jobCardService: JobCardService,
    private emptyPickupService: EmptyPickupService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private buttonControlService: ButtonControlService
  ) {
  }


  ngOnInit() {

    this.$subscriptions = this.$stageData.subscribe((data: OriginEmptyPickup) => {
      if (Object.keys(data).length > 0) {
        this.EmptyCargoData.next(data.emptycargo)
        this.EmptyPickupData.next(data.emptypickup)
      } else {
        this.EmptyCargoData.next([])
      }
    })

    this.$subscriptions = this.EmptyCargoData.subscribe((data) => {
      this.EmptyCargoFormData = data
    })

    this.$subscriptions = this.EmptyPickupData.subscribe((data) => {
      this.EmptyPickupFormData = data
    })

  }

  onSubmit() {

    let originEmptyPickupRequest: OriginEmptyPickup = {
      emptypickup: this.EmptyPickupFormData,
      emptycargo: this.EmptyCargoFormData
    }

    if (!this.jobId) {
      //Creating OriginEmptyPickup
      this.$subscriptions = this.emptyPickupService.addEmptyPickup(this.jobId, originEmptyPickupRequest).subscribe(() => {
        this.notificationService.showSuccess("Origin Empty Data Added Successfully!!!", "Success")
        this.router.navigate([`/jobcard/update/${this.mapInfo.id}/${this.jobId}`])
      }, (err) => {
        this.notificationService.showError(err, 'Failed')
      })
    } else if (this.jobId) {
      //Updating OriginEmptyPickup
      this.$subscriptions = this.emptyPickupService.updateEmptyPickup(this.jobId, originEmptyPickupRequest).subscribe(() => {
        this.notificationService.showSuccess("Origin Empty Data Updated Successfully!!!", "Success")
        this.buttonControlService.goNext.next(true)
      }, (err) => {
        this.notificationService.showError(err, 'Failed')
      })
    }

  }


  getEmptyCargoData(EmptyCargoData: EmptyCargo[] | any) {
    this.EmptyCargoData.next(EmptyCargoData)
  }

  getEmptyPickupData(EmptyPickupData: allowedFormTable[] | any) {
    this.EmptyPickupData.next(EmptyPickupData)
  }

  ngOnDestroy(): void {
    if (this.$subscriptions) this.$subscriptions.unsubscribe()
  }

}
