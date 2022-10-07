import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BehaviorSubject, Subject} from "rxjs";
import Booking, {Air, Origin} from "../../../../_model/Jobcard/Stages/Booking";

@Component({
  selector: 'app-air',
  templateUrl: './air.component.html',
  styleUrls: ['./air.component.css']
})
export class AirComponent implements OnInit {

  submitted = false;
  airFormGroup: FormGroup;
  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() isUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() airData_UpdateForm: Subject<Booking> = new Subject<Booking>();
  @Output() airFormData = new EventEmitter<Air>();
  @Output() isAirFormValid = new EventEmitter<boolean>();


  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.airFormGroup = this._formBuilder.group({
      CargoVolume: [''],
      PackageCount: [''],
      UnitForEachPackageDimension: [''],
      EachPackageDimension: [''],
      FlightCode: [''],
      FlightNo: [''],
      CarrierAgentBookingNo: [''],
      CarrierBookingValidity: [''],
      ChargeableWeight: [''],
      EachPackageGrossWeight: [''],
      TransitCount: [''],
    });

    this.airData_UpdateForm.subscribe((data)=>{
      let originData = data.air
      //this.setAirFormData(originData);
    })
  }

  ngAfterViewInit(): void {
    this.isSubmittedStat.subscribe((stat) => {
      if (stat) this.onSubmit();
    })
  }

  setAirFormData(airData_UpdateForm:Air){
    if(!airData_UpdateForm) return;

    // this.airFormGroup.patchValue({
    //   CargoVolume: airData_UpdateForm.CargoVolume,
    //   PackageCount: airData_UpdateForm.PackageCount,
    //   UnitForEachPackageDimension: airData_UpdateForm.UnitForEachPackageDimension,
    //   EachPackageDimension: airData_UpdateForm.EachPackageDimension,
    //   FlightCode: airData_UpdateForm.FlightCode,
    //   FlightNo: airData_UpdateForm.FlightNo,
    //   CarrierAgentBookingNo: airData_UpdateForm.CarrierAgentBookingNo,
    //   CarrierBookingValidity: airData_UpdateForm.CarrierBookingValidity,
    //   ChargeableWeight: airData_UpdateForm.ChargeableWeight,
    //   EachPackageGrossWeight: airData_UpdateForm.EachPackageGrossWeight,
    //   TransitCount: airData_UpdateForm.TransitCount,
    // })
  }

  get f() {
    return this.airFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true

    if (this.airFormGroup.invalid) {
      this.isAirFormValid.emit(false)
      return;
    }

    // let result: Air = {
    //   CargoVolume: this.airFormGroup.get('CargoVolume').value,
    //   PackageCount: this.airFormGroup.get('PackageCount').value,
    //   UnitForEachPackageDimension: this.airFormGroup.get('UnitForEachPackageDimension').value,
    //   EachPackageDimension: this.airFormGroup.get('EachPackageDimension').value,
    //   FlightCode: this.airFormGroup.get('FlightCode').value,
    //   FlightNo: this.airFormGroup.get('FlightNo').value,
    //   CarrierAgentBookingNo: this.airFormGroup.get('CarrierAgentBookingNo').value,
    //   CarrierBookingValidity: this.airFormGroup.get('CarrierBookingValidity').value,
    //   ChargeableWeight: this.airFormGroup.get('ChargeableWeight').value,
    //   EachPackageGrossWeight: this.airFormGroup.get('EachPackageGrossWeight').value,
    //   TransitCount: this.airFormGroup.get('TransitCount').value,
    // }
    // this.isSubmittedStat.next(false)
    // this.airFormData.emit(result)
    // this.isAirFormValid.emit(true)

  }

}
