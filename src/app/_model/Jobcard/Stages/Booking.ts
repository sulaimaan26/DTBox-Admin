import "reflect-metadata";
import {numberSeries} from "../../numberseries";
import {MappingInfo} from "../../templateConfig/menuConfig";
import {EditableTable} from "../../CurrencyCode";

export default interface Booking {
  _id?: string;
  jobId?: string;
  companyId?: number;
  general?: General;
  partiesinvolved?:PartiesInvolved[]
  origin?: Origin;
  destination?: Destination;
  freightRelated?: FreightRelated;
  fullContainerLoad?: FullContainerLoad[];
  lessContainerLoad?: LessContainerLoad[];
  transhipment?: Transhipment[];
  precarriagerelated?:PreCarriageRelated
  oncarriagerelated?:OnCarriageRelated
  cargo?:Cargo[]
  air?: Air[];
  mapping?: MappingInfo; // Only making request not in response
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface General {
  OrderType?: string
  BookingNo: string
  JobOrderNo?: string
  //JobReferenceNo?: string
  ShipmentRemarks?: string
  //BookingPartyCode?: string
  //BookingParty?: string
  //CarrierCode?: string
  //Carrier?: string
  DocumentDate?: string
  OrderDate?: string
  PostingDate?: string
  BookingStatus?: string
  _id?:string
}

export interface Origin {
  CustomerAgentName?: string;
  CustomerAgentCode?: string;
  CustomsAgentCode?: string;
  TransporterCode?: string;
  TransporterName?: string;
  VendorAgentName?: string;
  CustomsAgentName?: string;
  ShipperCode?: string;
  ShipperName?: string;
  VendorAgentCode?: string;
  _id?: string;
}

export interface Destination {
  CustomerAgentName?: string;
  CustomsAgentCode?: string;
  CustomerAgentCode?: string;
  CustomsAgentName?: string;
  VendorAgentName?: string;
  TransporterCode?: string;
  VendorAgentCode?: string;
  ImporterCode?: string;
  ImporterName?: string;
  TransporterName?: string;
  _id?: string;
}

export interface FreightRelated {
  SellFreightRate?: string;
  PortOfLoading?: string;
  PortOfDischargeCode?: string;
  PortOfDischarge?: string;
  PlaceOfReceiptCode?: string;
  FreightTerms?: string;
  PlaceOfReceipt?: string;
  OriginInlandHaulage?: string;
  FinalPlaceOfDeliveryCode?: string;
  FinalPlaceOfDelivery?: string;
  DestinationInlandHaulage?: string;
  CargoType?: string;
  BuyFreightRate?: string;
  BookingStatus?: string;
  CargoName?: string;
  _id?: string;
}

export interface FullContainerLoad extends EditableTable{
  NumberOfContainer?: string;
  Voyage?: string;
  ContainerType?: string;
  CarrierName?: string;
  Vessel?: string;
  CarrierBookingNo?: string;
}

export interface Air extends EditableTable{
  PackageType?: string;
  PackageDimension?: string;
  PackageGrossWeight?: string;
  PackageVolume?: string;
  IATAAgentName?: string;
  CargoHandoverLocation?: string;
  CarrierName?: string;
  CarrierBookingNo?: string;
  FlightNo?: string;
}

export interface LessContainerLoad extends EditableTable{
  PackageType?: string;
  PackageDimension?: string;
  PackageGrossWeight?: string;
  PackageVolume?: string;
  ConsolAgentName?: string;
  ConsolHandoverLocation?: string;
  ConsolBookingNo?: string;
  VesselName?: string;
  VesselVoyage?: string;
  _id?: string | number;
  isSelected?: boolean;
  isEdit?: boolean
}

export interface Transhipment {
  ETA?: string;
  ETD?: string;
  POD?: string;
  POL?: string;
  DateOfStatus?: string;
  Remark?: string;
  TransitDetails?: string;
  VesselORFlight?: string;
  _id: string | number;
  isEdit: boolean;
  isSelected:boolean;
}


export enum BookingForms {
  general = "GENERAL",
  origin = "ORIGIN",
  destination = "DESTINATION",
  fcl = "FCL"
}

export interface BookingFormValidationStat{
  formName:BookingForms;
  isValid: boolean
}

export interface BookingDropdown{
  numberseries:numberSeriesDropdown
}

export interface numberSeriesDropdown{
  jobcard:numberSeries[]
  booking:numberSeries[]
}


export interface PreCarriageRelated{
  BondedWarehouse:string
  CargoHandoverLocation:string
  CargoPickupLocation:string
  EmptyPickupLocation:string
  ExportCustomsClearance:string
}

export interface OnCarriageRelated{
  BondedWarehouse:string
  CargoHandoverLocation:string
  CargoPickupLocation:string
  EmptyPickupLocation:string
  ExportCustomsClearance:string
}

export interface Cargo extends EditableTable{
  CargoName:string
  CargoType:string
  CargoRemarks:string
  GrossWt:string
  HsCode:string
}

export interface PartiesInvolved extends EditableTable{
  Purpose:string
  PartyType:string
  Country:string
  State:string
  City:string
  Name:string
}
