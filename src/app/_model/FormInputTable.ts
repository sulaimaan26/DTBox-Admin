import {Cargo, FullContainerLoad, LessContainerLoad} from "./Jobcard/Stages/Booking";
import {OriginCargoPickup} from "./Jobcard/Stages/OriginCargoPickup";

export type allowedFormTable  = Cargo | FullContainerLoad  | LessContainerLoad | OriginCargoPickup
