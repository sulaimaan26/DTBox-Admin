// Generated by https://quicktype.io

import { locationUploadRes } from './commondisplay';
import { IVideoLevel } from './videolevel';

export interface IEvents {
  id: number;
  EventId: string;
  Title: string;
  Description: string;
  Points: number;
  TopScorerCount: number;
  IsActive: boolean;
  IsCompleted: boolean;
  TermsAndCondition: string;
  DirectoryId: string;
  ThumbNail: string;
  file: Adfile[];
  AdStartDate: string;
  AdEndDate: string;
  AdCompletionDate: string;
  AdFile: string;
  CreatedBy: string;
  UpdatedBy: string;
  CreatedAt: string;
  UpdatedAt: string;
  peakHours: PeakHour[];
  location: locationUploadRes[];
  AllowShare: boolean;
  EnableShareOptionAt: string;
  DisableShareOptionAt: string;
  ShareOptionWatchCount: number;
  MinimumPointBalance: number;
  SharePointCount: number;
}
export interface PeakHour {
  id?: number;
  mapId?: number;
  Points: number;
  StartDateTime: string;
  EndDateTime: string;
  CreatedBy?: string;
  UpdatedBy?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export interface Adfile {
  id: number;
  eventId: number;
  ThumbNailFileName: string;
  ThumbNail: string;
  VideoFileName: string;
  active: boolean;
  VideoFile: string;
  videolevel: IVideoLevel[];
}
