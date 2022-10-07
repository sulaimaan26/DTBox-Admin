import {Observable} from "rxjs";
import {Container, ContainerSpecDropdown, CurrencyCode, MasterType} from "./CurrencyCode";
import {allowedDropdowns, dropdown, MasterTypeDropDown} from "./Dropdowns";
import {CommonDisplay, Commondisplay} from "./commondisplay";
import {Vendor} from "./Vendor";
import {CarrierTariff, CarrierTariffDropDown} from "./master/CarrierTariff";

export  interface TableColumn<T>{
  key: string
  type: string
  label: string
  capitalize?:boolean
  max?: number
  responsekey?:string
  min?: number
  options?: Observable<allowedDropdowns[]>
  dropdownkey?:string
  required?:boolean
  pattern?:string
  disableIfColumn?:string
  equalto?:string
  referenceCol1?:string
  displayOptionBasedOnCol1?:FirstLevelOptionFetch[]
  displayOptionBasedOnCol2?:SecondLevelOptionFetch[]
}


export enum TableName {
  CURRENCY_CODE = 'currencycode',
  MASTER_TYPE = 'mastertype',
  MASTER_CODE = 'mastercode',
  VESSEL = 'vessel',
  LOCATION = 'location',
  UNITOFMEASURE = 'unitofmeasure',
  ITEMMASTER = 'itemmaster'
}


type TableDropdowns = ContainerSpecDropdown

export type allowedServices = CurrencyCode | MasterType | Container

export type allowedListTable = Commondisplay | Vendor | CarrierTariff | CommonDisplay

export type allowedSearchFieldDropdown =  CarrierTariffDropDown

export type allowedTableDropdown =  CarrierTariffDropDown

export interface FirstLevelOptionFetch {
  referenceCol1ValueEqualTo?:string
  optionListPropertyName?:string // Property Name in which options must be fetched from API
}

export interface SecondLevelOptionFetch extends FirstLevelOptionFetch{
  referenceCol2Name?:string
}




