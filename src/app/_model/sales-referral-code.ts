import { ICustomer } from './customer';

export interface ISalesReferralCode {
  id: number;
  UserId: number;
  SalesReferralCode: string;
  CreatedBy: string;
  UpdatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISalesCodeDashboard extends ISalesReferralCode {
  PublicUserId: null;
  UserName: null;
  Gender: null;
  DOB: null;
  PinCode: null;
  PhoneNumber: null;
}

export interface SalesDropdown {
  customer: ICustomer[];
}
