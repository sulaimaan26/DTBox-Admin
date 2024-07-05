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
  EventId:   number;
  VideoId:   number;
  UserId:    number;
  Views:     number;
  CreatedBy: string;
  UpdatedBy: string;
  id:        number;
  IsActive:  boolean;
  CreatedAt: string;
  UpdatedAt: string;
}
