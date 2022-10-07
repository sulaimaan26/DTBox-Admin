import {Template} from "./Template";
import {Type} from "./Type";
import {SubType} from "./SubType";
import {Group} from "./Group";
import {Stages} from "./stages";
import {numberSeries} from "../numberseries";

export interface MappingDropdown{
  templates:Template[],
  types:Type[],
  subtypes:SubType[],
  groups:Group[],
  stages:Stages[],
  numberseries:numberSeries[]
}
