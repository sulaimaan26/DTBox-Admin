export interface ValidationError{
  errors:errors[]
}


interface errors{
  rule?: string
  field?: string
  message: string
  status?:number
}



