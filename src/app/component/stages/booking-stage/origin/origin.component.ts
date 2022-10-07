import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Subject} from "rxjs";
import Booking, {Origin} from "../../../../_model/Jobcard/Stages/Booking";

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent implements OnInit {
  submitted = false;
  originFormGroup: FormGroup;
  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() isUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() originData_UpdateForm: Subject<Booking> = new Subject<Booking>();
  @Output() originFormData = new EventEmitter<Origin>();
  @Output() isOriginFormValid = new EventEmitter<boolean>();


  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.originFormGroup = this._formBuilder.group({
      ShipperCode: [''],
      ShipperName: [''],
      TransporterCode: [''],
      TransporterName: [''],
      CustomsAgentCode: [''],
      CustomerAgentName: [''],
      CustomerAgentCode: [''],
      CustomsAgentName: [''],
      VendorAgentName: [''],
      VendorAgentCode: [''],
    });

    this.originData_UpdateForm.subscribe((data)=>{
      let originData = data.origin
      this.setOriginFormData(originData);
    })
  }

  ngAfterViewInit(): void {
    this.isSubmittedStat.subscribe((stat) => {
      if (stat) this.onSubmit();
    })
  }

  setOriginFormData(originData_UpdateForm:Origin){
    if(!originData_UpdateForm) return;

    this.originFormGroup.patchValue({
      ShipperCode: originData_UpdateForm.ShipperCode,
      ShipperName: originData_UpdateForm.ShipperName,
      TransporterCode: originData_UpdateForm.TransporterCode,
      TransporterName: originData_UpdateForm.TransporterName,
      CustomsAgentCode: originData_UpdateForm.CustomsAgentCode,
      CustomerAgentName: originData_UpdateForm.CustomerAgentName,
      CustomerAgentCode: originData_UpdateForm.CustomerAgentCode,
      CustomsAgentName: originData_UpdateForm.CustomsAgentName,
      VendorAgentName: originData_UpdateForm.VendorAgentName,
      VendorAgentCode: originData_UpdateForm.VendorAgentCode,
    })
  }

  get f() {
    return this.originFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true

    if (this.originFormGroup.invalid) {
      this.isOriginFormValid.emit(false)
      return;
    }

    let result: Origin = {
      ShipperCode: this.originFormGroup.get('ShipperCode').value,
      ShipperName: this.originFormGroup.get('ShipperName').value,
      TransporterCode: this.originFormGroup.get('TransporterCode').value,
      TransporterName: this.originFormGroup.get('TransporterName').value,
      CustomsAgentCode: this.originFormGroup.get('CustomsAgentCode').value,
      CustomerAgentName: this.originFormGroup.get('CustomerAgentName').value,
      CustomerAgentCode: this.originFormGroup.get('CustomerAgentCode').value,
      CustomsAgentName: this.originFormGroup.get('CustomsAgentName').value,
      VendorAgentName: this.originFormGroup.get('VendorAgentName').value,
      VendorAgentCode: this.originFormGroup.get('VendorAgentCode').value
    }
    this.isSubmittedStat.next(false)
    this.originFormData.emit(result)
    this.isOriginFormValid.emit(true)

  }

}
