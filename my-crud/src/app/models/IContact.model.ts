export  interface IContact{
  id:number,
  nombre:string,
  apellido:string,
  telefono:string
}

export  interface IContactSave{
  nombre:string,
  apellido:string,
  telefono:string
}

export  interface IResponseContacts{
  contacts: IContact[];
}