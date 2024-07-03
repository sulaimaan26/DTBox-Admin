export interface IReferralLog {
  id: number;
  ReferrerId: number;
  RedeemerId: number;
  ReferralCode: string;
  IsSales: boolean;
  IsSuccess: boolean;
  Remarks: string;
  RefererBoosterEarned: number;
  RedeemerBoosterEarned: number;
  createdAt: string;
  updatedAt: string;
  PublicUserId: number;
  UserName: string;
  Gender: string;
  DOB: string;
  PinCode: string;
  PhoneNumber: string;
}

export interface ReferralLogRequest {
  ReferralCode: string;
  UTCStartDate: string;
  UTCEndDate: string;
  ReferrerId: number;
  IsSuccess: boolean;
}
