import {dropdown} from "./Dropdowns";

export interface CurrencyCode {
  id?: number;
  code: string;
  description?: string;
  companyid?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;

}


export interface MasterType {
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

export interface MasterCode {
  id?: number;
  code: string;
  description?: string;
  companyid?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ItemMaster {
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

export interface Vessel {
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

export interface Location {
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

export interface Container {
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

export interface ContainerSpec {
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


export interface UnitOfMeasure {
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


export interface SalesPersonCode {
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

