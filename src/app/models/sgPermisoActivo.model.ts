export class SGPermisoActivo {

    constructor (
        public id_permiso: string,
        public fecha_inicio: string,
        public hora_inicio: string,
        public fecha_cierre: string,
        public hora_cierre: string,
        public lugar_de_trabajo: string,
        public estado: string,
        public prefijo: string,
        public indicativo: number,
        public id_usuario: number,
        public id_empresa: number,
        public id_permiso_trabajo: number,
        public created_at: string,
        public updated_at: string
    ) {

    }
}