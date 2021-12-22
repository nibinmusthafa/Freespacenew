export interface User{
    id:number,
    name:string,
    email:string,
    designation_id:number,
    userdesignation:string,

}

export interface followupDate{
    id: number,
    updated_by: number,
    lead_id: number,
    followup_date: Date,
    datetime: Date,
}