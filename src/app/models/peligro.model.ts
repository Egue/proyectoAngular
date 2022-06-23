export class Peligro{

    constructor(
        public id_peligro:number,
        public nombre:string,
        public consecuencias:string,
        public id_empresa:number,
        public id_clasificacion:number,
        public nombreClasificacion:string

    ){}
}