import { Observable } from 'rxjs';
import { allowedDropdowns, dropdown, MasterTypeDropDown } from './Dropdowns';
import { CommonDisplay } from './commondisplay';
import { Vendor } from './Vendor';
import { CarrierTariff, CarrierTariffDropDown } from './master/CarrierTariff';
import { EventReport } from './eventanalytics';
import { ILocation } from './location';

export interface TableColumn<T> {
  key: keyof T;
  type: TableColumnType;
  label: string;
  capitalize?: boolean;
  max?: number;
  responsekey?: string;
  min?: number;
  options?: Observable<allowedDropdowns[]>;
  dropdownkey?: string;
  required?: boolean;
  pattern?: string;
  disableIfColumn?: string;
  equalto?: string;
  referenceCol1?: string;
  displayOptionBasedOnCol1?: FirstLevelOptionFetch[];
  displayOptionBasedOnCol2?: SecondLevelOptionFetch[];
  isEdit?: boolean;
  disabled?: boolean;
}

export interface EditableTable {
  _id?: number | string;
  isEdit?: boolean;
  isSelected?: boolean;
}

export type TableColumnType = 'text' | 'isEdit' | 'date' | 'boolean';

export enum TableName {
  CURRENCY_CODE = 'currencycode',
  MASTER_TYPE = 'mastertype',
  MASTER_CODE = 'mastercode',
  VESSEL = 'vessel',
  LOCATION = 'location',
  UNITOFMEASURE = 'unitofmeasure',
  ITEMMASTER = 'itemmaster',
}

export type allowedServices = EventReport;

export type allowedListTable =
  | CommonDisplay
  | Vendor
  | CarrierTariff
  | CommonDisplay;

export type allowedSearchFieldDropdown = CarrierTariffDropDown;

export type allowedTableDropdown = CarrierTariffDropDown;

export interface FirstLevelOptionFetch {
  referenceCol1ValueEqualTo?: string;
  optionListPropertyName?: string; // Property Name in which options must be fetched from API
}

export interface SecondLevelOptionFetch extends FirstLevelOptionFetch {
  referenceCol2Name?: string;
}
