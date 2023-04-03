export interface Permiso{
     
        id_permiso:number  ,
        fecha_inicio:string  ,
        hora_inicio: string,
        fecha_cierre:string ,
        hora_cierre: string ,
        lugar_de_trabajo:string  ,
        estado: number,
        prefijo: string ,
        indicativo: number  ,
        id_usuario: number  ,
        id_empresa: number  ,
        id_permiso_trabajo: number ,
        created_at:string  ,
        updated_at:string  
     
}