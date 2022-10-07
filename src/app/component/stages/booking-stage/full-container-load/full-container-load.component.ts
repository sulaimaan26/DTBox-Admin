import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BehaviorSubject, Subject} from "rxjs";
import Booking, {FullContainerLoad, Origin} from "../../../../_model/Jobcard/Stages/Booking";

@Component({
  selector: 'app-full-container-load',
  templateUrl: './full-container-load.component.html',
  styleUrls: ['./full-container-load.component.css']
})
export class FullContainerLoadComponent implements OnInit {

  submitted = false;
  FCLFormGroup: FormGroup;
  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() isUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() FCLData_UpdateForm: Subject<Booking> = new Subject<Booking>();
  @Output() FCLFormData = new EventEmitter<Origin>();
  @Output() isFCLFormValid = new EventEmitter<boolean>();


  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.FCLFormGroup = this._formBuilder.group({
      NumberOfContainer: [''],
      TypeOfContainerCode: [''],
      TypeOfContainer: [''],
      VesselCode: [''],
      VesselName: [''],
      CarrierAgentBookingNo: [''],
      CarrierBookingValidity: [''],
      TransitCount: ['']
    });

    this.FCLData_UpdateForm.subscribe((data)=>{
      let originData = data.fullContainerLoad
      //this.setFCLFormData(originData);
    })
  }

  ngAfterViewInit(): void {
    this.isSubmittedStat.subscribe((stat) => {
      if (stat) this.onSubmit();
    })
  }

  setFCLFormData(FCLData_UpdateForm:FullContainerLoad){
    if(!FCLData_UpdateForm) return;

    // this.FCLFormGroup.patchValue({
    //   NumberOfContainer: FCLData_UpdateForm.NumberOfContainer,
    //   TypeOfContainerCode: FCLData_UpdateForm.TypeOfContainerCode,
    //   TypeOfContainer: FCLData_UpdateForm.TypeOfContainer,
    //   VesselCode: FCLData_UpdateForm.VesselCode,
    //   VesselName: FCLData_UpdateForm.VesselName,
    //   CarrierAgentBookingNo: FCLData_UpdateForm.CarrierAgentBookingNo,
    //   CarrierBookingValidity: FCLData_UpdateForm.CarrierBookingValidity,
    //   TransitCount: FCLData_UpdateForm.TransitCount
    // })
  }

  get f() {
    return this.FCLFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true

    if (this.FCLFormGroup.invalid) {
      this.isFCLFormValid.emit(false)
      return;
    }

    // let result: FullContainerLoad = {
    //   NumberOfContainer: this.FCLFormGroup.get('NumberOfContainer').value,
    //   TypeOfContainerCode: this.FCLFormGroup.get('TypeOfContainerCode').value,
    //   TypeOfContainer: this.FCLFormGroup.get('TypeOfContainer').value,
    //   VesselCode: this.FCLFormGroup.get('VesselCode').value,
    //   VesselName: this.FCLFormGroup.get('VesselName').value,
    //   CarrierAgentBookingNo: this.FCLFormGroup.get('CarrierAgentBookingNo').value,
    //   CarrierBookingValidity: this.FCLFormGroup.get('CarrierBookingValidity').value,
    //   TransitCount: this.FCLFormGroup.get('TransitCount').value
    // }
    // this.isSubmittedStat.next(false)
    // //this.FCLFormData.emit(result)
    // this.isFCLFormValid.emit(true)

  }

}
