import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable, of, ReplaySubject, Subject, Subscription} from "rxjs";
import {BookingService} from "../../../services/stages/booking/booking.service";
import {JobCardService} from "../../../services/stages/jobCard/job-card.service";
import Booking, {
  Air,
  BookingForms, BookingFormValidationStat, Cargo,
  Destination, FreightRelated,
  FullContainerLoad,
  General, LessContainerLoad,
  Origin, PartiesInvolved, Transhipment
} from "../../../_model/Jobcard/Stages/Booking";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../services/NotificationService/notification-service.service";
import {StageMapping, StageName} from "../../../_model/templateConfig/stages";
import {ButtonControlService} from "../../../services/buttonControl/button-control.service";
import {MappingInfo} from "../../../_model/templateConfig/menuConfig";
import {HelperService} from "../../../services/helper/helper.service";
import {CarrierTariffDropDown} from "../../../_model/master/CarrierTariff";
import {pluck, tap} from "rxjs/operators";
import {TableColumn} from "../../../_model/TableColumn";
import {VendorService} from "../../../services/vendor/vendor.service";
import {CurrencycodeService} from "../../../services/currencycode/currencycode.service";




@Component({
  selector: 'app-booking-stage',
  templateUrl: './booking-stage.component.html',
  styleUrls: ['./booking-stage.component.css']
})
export class BookingStageComponent implements OnInit, OnDestroy {

  @Input() stageId
  @Input() $stageData:Observable<any>
  @Input() mapInfo: MappingInfo
  @Input() fields: string[]
  isLoaded = false
  isSubmitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isValid = {
    generalFormValid: false,
    originFormValid: true,
    destinationFormValid: true,
    FCLFormValid: true
  };

  mapId: number
  jobId: string
  isUpdate = false
  currentStageData: StageMapping

  $subscription: Subscription
  @Input() $dropdowns: ReplaySubject<any> = new ReplaySubject<any>();

  //dropdowns
  bookingNumberSeriesList

  //Form Data's
  bookingFormData: Booking;
  bookingFormUpdateData: Subject<Booking> = new Subject<Booking>();
  submitted = false
  fullContainerLoad= new BehaviorSubject<FullContainerLoad[]>([])
  lessContainerLoadData= new BehaviorSubject<LessContainerLoad[]>([])
  cargoData= new BehaviorSubject<Cargo[]>([])
  airData= new BehaviorSubject<Air[]>([])
  partiesInvolvedData= new BehaviorSubject<PartiesInvolved[]>([])


  //Formgroups
  generalFormGroup: FormGroup
  freightRelatedFormGroup: FormGroup
  onCarriageRelatedFormGroup: FormGroup
  preCarriageRelatedFormGroup: FormGroup

  //newRows
  fullContainerLoadNewRows:FullContainerLoad = {
    _id: 0,
    NumberOfContainer:'',
    CarrierBookingNo:'',
    ContainerType:'',
    Voyage:'',
    CarrierName:'',
    Vessel:'',
    isEdit: true,
    isSelected: false
  }
  lessContainerLoadNewRows:LessContainerLoad = {
    _id: 0,
    isEdit:true,
    isSelected:false,
    ConsolBookingNo:'',
    VesselName:'',
    PackageDimension:'',
    PackageType:'',
    PackageGrossWeight:'',
    PackageVolume:'',
    ConsolAgentName:'',
    ConsolHandoverLocation:'',
    VesselVoyage:''
  }
  cargoNewRows:Cargo = {
    HsCode:'',
    isEdit:true,
    CargoRemarks:'',
    CargoType:'',
    CargoName:'',
    GrossWt:'',
    _id:0,
    isSelected:false
  }
  airNewRows:Air = {
    _id:0,
    isSelected:false,
    isEdit:true,
    CarrierBookingNo:'',
    CargoHandoverLocation:'',
    CarrierName:'',
    FlightNo:'',
    IATAAgentName:'',
    PackageDimension:'',
    PackageGrossWeight:'',
    PackageType:'',
    PackageVolume:''
  }

  partiesInvolvedNewRows:PartiesInvolved={
    _id:0,
    isSelected:false,
    isEdit:true,
    Name:'',
    Country:'',
    State:'',
    City:'',
    PartyType:'',
    Purpose:''
  }

