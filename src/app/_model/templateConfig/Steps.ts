import {Observable, ReplaySubject} from "rxjs";
import {MappingInfo} from "./menuConfig";

export interface Steps{
  name:string
  component:any
  isCompleted:boolean
  stageId:number
  jobId?:string
  mapInfo:MappingInfo
  stageData?:Observable<any>
  $dropdowns?:Observable<any>
  fields?:string[]
}
