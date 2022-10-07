import {dropdown} from "./Dropdowns";

export interface CurrencyCode extends EditableTable {
  id?: number;
  code: string;
  description?: string;
  companyid?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;

}


export interface MasterType extends EditableTable {
  id?: number;
  code: string;
  type: string;
  description?: string;
  companyid?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;

}

export interface MasterCode extends EditableTable {
  id?: number;
  code: string;
  description?: string;
  companyid?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ItemMaster extends EditableTable {
  id?: number;
  code: string;
  name?: string;
  itemtype:string
  hscode:string
  active:boolean
  companyid?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Vessel extends EditableTable {
  id?: number;
  vesselname: string;
  flag?: string;
  yearbuilt?: string;
  active?: boolean;
  companyid?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Location extends EditableTable {
  id?: number;
  type: string;
  code: string;
  country: string;
  state?: string;
  city?: string;
  pincode?: string;
  gststatecode?: string;
  active?: boolean;
  companyid?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Container extends EditableTable {
  id?: number;
  code: string;
  isactive: boolean;
  hasspec?: boolean;
  description?: string;
  companyid?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;

}

export interface ContainerSpec extends EditableTable {
  id?: number;
  containercode: number | string;
  code: string;
  isactive: boolean;
  description?: string;
  companyid?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;

}


export interface UnitOfMeasure extends EditableTable {
  id?: number
  type: string
  code: string
  description: string
  startday: number
  endday: number
  active: boolean
  companyid: number
  createdBy?: number
  updatedBy?: number
  createdAt?: string,
  updatedAt?: string,
  workingday?: string[]
}

export interface WorkingDay {
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
  uomid: number
}


export interface SalesPersonCode extends EditableTable{
  code: string
  salespersonname: string
  commision: number
  companyname: string
  type: string
  active: boolean
  createdBy?: number
  updatedBy?: number
  companyid?: number
  createdAt?: string
  updatedAt?: string
  id?: number
}

export interface ContainerSpecDropdown {
  containercode: dropdown[]
}

export interface EditableTable {
  _id?: number | string;
  isEdit?: boolean;
  isSelected?: boolean
}
