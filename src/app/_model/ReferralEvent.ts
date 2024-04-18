import { EditableTable } from './TableColumn';

export interface IReferralEvent extends EditableTable {
  id: number;
  EventId: string;
  Title: string;
  Description: string;
  Description2: null;
  Description3: null;
  StartDate: string;
  EndDate: string;
  IsActive: boolean;
  IsCompleted: boolean;
  CreatedBy: string;
  UpdatedBy: string;
  CreatedAt: string;
  UpdatedAt: string;
}
