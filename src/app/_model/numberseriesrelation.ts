export interface NumberSeriesRelation {
  id:               number;
  code: string;
  numberseriesId:   number;
  startingDate:     string;
  startingNo:       number;
  startingNoPrefix: string;
  endingNo:         number;
  incrementBy:      number;
  lastNoUsed:       number;
  lastDateUsed:     string;
  createdBy:        number;
  createdAt:        string;
  updatedAt:        string;
}
