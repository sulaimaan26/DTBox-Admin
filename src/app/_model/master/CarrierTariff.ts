import {dropdown} from "../Dropdowns";

export interface CarrierTariff {
   shippingtype?: string;
   cargotype?: string;
   tarifftype?: string;
   uom?: string;
   containertype?: string;
   itemname?: any;
   currency?: string;
   id?: number;
   code: string;
   mode?: string;
   port?: string;
   carriername?: any;
   effectivedate?: any;
   charges?: any;
   periodstartdate?: any;
   periodenddate?: any;
   active?: boolean;
   companyid?: number;
   createdBy?: number;
   updatedBy?: number;
   createdAt?: string;
   updatedAt?: string;
}

export interface CarrierTariffDropDown{
    mode:dropdown[]
    shippingtype:dropdown[]
    tarifftype:dropdown[]
    cargotype:dropdown[]
    city:dropdown[]
    carriername:dropdown[]
    unitofmeasure:dropdown[]
    containertype:dropdown[]
    itemname:dropdown[]
    currency:dropdown[]
}
