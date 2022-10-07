import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Subject} from "rxjs";
import Booking, {
  BookingDropdown,
  BookingForms,
  BookingFormValidationStat,
  General
} from "../../../../_model/Jobcard/Stages/Booking";
import {HelperService} from "../../../../services/helper/helper.service";
import {numberSeries} from "../../../../_model/numberseries";
import {BookingService} from "../../../../services/stages/booking/booking.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../../services/NotificationService/notification-service.service";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit, AfterViewInit,OnDestroy {
  submitted = false;
  generalFormGroup: FormGroup;
  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() mapId:number
  @Input() isUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() generalData_UpdateForm:Subject<Booking> = new Subject<Booking>();
  @Output() generalFormData = new EventEmitter<General>();
  @Output() isGeneralFormValid = new EventEmitter<BookingFormValidationStat>();

  bookingDropdown:BookingDropdown
  jobCardNumberSeriesList:numberSeries[];
  bookingNumberSeriesList:numberSeries[];

  constructor(
    private _formBuilder: FormBuilder,
    public helperService: HelperService,
    private bookingService:BookingService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService:NotificationService
    ) {
  }

  ngOnDestroy(): void {
    this.generalFormGroup.reset()
    console.log("Form Resetted")
  }


  ngAfterViewInit(): void {
    this.isSubmittedStat.subscribe((stat) => {
      if (stat) this.onSubmit();

    })
  }

  ngOnInit(): void {
    this.getDropdown()
    this.generalFormGroup = this._formBuilder.group({
      BookingNo: ['',Validators.required],
      OrderType: [''],
      JobOrderNo: [''],
      JobReferenceNo: [''],
      ShipmentType: [''],
      BookingPartyCode: [''],
      BookingParty: [''],
      Carrier: [''],
      CarrierCode: [''],
      DocumentDate:[this.helperService.getCurrentDate()],
      OrderDate:[this.helperService.getCurrentDate()],
      PostingDate:[this.helperService.getCurrentDate()],
      BookingStatus:['']
    });

    this.generalData_UpdateForm.subscribe((data)=>{
      let generalData = data.general
      this.setGeneralFormData(generalData);
    })




  }

  get f() {
    return this.generalFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true


    if (this.generalFormGroup.invalid) {
      this.isGeneralFormValid.emit({formName:BookingForms.general,isValid:false})
      return;
    }

    if(this.generalFormGroup.get('BookingNo').value == ''){
      alert("Please generate booking no")
      this.isGeneralFormValid.emit({formName:BookingForms.general,isValid:false})
      return;
    }

    // let result: General = {
    //   BookingNo: this.generalFormGroup.get('BookingNo').value,
    //   OrderType: this.generalFormGroup.get('OrderType').value,
    //   BookingParty: this.generalFormGroup.get('BookingParty').value,
    //   Carrier: this.generalFormGroup.get('Carrier').value,
    //   BookingPartyCode: this.generalFormGroup.get('BookingPartyCode').value,
    //   JobOrderNo: this.generalFormGroup.get('JobOrderNo').value,
    //   JobReferenceNo: this.generalFormGroup.get('JobReferenceNo').value,
    //   CarrierCode: this.generalFormGroup.get('CarrierCode').value,
    //   ShipmentType: this.generalFormGroup.get('ShipmentType').value,
    //   DocumentDate: this.generalFormGroup.get('DocumentDate').value,
    //   OrderDate: this.generalFormGroup.get('OrderDate').value,
    //   PostingDate: this.generalFormGroup.get('PostingDate').value,
    //   BookingStatus: this.generalFormGroup.get('BookingStatus').value,
    // }
    //
    // this.isSubmittedStat.next(false)
    // this.generalFormData.emit(result)
    // this.isGeneralFormValid.emit({formName:BookingForms.general,isValid:true})
    // console.log(this.generalFormGroup.get('BookingNo').value)
  }

  setGeneralFormData(generalData_UpdateForm:General){
    if(!generalData_UpdateForm) return;
    // this.generalFormGroup.patchValue({
    //   BookingNo: generalData_UpdateForm.BookingNo,
    //   OrderType: generalData_UpdateForm.OrderType,
    //   BookingParty: generalData_UpdateForm.BookingParty,
    //   Carrier: generalData_UpdateForm.Carrier,
    //   BookingPartyCode: generalData_UpdateForm.BookingPartyCode,
    //   JobOrderNo: generalData_UpdateForm.JobOrderNo,
    //   JobReferenceNo: generalData_UpdateForm.JobReferenceNo,
    //   CarrierCode: generalData_UpdateForm.CarrierCode,
    //   ShipmentType: generalData_UpdateForm.ShipmentType,
    //   DocumentDate: generalData_UpdateForm.DocumentDate,
    //   OrderDate: generalData_UpdateForm.OrderDate,
    //   PostingDate: generalData_UpdateForm.PostingDate,
    //   BookingStatus: generalData_UpdateForm.BookingStatus
    // })
  }

  getDropdown(){
    this.bookingService.getDropdown(this.mapId).subscribe((response)=>{
      this.bookingNumberSeriesList = response.numberseries.booking
      this.jobCardNumberSeriesList = response.numberseries.jobcard
      if(this.jobCardNumberSeriesList.length == 0 || this.bookingNumberSeriesList.length == 0){
        this.notificationService.showWarning("Need jobcard Numberseries and relation. Redirecting to that page...","Warning")
        this.router.navigate(['/rento/setup/number-series'])
        return;
      }

    })
  }

  getBookingGeneratedId(id){
    this.generalFormGroup.patchValue({
      BookingNo:id
    })
  }

  getJobOrderGeneratedId(id){
    this.generalFormGroup.patchValue({
      JobOrderNo:id
    })
  }


}
