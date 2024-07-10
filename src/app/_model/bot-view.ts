import { ICustomer } from './customer';
import { Adfile, IEvents } from './events';

export interface IBotViewDropdown {
  events: IEvents[];
  videos: Adfile[];
}

export interface BotInactiveSearchResponse extends ICustomer {
  EventId: number;
  VideoId: number;
  UserId: number;
  IsGenerated: boolean;
}

export interface IBotLog {
  EventId: number;
  VideoId: number;
  UserId: number;
  Views: number;
  CreatedBy: string;
  UpdatedBy: string;
  id: number;
  IsActive: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface IBotViewReport {
  id: number;
  PublicUserId: number;
  UserName: string;
  Gender: null;
  DOB: null;
  PinCode: string;
  Occupation: null;
  PhoneNumber: string;
  CompletedScreen: string;
  CompletedScreenId: number;
  CompletedPercentage: null;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  expireAt: null;
  IsActive: boolean;
  IsSales: boolean;
  ThumbNailFileName: string;
  Title: string;
  EventId: number;
  VideoId: number;
  UserId: number;
  blid: number;
  Views: number;
}
