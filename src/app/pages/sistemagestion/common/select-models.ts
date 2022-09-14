export interface ISelect{
    key?:string | null;
    value?: string | null;
}

export class Select implements ISelect{
    constructor(public key?: string | null , public value?:string | null)
    {}

    public toString():string | null{
            
        return this.value?this.value:null;
    }
}