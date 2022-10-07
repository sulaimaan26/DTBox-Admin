import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {OriginCargoPickup, OriginCargoPickupRequest} from "../../../_model/Jobcard/Stages/OriginCargoPickup";
import {OriginCargoPickupService} from "../../../services/stages/OriginCargoPickup/origin-cargo-pickup.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../services/NotificationService/notification-service.service";
import {ButtonControlService} from "../../../services/buttonControl/button-control.service";
import {MappingInfo} from "../../../_model/templateConfig/menuConfig";
import {TableColumn} from "../../../_model/TableColumn";


@Component({
  selector: 'app-origin-cargo-pickup',
  templateUrl: './origin-cargo-pickup.component.html',
  styleUrls: ['./origin-cargo-pickup.component.css']
})
export class OriginCargoPickupComponent implements OnInit {

  @Input() $stageData: Observable<any>
  @Input() jobId: string
  @Input() mapInfo: MappingInfo
  @Input() $dropdowns: ReplaySubject<any> = new ReplaySubject<any>();
  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  @Input() fields: string[]

  OriginCargoPickupColumns: TableColumn<OriginCargoPickup>[] = [
    {
      key: 'Transporter',
      type: 'dropdown',
      label: 'Transporter',
      dropdownkey:'transport'
    },
    {
      key: 'TruckNumber',
      type: 'text',
      label: 'Truck No.'
    },
    {
      key: 'Location',
      type: 'dropdown',
      label: 'Location',
      dropdownkey:'city'
    },
    {
      key: 'LocationArrivalDate',
      type: 'date',
      label: 'Loc. Arrival Dt'
    },
    {
      key: 'LadenMovedDate',
      type: 'date',
      label: 'Laden Moved Dt'
    },
    {
      key: 'CFSWarehouseArrivedDate',
      type: 'date',
      label: 'Wh. Arrival Dt.'
    },
    {
      key: 'Quantity',
      type: 'number',
      label: 'Quantity'
    },
    {
      key: 'PackageType',
      type: 'dropdown',
      label: 'PackageType',
      dropdownkey:'packageitemmaster'
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

  OriginCargoPickupNewRows: OriginCargoPickup = {
    _id: 0,
    isEdit: true,
    isSelected: false,
    CFSWarehouseArrivedDate: '',
    TruckNumber: '',
    PackageType: '',
    LadenMovedDate: '',
    Location: '',
    LocationArrivalDate: '',
    Quantity: 0,
    Remarks: '',
    Transporter: ''
  }

  OriginCargoPickupData = new BehaviorSubject<OriginCargoPickup[]>([]);
  OriginCargoPickupFormData: OriginCargoPickup[];
  mapId: number

  constructor(
    private originCargoPickupService: OriginCargoPickupService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private buttonControlService: ButtonControlService
  ) {
  }

  ngOnInit() {


    this.$stageData.subscribe((data: OriginCargoPickupRequest) => {
      if (Object.keys(data).length > 0) {
        this.OriginCargoPickupData.next(data.originCargoPickup)
      } else {
        this.OriginCargoPickupData.next([])
      }
    })

    this.OriginCargoPickupData.subscribe((data) => {
      this.OriginCargoPickupFormData = data
    })


  }


  onSubmit() {

    let originCargoPickupRequest: OriginCargoPickupRequest = {
      originCargoPickup: this.OriginCargoPickupFormData
    }

    if (!this.jobId) {
      //Creating OriginCargoPickup
      this.originCargoPickupService.addOriginCargoPickup(this.jobId, originCargoPickupRequest).subscribe(() => {
        this.notificationService.showSuccess("Origin Pickup Data Added Successfully!!!", "Success")
        this.router.navigate([`/jobcard/update/${this.mapId}/${this.jobId}`])
      }, (err) => {
        this.notificationService.showError(err, 'Failed')
      })
    } else if (this.jobId) {
      //Updating OriginCargoPickup
      this.originCargoPickupService.updateOriginCargoPickup(this.jobId, originCargoPickupRequest).subscribe(() => {
        this.notificationService.showSuccess("Origin Pickup Data Updated Successfully!!!", "Success")
        this.buttonControlService.goNext.next(true)
      }, (err) => {
        this.notificationService.showError(err, 'Failed')
      })
    }

  }


  getOriginCargoPickupData(OriginCargoPickupData: OriginCargoPickup[] | any) {
    this.OriginCargoPickupData.next(OriginCargoPickupData)
  }

}
