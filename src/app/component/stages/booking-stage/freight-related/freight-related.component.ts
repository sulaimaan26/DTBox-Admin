import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BehaviorSubject, Subject} from "rxjs";
import Booking, {FreightRelated, Origin} from "../../../../_model/Jobcard/Stages/Booking";

@Component({
  selector: 'app-freight-related',
  templateUrl: './freight-related.component.html',
  styleUrls: ['./freight-related.component.css']
})
export class FreightRelatedComponent implements OnInit {

  submitted = false;
  freightRelatedFormGroup: FormGroup;
  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() isUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() freightRelatedData_UpdateForm: Subject<Booking> = new Subject<Booking>();
  @Output() freightRelatedFormData = new EventEmitter<FreightRelated>();
  @Output() isFreightRelatedFormValid = new EventEmitter<boolean>();


  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.freightRelatedFormGroup = this._formBuilder.group({
      SellFreightRate: [''],
      PortOfLoading: [''],
      PortOfDischargeCode: [''],
      PortOfDischarge: [''],
      PlaceOfReceiptCode: [''],
      FreightTerms: [''],
      PlaceOfReceipt: [''],
      OriginInlandHaulage: [''],
      FinalPlaceOfDeliveryCode: [''],
      FinalPlaceOfDelivery: [''],
      DestinationInlandHaulage: [''],
      CargoType: [''],
      BuyFreightRate: [''],
      BookingStatus: [''],
      CargoName: ['']
    });

    this.freightRelatedData_UpdateForm.subscribe((data)=>{
      let originData = data.freightRelated
      this.setFreightRelatedFormData(originData);
    })
  }

  ngAfterViewInit(): void {
    this.isSubmittedStat.subscribe((stat) => {
      if (stat) this.onSubmit();
    })
  }

  setFreightRelatedFormData(freightRelatedData_UpdateForm:FreightRelated){
    if(!freightRelatedData_UpdateForm) return;

    this.freightRelatedFormGroup.patchValue({
      SellFreightRate: freightRelatedData_UpdateForm.SellFreightRate,
      PortOfLoading: freightRelatedData_UpdateForm.PortOfLoading,
      PortOfDischargeCode: freightRelatedData_UpdateForm.PortOfDischargeCode,
      PortOfDischarge: freightRelatedData_UpdateForm.PortOfDischarge,
      PlaceOfReceiptCode: freightRelatedData_UpdateForm.PlaceOfReceiptCode,
      FreightTerms: freightRelatedData_UpdateForm.FreightTerms,
      PlaceOfReceipt: freightRelatedData_UpdateForm.PlaceOfReceipt,
      OriginInlandHaulage: freightRelatedData_UpdateForm.OriginInlandHaulage,
      FinalPlaceOfDeliveryCode: freightRelatedData_UpdateForm.FinalPlaceOfDeliveryCode,
      FinalPlaceOfDelivery: freightRelatedData_UpdateForm.FinalPlaceOfDelivery,
      DestinationInlandHaulage:freightRelatedData_UpdateForm.DestinationInlandHaulage,
      CargoType:freightRelatedData_UpdateForm.CargoType,
      BuyFreightRate:freightRelatedData_UpdateForm.BuyFreightRate,
      BookingStatus:freightRelatedData_UpdateForm.BookingStatus,
      CargoName:freightRelatedData_UpdateForm.CargoName
    })
  }

  get f() {
    return this.freightRelatedFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true

    if (this.freightRelatedFormGroup.invalid) {
      this.isFreightRelatedFormValid.emit(false)
      return;
    }

    let result: FreightRelated = {
      SellFreightRate: this.freightRelatedFormGroup.get('SellFreightRate').value,
      PortOfLoading: this.freightRelatedFormGroup.get('PortOfLoading').value,
      PortOfDischargeCode: this.freightRelatedFormGroup.get('PortOfDischargeCode').value,
      PortOfDischarge: this.freightRelatedFormGroup.get('PortOfDischarge').value,
      PlaceOfReceiptCode: this.freightRelatedFormGroup.get('PlaceOfReceiptCode').value,
      FreightTerms: this.freightRelatedFormGroup.get('FreightTerms').value,
      PlaceOfReceipt: this.freightRelatedFormGroup.get('PlaceOfReceipt').value,
      OriginInlandHaulage: this.freightRelatedFormGroup.get('OriginInlandHaulage').value,
      FinalPlaceOfDeliveryCode: this.freightRelatedFormGroup.get('FinalPlaceOfDeliveryCode').value,
      FinalPlaceOfDelivery: this.freightRelatedFormGroup.get('FinalPlaceOfDelivery').value,
      DestinationInlandHaulage: this.freightRelatedFormGroup.get('DestinationInlandHaulage').value,
      CargoType: this.freightRelatedFormGroup.get('CargoType').value,
      BuyFreightRate: this.freightRelatedFormGroup.get('BuyFreightRate').value,
      BookingStatus: this.freightRelatedFormGroup.get('BookingStatus').value,
      CargoName: this.freightRelatedFormGroup.get('CargoName').value,

    }
    this.isSubmittedStat.next(false)
    this.freightRelatedFormData.emit(result)
    this.isFreightRelatedFormValid.emit(true)

  }

}
