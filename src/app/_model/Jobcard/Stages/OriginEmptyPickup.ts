import {BookingForms} from "./Booking";
import {TableColumn} from "../../TableColumn";
import {EditableTable} from "../../CurrencyCode";

export default interface OriginEmptyPickup {
  _id?: string;
  jobId?: string;
  companyId?: number;
  emptycargo: EmptyCargo[];
  emptypickup: EmptyPickup[];
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmptyCargo extends EditableTable{
  SurveyorName: string
  SurveyLocation: string
  SurveyDate: string
  ContainerNumber: string
  ContainerType:string
  EmptyYard:string
  SurveyReferenceNumber: string
  Remarks:string
}

export interface EmptyPickup extends EditableTable{
  ScopeType: string
  Transporter: string
  TruckNumber: string
  EmptyPickupPoint: string
  EmptyDropPoint: string
  CNTRNO: string
  EmptyPickupDate: string
  EmptyOutDate: string
  ContainerType:string
  Remarks:string
}

export interface emptyPickupFormValidationStat{
  formName:emptyPickupForms;
  isValid: boolean
}

export enum emptyPickupForms {
  EMPTYSURVEY = "EmptySurvey",
  EMPTYCARGO = "EmptyCargo"
}
