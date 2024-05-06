import { EditableTable } from "./TableColumn";

export interface ICustomer extends EditableTable {
  id:                  number;
  PublicUserId:        number;
  UserName:            string;
  Gender:              null;
  DOB:                 null;
  PinCode:             string;
  Occupation:          null;
  PhoneNumber:         string;
  CompletedScreen:     string;
  CompletedScreenId:   number;
  CompletedPercentage: null;
  expireAt:            null;
  IsActive:            boolean;
  createdAt:           string;
  updatedAt:           string;
  lastLogin:           string;
}
