import {numberSeries} from "./numberseries";
import {dropdown} from "./Dropdowns";

export interface Vendor {
   id?: number;
   vendorno?: string;
   vendortype?: string;
   name?: string;
   name2?: string;
   address?: string;
   address2?: string;
   city?: string;
   state?: string;
   contact?: string;
   phoneno?: string;
   telexno?: string;
   creditlimitlcy?: string;
   vendorpostinggroup?: string;
   currencycode?: string;
   vendorpricegroup?: string;
   paymenttermscode?: string;
   finchargetermscode?: string;
   salespersoncode?: string;
   invoicediscountpercentage?: string;
   countryregioncode?: string;
   blocked?: string;
   invoicecopies?: number;
   paytovendorno?: string;
   datefilter?: string;
   balance?: number;
   lcybalance?: number;
   netchange?: number;
   lcynetchange?: number;
   lcysales?: number;
   lcyprofit?: any;
   lcyinvoicediscounts?: number;
   balancedue?: number;
   lcybalancedue?: number;
   invoiceamounts?: number;
   crmemoamounts?: number;
   lcypayments?: number;
   lcyinvoiceamount?: number;
   lcycrmemoamounts?: number;
   locationcode?: string;
   faxno?: string;
   vatgrnregistrationno?: string;
   picture?: string;
   postcode?: string;
   country?: string;
   email?: string;
   homepage?: string;
   remindertermscode?: string;
   reminderamounts?: number;
   lcyreminderamounts?: number;
   taxareacode?: number;
   vatbuspostinggroup?: number;
   prepaymentpercentage?: number;
   noofquotes?: number;
   noofinvoices?: number;
   noofreturnorders?: number;
   companyid?: number;
   createdBy?: number;
   updatedBy?: number;
   createdAt?: string;
   updatedAt?: string;
}

export interface VendorDropdown{
  numberseries:numberSeries[]
  type:dropdown[]
}
