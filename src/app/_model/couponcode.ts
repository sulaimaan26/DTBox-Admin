import { EditableTable } from './TableColumn';

export interface ICouponCode extends EditableTable {
  id?: number;
  CouponCode: string;
  VendorId?: number;
  Description: string;
  StartDate: string;
  EndDate: string;
  BooseterValue: number;
  IsOnlyForNewUser: boolean;
  RedeemerId?: number;
  RedeemDate?: string;
  IsRedeemed?: boolean;
  IsActive: boolean;
  CreatedBy?: string;
  UpdatedBy?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}
