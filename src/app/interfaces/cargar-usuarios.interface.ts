import { Usuario } from "../models/usuario.model";

export interface CargarUsuarios {
    response:{
        total:number;
        usuarios:Usuario[];
    }
    
}