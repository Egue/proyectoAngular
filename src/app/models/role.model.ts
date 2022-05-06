export class Rol {
    constructor(
        public role:string
    )
    {}

    public toString():string | null
    {
        return this.role?this.role:null;
    }
}