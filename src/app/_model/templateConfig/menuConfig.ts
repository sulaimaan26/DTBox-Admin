import {StageMapping} from "./stages";

export interface menuNode {
  id?:number;
  name: string;
  routeName?: string;
  link?:string;
  children?: menuNode[];
}


export interface Mapping {
  id: number,
  templatename: string,
  typename: string,
  subtypename: string,
  groupname: string,
  createdAt: string,
  updatedAt: string
}

export interface MappingInfo{
  id: number
  templateid: number
  typeid: number
  subtypeid: number
  groupid: number
  companyid: number
  isactive: boolean
  createdBy: number
  updatedBy: number
  createdAt: string
  updatedAt: string
  jobcardnumberseriesid: number
  bookingnumberseriesid: number
  stages:StageMapping[]
  activeStage?: number
  isJobCardCompleted?: boolean
  hasNextStage?:boolean
}

