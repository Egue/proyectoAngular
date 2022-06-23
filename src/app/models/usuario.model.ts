export class Usuario {

    constructor(
        public user:string,
        public email:string,
        public password:string,
        public id:number,
        public marca:string,
        public active:number,
        public url_img:string,
        public role:string,
        public created_at:string,
        public updated_at:string,
        public id_empresa:number
        //public obsional:?string
    )  {}

    get imagenUrl()
    {
        const base = 'https://apps.internetinalambrico.com.co/Files/usuarios';
        return `${base}/${this.url_img}`;
    }
}