  //Columns
  fullContainerLoadColumns:TableColumn<FullContainerLoad>[]=[
    {
      key: 'NumberOfContainer',
      type: 'number',
      label: 'No. Of CNTR.',
    },
    {
      key: 'ContainerType',
      type: 'dropdown',
      label: 'ContainerType',
      dropdownkey:'containermaster'
    },
    {
      key: 'CarrierName',
      type: 'dropdown',
      label: 'CarrierName',
      dropdownkey:'carriername'
    },
    {
      key: 'CarrierBookingNo',
      type: 'text',
      label: 'CarrierBookingNo'
    },
    {
      key: 'CarrierBookingValidity',
      type: 'date',
      label: 'CarrierBookingValidity'
    },
    {
      key: 'Vessel',
      type: 'dropdown',
      label: 'Vessel',
      dropdownkey:'vesselmaster'
    },

    {
      key: 'Voyage',
      type: 'text',
      label: 'Voyage',
    },

    {
      key: 'isEdit',
      type: 'isEdit',
      label: 'Action',
    },
  ]
  lessContainerLoadColumns:TableColumn<LessContainerLoad>[]=[
    {
      key: 'PackageType',
      type: 'text',
      label: 'PackageType'
    },
    {
      key: 'PackageDimension',
      type: 'text',
      label: 'PackageDimension',
    },
    {
      key: 'PackageGrossWeight',
      type: 'text',
      label: 'PackageGrossWeight',
    },
    {
      key: 'PackageVolume',
      type: 'text',
      label: 'PackageVolume',
    },
    {
      key: 'ConsolAgentName',
      type: 'dropdown',
      label: 'ConsolAgentName',
      dropdownkey:'consolagentname'
    },
    {
      key: 'ConsolHandoverLocation',
      type: 'dropdown',
      label: 'ConsolHandoverLocation',
      dropdownkey:'city'
    },
    {
      key: 'ConsolBookingNo',
      type: 'text',
      label: 'ConsolBookingNo',
    },
    {
      key: 'VesselName',
      type: 'dropdown',
      label: 'VesselName',
      dropdownkey:'vesselmaster'
    },
    {
      key: 'VesselVoyage',
      type: 'text',
      label: 'VesselVoyage',
    },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: 'Action',
    }
  ]
  cargoColumns:TableColumn<Cargo>[] = [
    {
      key: 'CargoType',
      type: 'dropdown',
      label: 'CargoType',
      dropdownkey:'cargomastertype'
    },
    {
      key: 'CargoName',
      type: 'dependentdropdown',
      label: 'CargoName',
      dropdownkey:'itemmaster',
      referenceCol1:'CargoType'
    },
    {
      key: 'HsCode',
      type: 'dependentdropdown',
      label: 'HsCode',
      dropdownkey:'itemmasterhscode',
      referenceCol1:'CargoName'
    },
    {
      key: 'GrossWt',
      type: 'number',
      label: 'GrossWt(Kgs)'
    },
    {
      key: 'CargoRemarks',
      type: 'text',
      label: 'CargoRemarks'
    },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: 'Action',
    }
  ]
  airColumns:TableColumn<Air>[] = [
    {
      key: 'PackageType',
      type: 'text',
      label: 'PackageType'
    },
    {
      key: 'PackageDimension',
      type: 'text',
      label: 'PackageDimension'
    },
    {
      key: 'PackageGrossWeight',
      type: 'text',
      label: 'PackageGrossWeight'
    },
    {
      key: 'PackageVolume',
      type: 'text',
      label: 'PackageVolume'
    },
    {
      key: 'IATAAgentName',
      type: 'dropdown',
      label: 'IATAAgentName',
      dropdownkey:'iataagentname'
    },
    {
      key: 'CargoHandoverLocation',
      type: 'dropdown',
      label: 'CargoHandoverLocation',
      dropdownkey:'city'
    },
    {
      key: 'CarrierName',
      type: 'text',
      label: 'CarrierName'
    },
    {
      key: 'CarrierBookingNo',
      type: 'text',
      label: 'CarrierBookingNo'
    },
    {
      key: 'FlightNo',
      type: 'text',
      label: 'FlightNo'
    },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: 'Action',
    }
  ]
  partiesInvolvedColumns:TableColumn<PartiesInvolved>[] = [
    {
      key: 'PartyType',
      type: 'dropdown',
      label: 'PartyType',
      dropdownkey:'partytype'
    },
    {
      key: 'Purpose',
      type: 'firstleveldependentdropdown',
      label: 'Purpose',
      referenceCol1:'PartyType',
      displayOptionBasedOnCol1:[
        {
          referenceCol1ValueEqualTo:'customer',
          optionListPropertyName:'customermastertype'
        },
        {
          referenceCol1ValueEqualTo:'vendor',
          optionListPropertyName:'vendormastertype'
        }
      ]
    },
    {
      key: 'Name',
      type: 'secondleveldependentdropdown',
      label: 'Name',
      referenceCol1:'PartyType',
      displayOptionBasedOnCol2:[
        {
          referenceCol1ValueEqualTo:'customer',
          optionListPropertyName:'customer',
          referenceCol2Name:'Purpose'
        },
        {
          referenceCol1ValueEqualTo:'vendor',
          optionListPropertyName:'vendor',
          referenceCol2Name:'Purpose'
        }
      ]
    },
    {
      key: 'Country',
      type: 'dropdown',
      label: 'Country',
      dropdownkey:'country'
    },
    {
      key: 'State',
      type: 'dependentdropdown',
      label: 'State',
      dropdownkey:'state',
      referenceCol1:'Country'
    },
    {
      key: 'City',
      type: 'dependentdropdown',
      label: 'City',
      dropdownkey:'city',
      referenceCol1:'State'
    },

    {
      key: 'isEdit',
      type: 'isEdit',
      label: 'Action',
    }
  ]


  constructor(
    private bookingService: BookingService,
    private jobCardService: JobCardService,
    private _formBuilder: FormBuilder,
    public helperService: HelperService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private buttonControlService: ButtonControlService,
    public vendorService:VendorService,
    public currencycodeService:CurrencycodeService
  ) {
  }

  ngOnInit(): void {
    console.table(this.fields)


    this.route.params.subscribe((params) => {

      //Form Controls
      this.generalFormGroup = this._formBuilder.group({
        BookingNo: ['', Validators.required],
        OrderType: [''],
        JobOrderNo: [''],
        ShipmentRemarks: [''],
        BookingPartyCode: [''],
        BookingParty: [''],
        Carrier: [''],
        CarrierCode: [''],
        DocumentDate: [this.helperService.getCurrentDate()],
        OrderDate: [this.helperService.getCurrentDate()],
        PostingDate: [this.helperService.getCurrentDate()],
        BookingStatus: ['']
      });

      //Form Controls
      this.freightRelatedFormGroup = this._formBuilder.group({
        PlaceOfReceipt: [''],
        OriginInlandHaulage: [''],
        LoadingPortTerminal: [''],
        DischargePortTerminal: [''],
        DestinationInlandHaulage: [''],
        PlaceOfReceiptCode: [''],
        PortOfDischargeCode: [''],
        FinalDestination: [''],
        FinalPlaceOfDeliveryCode: [''],
        PlaceOfDelivery: [''],
        FreightTerms: [''],
        BuyFreightRate: [''],
        BuyFreightCurrency: [''],
        SellFreightRate: [''],
        SellFreightCurrency: ['']
      });

      this.onCarriageRelatedFormGroup = this._formBuilder.group({
        BondedWarehouse: [''],
        CargoHandoverLocation: [''],
        CargoPickupLocation: [''],
        EmptyReturnLocation: [''],
        ExportCustomsClearance: ['']
      })

      this.preCarriageRelatedFormGroup = this._formBuilder.group({
        BondedWarehouse: [''],
        CargoHandoverLocation: [''],
        CargoPickupLocation: [''],
        EmptyPickupLocation: [''],
        ExportCustomsClearance: ['']
      })
      this.bookingFormData = {}

      if (Object.keys(params).length > 0) {

        if (params.mapid) {
          this.mapId = params.mapid
        }

        if (params.jobid) {
          this.jobId = params.jobid
          this.isUpdate = true
          this.getBookingFormData()
        }

        //Getting mapping info from create job card component
        this.buttonControlService.sendMappingConfig.subscribe((mapInfo) => {
          if (mapInfo) {
            this.bookingFormData.mapping = mapInfo
            this.currentStageData = mapInfo.stages.filter(st => st.stageid == this.stageId)[0]
          }
        })

        this.buttonControlService.goNext.subscribe((stat) => {
          if (stat) this.getBookingFormData()
        })


      }
    })

  }

  get f() {
    return this.generalFormGroup.controls;
  }


  ngOnChanges() {
  }

  getBookingGeneratedId(id) {
    this.generalFormGroup.patchValue({
      BookingNo: id
    })
  }

  getJobOrderGeneratedId(id) {
    this.generalFormGroup.patchValue({
      JobOrderNo: id
    })
  }

  getDropdowns(key) {
    return this.$dropdowns.pipe(pluck(key))
  }


  onSubmit() {

    this.submitted = true
    if (this.generalFormGroup.invalid || this.preCarriageRelatedFormGroup.invalid || this.freightRelatedFormGroup.invalid
      || this.onCarriageRelatedFormGroup.invalid) {
      return
    }

    let formData: Booking = {
      general: this.generalFormGroup.value,
      mapping: this.bookingFormData.mapping,
      precarriagerelated: this.preCarriageRelatedFormGroup.value,
      oncarriagerelated: this.onCarriageRelatedFormGroup.value,
      freightRelated: this.freightRelatedFormGroup.value,
      fullContainerLoad:this.bookingFormData.fullContainerLoad,
      lessContainerLoad:this.bookingFormData.lessContainerLoad,
      cargo:this.bookingFormData.cargo,
      air:this.bookingFormData.air,
      partiesinvolved:this.bookingFormData.partiesinvolved
    }

    if (this.isUpdate) {
      this.bookingService.updateBooking(this.jobId, formData).subscribe((bookingFormData) => {
        this.notificationService.showSuccess("Booking Details updated successfully!!!", "Success")
        this.buttonControlService.goNext.next(true)
      }, (err) => {
        this.notificationService.showError(err, 'Failed')
      })
    } else {
      this.bookingService.addBooking(this.mapId, formData).subscribe((bookingFormData) => {
        this.notificationService.showSuccess("Booking Details added successfully!!!", "Success")
        this.router.navigate([`/jobcard/update/${this.mapId}/${bookingFormData.jobId}`])
      }, (err) => {
        this.notificationService.showError(err, 'Failed')
      })
    }


  }

  getGeneralFormData(generalFormData: General) {
    this.bookingFormData.general = generalFormData
  }

  getOriginFormData(originFormData: Origin) {
    this.bookingFormData.origin = originFormData
  }

  getDestinationFormData(destinationFormData: Destination) {
    this.bookingFormData.destination = destinationFormData
  }

  getFreightRelatedFormData(FreightRelatedFormData: FreightRelated) {
    this.bookingFormData.freightRelated = FreightRelatedFormData
  }

  getFCLFormData(FCLFormData: FullContainerLoad[]) {
   this.bookingFormData.fullContainerLoad = FCLFormData
  }

  getAirFormData(AirFormData: Air[] | any) {
    this.bookingFormData.air = AirFormData
  }

  getLCLTableData(LCLTableData: LessContainerLoad[] | any) {
    this.bookingFormData.lessContainerLoad = LCLTableData
  }

  getCargoTableData(cargoTableData: Cargo[] | any) {
    this.bookingFormData.cargo = cargoTableData
  }

  getPartiesInvolvedTableData(partiesInvolvedTableData: PartiesInvolved[] | any) {
    this.bookingFormData.partiesinvolved = partiesInvolvedTableData
  }

  getTranshipmentTableData(transhipmentTableData: Transhipment[]) {
    this.bookingFormData.transhipment = transhipmentTableData
  }

  setValid(validationData: BookingFormValidationStat) {
    switch (validationData.formName) {
      case BookingForms.general:
        this.isValid.generalFormValid = validationData.isValid
    }
  }

  isFormValid() {

    if (Object.values(this.isValid).includes(false)) {
      return false
    }
    return true;
  }

  addBookingformData(mapId, bookingFormData: Booking) {
    this.bookingService.addBooking(this.mapId, bookingFormData).subscribe((bookingFormData) => {
      this.notificationService.showSuccess("Booking Details added successfully!!!", "Success")
      this.router.navigate([`/jobcard/update/${this.mapId}/${bookingFormData.jobId}`])
    }, (err) => {
      this.notificationService.showError(err, 'Failed')
    })
  }

  updateBookingformData(bookingFormData: Booking) {
    this.bookingService.updateBooking(this.jobId, bookingFormData).subscribe((bookingFormData) => {
      this.notificationService.showSuccess("Booking Details updated successfully!!!", "Success")
      this.buttonControlService.goNext.next(true)
    }, (err) => {
      this.notificationService.showError(err, 'Failed')
    })
  }

  getBookingFormData() {
    this.$stageData.subscribe((bookingData) => {
      this.bookingFormData = bookingData
      this.generalFormGroup.patchValue(bookingData.general)
      this.onCarriageRelatedFormGroup.patchValue(bookingData.oncarriagerelated)
      this.preCarriageRelatedFormGroup.patchValue(bookingData.precarriagerelated)
      this.freightRelatedFormGroup.patchValue(bookingData.freightRelated)
      this.bookingFormUpdateData.next(bookingData)

      this.fullContainerLoad.next(this.bookingFormData.fullContainerLoad)
      this.lessContainerLoadData.next(this.bookingFormData.lessContainerLoad)
      this.cargoData.next(this.bookingFormData.cargo)
      this.airData.next(this.bookingFormData.air)
      this.partiesInvolvedData.next(this.bookingFormData.partiesinvolved)

      this.isLoaded = true
    })
  }


  setFormField(key: any, value: any, formGroup: FormGroup) {
    formGroup.get(key).setValue(value)
  }

  sendDropdownOption(key: any, formGroup: FormGroup) {
    return of(formGroup.get(key).value)
  }

  ngOnDestroy(): void {
    this.bookingFormData = undefined
  }


}
