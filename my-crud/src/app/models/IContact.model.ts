export default interface IContact{
  id:number,
  nombre:string,
  apellido:string,
  telefono:string
}

export default interface IResponseContacts{
  contacts: IContact[];
}