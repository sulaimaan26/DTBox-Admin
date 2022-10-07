import {EditableTable} from "../../CurrencyCode";

export interface OriginCargoPickupRequest {
  _id?: string
  jobId?: string
  companyId?: number
  originCargoPickup: OriginCargoPickup[]
}

export interface OriginCargoPickup extends EditableTable{
  Transporter: string
  TruckNumber?: string
  Location?: string
  LocationArrivalDate?: string
  LadenMovedDate?: string
  CFSWarehouseArrivedDate?: string
  Quantity?: number
  PackageType?:string
  Remarks?:string
}
