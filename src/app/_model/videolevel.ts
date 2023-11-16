import { EditableTable } from './TableColumn';

export interface IVideoLevel extends EditableTable {
  id?: number;
  ViewCount: number | string;
  TimeOut: number | string;
}
