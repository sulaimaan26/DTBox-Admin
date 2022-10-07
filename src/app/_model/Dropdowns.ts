export interface dropdown{
  id: number | string
  value?:string
  code?:string
}


export type MasterTypeDropDown = {
  mastercode:dropdown[]
}

export type VendorDropDown = {
  numberseries:dropdown[]
  type:dropdown[]
}



export type allowedDropdowns = MasterTypeDropDown
