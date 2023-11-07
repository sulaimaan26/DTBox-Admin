import { EditableTable } from "./TableColumn";

export interface myLocation {
  pincode: string;
  country_name: string;
  state_name: string;
  city_name: string;
}

export interface ILocation extends EditableTable{
  id: number;
  pincode: string;
  state: string;
  city: string;
  country:string;
}
