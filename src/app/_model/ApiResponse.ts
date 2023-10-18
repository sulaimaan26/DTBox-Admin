import {Observable} from "rxjs";
import {TableColumn} from "./TableColumn";
import {allowedDropdowns} from "./Dropdowns";

export interface APIResponse<T> {
  _issucceed: boolean;
  _data:      ModelName<T>;
  _msg:       string;
}



type ModelName<T> = T[]

export type getAllApiResponse<T> = T[]



export abstract class CRUDOperation<T>{
  get(id:number):Observable<T>{return null}
  create(formData:FormData):Observable<T>{return null}
  update(id:number,formData:FormData):Observable<T>{return null}
  getAll():Observable<getAllApiResponse<T>> { return null}
  getColumn():TableColumn<T>[]{return null}
  getDetailLink():Observable<string>{return null}
}


export abstract class CRUDOperationV2<T> extends CRUDOperation<T>{
  getCreateLink():Observable<string>{return null}
}

export interface EditableTableCRUDOperation<T> extends  CRUDOperation<T>{
  delete(id:number):Observable<any>
  saveChanges(row: T):Observable<T>
  addRow():T
  removeRow(id:number):Observable<any>
}

export interface EditableTableWithSuggestion<T> extends  EditableTableWithDropdown<T>{
  getAllData(limit:number):Observable<getAllApiResponse<T>>
  getRouteParam?:() =>string
}

export interface EditableTableWithDropdown<T> extends  EditableTableCRUDOperation<T>{
  getDropdown():Observable<allowedDropdowns>
}
