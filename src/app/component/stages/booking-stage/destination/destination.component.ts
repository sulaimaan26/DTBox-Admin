import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BehaviorSubject, Subject} from "rxjs";
import Booking, {Destination, Origin} from "../../../../_model/Jobcard/Stages/Booking";

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  submitted = false;
  destinationFormGroup: FormGroup;
  @Input() isSubmittedStat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() isUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  @Input() destinationData_UpdateForm: Subject<Booking> = new Subject<Booking>();
  @Output() destinationFormData = new EventEmitter<Destination>();
  @Output() isDestinationFormValid = new EventEmitter<boolean>();


  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.destinationFormGroup = this._formBuilder.group({
      ImporterCode: [''],
      ImporterName: [''],
      TransporterCode: [''],
      TransporterName: [''],
      CustomsAgentCode: [''],
      CustomerAgentName: [''],
      CustomerAgentCode: [''],
      CustomsAgentName: [''],
      VendorAgentName: [''],
      VendorAgentCode: [''],
    });

    this.destinationData_UpdateForm.subscribe((data)=>{
      let originData = data.destination
      this.setDestinationFormData(originData);
    })
  }

  ngAfterViewInit(): void {
    this.isSubmittedStat.subscribe((stat) => {
      if (stat) this.onSubmit();
    })
  }

  setDestinationFormData(originData_UpdateForm:Destination){
    if(!originData_UpdateForm) return;

    this.destinationFormGroup.patchValue({
      ImporterCode: originData_UpdateForm.ImporterCode,
      ImporterName: originData_UpdateForm.ImporterName,
      TransporterCode: originData_UpdateForm.TransporterCode,
      TransporterName: originData_UpdateForm.TransporterName,
      CustomsAgentCode: originData_UpdateForm.CustomsAgentCode,
      CustomsAgentName: originData_UpdateForm.CustomsAgentName,
      CustomerAgentName: originData_UpdateForm.CustomerAgentName,
      CustomerAgentCode: originData_UpdateForm.CustomerAgentCode,
      VendorAgentName: originData_UpdateForm.VendorAgentName,
      VendorAgentCode: originData_UpdateForm.VendorAgentCode,
    })
  }

  get f() {
    return this.destinationFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true

    if (this.destinationFormGroup.invalid) {
      this.isDestinationFormValid.emit(false)
      return;
    }

    let result: Destination = {
      ImporterCode: this.destinationFormGroup.get('ImporterCode').value,
      ImporterName: this.destinationFormGroup.get('ImporterName').value,
      TransporterCode: this.destinationFormGroup.get('TransporterCode').value,
      TransporterName: this.destinationFormGroup.get('TransporterName').value,
      CustomsAgentCode: this.destinationFormGroup.get('CustomsAgentCode').value,
      CustomerAgentName: this.destinationFormGroup.get('CustomerAgentName').value,
      CustomerAgentCode: this.destinationFormGroup.get('CustomerAgentCode').value,
      CustomsAgentName: this.destinationFormGroup.get('CustomsAgentName').value,
      VendorAgentName: this.destinationFormGroup.get('VendorAgentName').value,
      VendorAgentCode: this.destinationFormGroup.get('VendorAgentCode').value
    }
    this.isSubmittedStat.next(false)
    this.destinationFormData.emit(result)
    this.isDestinationFormValid.emit(true)

  }

}
