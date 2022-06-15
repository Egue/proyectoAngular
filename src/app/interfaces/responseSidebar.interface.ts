import { Sidebar } from "../models/sidebar.model";

export interface ISidebarResponse{
    success:boolean,
    response:[
        title:string,
        icono:string,
        submenu:Sidebar[]
    ]
}