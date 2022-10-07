import {InjectionToken} from "@angular/core";
import {TableName} from "./TableColumn";

export interface Header {
  title:string
  breadcrumb:BreadCrumb[]
  button?:CreateButton
}


export interface BreadCrumb {
  name:string,
  link?:string,
  isActive:boolean,
}

export interface CreateButton {
  isActive?:boolean,
  link:string,
  isTable:boolean,
  isPopup:boolean,
  name:string | TableName

}

export interface RouteData{
  header:Header
  requiredService?:InjectionToken<string>
}
