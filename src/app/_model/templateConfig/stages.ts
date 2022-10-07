import {stringify} from "@angular/compiler/src/util";
import {MatStepper} from "@angular/material/stepper";

export interface Stages{
  id: number
  name?: string
  tableName?: string
  order?:number
  fields?:string[]
}

export interface fields{
  fieldname:string
  active:boolean
}



export interface StageMapping{
  id?:number
  name?:string
  stageid:number
  order:number
  mappingid?:number
  companyid?:number
  createdAt?:string
  updatedAt?:string
  isCompleted?: boolean // only for jobcard
  fields:string[]
}


export enum StageName {
  BOOKING = 'booking',
  OriginCargoPickup = 'origincargopickup',
  OriginEmptyPickup = 'originemptypickup',
}

export interface stageType{
  status:boolean
  isUpdate:boolean
}
