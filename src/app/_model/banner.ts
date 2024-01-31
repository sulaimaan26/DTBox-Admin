import { ILocation } from './location';
import { EditableTable } from './TableColumn';

export interface IBanner extends EditableTable {
  id: number;
  BannerId: string;
  StartDate: string;
  EndDate: string;
  TermsAndCondition: null;
  IsActive: boolean;
  location: ILocation[];
  bannervideo: IBannerVideo[];
  CreatedBy: string;
  UpdatedBy: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface IBannerVideo {
  id: number;
  ThumbnailURL: string;
  VideoURL: string;
  StartDate: string;
  EndDate: string;
  RequiredView: number;
  BoosterValue: number;
  IsActive: boolean;
}
