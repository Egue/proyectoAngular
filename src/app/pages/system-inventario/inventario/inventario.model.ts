export interface IInventario {
    id?: number,
    nombre?:string,
    codigo?:string,
    valor?:number,
    unitario?:string,
    cantidad?:number,
    categoria?:string,
    estado?:string,

}

export class InventarioArticulo{
    constructor(public id?: number,
        public   nombre?:string,
        public   codigo?:string,
        public   valor?:number,
        public  unitario?:string,
        public   cantidad?:number,
        public   categoria?:string,
        public   estado?:string,) {}
}