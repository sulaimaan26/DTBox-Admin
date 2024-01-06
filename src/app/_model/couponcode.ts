import { EditableTable } from "./TableColumn";

export interface ICouponCode extends EditableTable {
  id?: number;
  CouponCode: string;
  Description: string;
  StartDate: string;
  EndDate: string;
  IsActive: boolean;
  CreatedBy?: string;
  UpdatedBy?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}
