import {numberSeries} from "./numberseries";
import {dropdown} from "./Dropdowns";

export interface Commondisplay {
  id?: string;
  customerno?: string;
  customertype?: string;
  name?: string;
  name2?: string;
  address?: string;
  address2?: string;
  city?: string;
  contact?: string;
  telexno?: string;
  creditlimit?: string;
  customerpostinggroup?: string;
  currencycode?: string;
  customerpricegroup?: string;
  paymenttermscode?: string;
  finchargetermscode?: string;
  salespersoncode?: string;
  shippingmethodcode?: string;
  shippingagentcode?: string;
  invoicediscountpercentage?: string;
  countryregioncode?: string;
  blocked?: string;
  invoicecopies?: string;
  billrocustomerno?: string;
  datefilter?: string;
  balance?: string;
  lcybalance?: string;
  netchange?: string;
  lcynetchange?: string;
  lcysales?: string;
  lcyinvoicediscounts?: string;
  balancedue?: string;
  lcybalancedue?: string;
  invoiceamounts?: string;
  crmemoamounts?: string;
  lcypayments?: string;
  lcyinvoiceamount?: string;
  lcycrmemoamounts?: string;
  locationcode?: string;
  faxno?: string;
  vatgrnregistrationno?: string;
  picture?: string;
  postcode?: string;
  country?: string;
  email?: string;
  homepage?: string;
  remindertermscode?: string;
  reminderamounts?: string;
  lcyreminderamounts?: string;
  taxareacode?: string;
  vatbuspostinggroup?: string;
  prepaymentpercentage?: string;
  noofquotes?: string;
  noofinvoices?: string;
  noofreturnorders?: string;
  companyid?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}


export type getAllCustomerApiResponse = {
  result: Commondisplay[];
  totalPage: number;
  totalCount: number;
}


export interface CustomerDropdown {
  numberseries: numberSeries[]
  type: dropdown[]
}


export interface CommonDisplay {
  id: number;
  messages: string;
  adDuration: string;
  messageDuration: string;
  directoryId: null;
  file?: fileUploadRes[]
  location?:locationUploadRes[]
  timeslot:TimeSlotRes[]
  termsAndCondition: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface fileUploadRes {
  fileURL: string
  fileName: string
}

export interface locationUploadRes {
  displayFor: string
  value: string
}

export interface TimeSlotRes {
  id?:         number;
  StartHour:  string;
  EndHour:    string;
  MapId?:      number;
  ModuleName?: string;
  CreatedAt?:  string;
  UpdatedAt?:  string;
}



export interface DropdownCommonDisplay{
  key:string[]
  pincode:Dropdown[]
  city: Dropdown[],
  state: Dropdown[],
  country: Dropdown[]
}

export interface Dropdown{
  id:number
  code:string
}



