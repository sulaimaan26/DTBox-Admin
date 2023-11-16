import { numberSeries } from './numberseries';
import { dropdown } from './Dropdowns';
import { IVideoLevel } from './videolevel';

export interface CustomerDropdown {
  numberseries: numberSeries[];
  type: dropdown[];
}

export interface CommonDisplay {
  id: number;
  Title: string;
  Description: string;
  messages: string;
  adDuration: string;
  messageDuration: string;
  directoryId: null;
  file?: fileUploadRes[];
  location?: locationUploadRes[];
  timeslot: TimeSlotRes[];
  termsAndCondition: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  AdStartDate: string;
  AdEndDate: string;
  IsActive: string;
}

export interface fileUploadRes {
  Title?: string;
  Description?: string;
  fileURL: string;
  fileName: string;
}

export interface adFile {
  ThumbNail: string;
  VideoFile: string;
}

export interface locationUploadRes {
  displayFor: string;
  value: string;
}

export interface TimeSlotRes {
  id?: number;
  StartHour: string;
  EndHour: string;
  MapId?: number;
  ModuleName?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export interface DropdownCommonDisplay {
  key: string[];
  pincode: Dropdown[];
  city: Dropdown[];
  state: Dropdown[];
  country: Dropdown[];
  videolevel: IVideoLevel[];
}

export interface Dropdown {
  id: number;
  code: string;
}
