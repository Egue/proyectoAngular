export interface IVehiculoDrop  {
    id?:string,
    tipo?:string,
    id_empresa?:string,
    placa?:string,    
    concatName?:string
}

export class VehiculoQuery implements IVehiculoDrop {

    constructor(
        public id?: string,
        public tipo?:string,
        public id_empresa?:string,
        public placa?: string,
        public concatName?: string) {}
    
}