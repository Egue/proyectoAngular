import { Component, OnInit } from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import { RolesVistaService } from '../../../services/roles-vista.service';
import {ToolbarModule} from 'primeng/toolbar';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: [
  ]
})
export class RolesComponent implements OnInit {

  //grupo menu
  public groupArray:any[] = [];
  public modalGrupo:boolean = true;
  public formGroupMenu = this.fb.group({
    title:['' , [Validators.required]],
    icono:['' , [Validators.required]]
  });

  //tabla de vistas
  public first:number = 0;
  public rows:number = 10;
  public listViews:any[] = [];
  public modalVista:boolean = true;
  public formViews = this.fb.group({
    title:['' , [Validators.required]],
    url: ['' , [Validators.required]]
  });

  //Roles
  public rolList:any[] = [];
  public relationsList:any[] = [];
  public modalRelations:boolean = true;
  public formRelations = this.fb.group({
    roles_role:['' , [Validators.required]],
    group_id: ['',[Validators.required]],
    vistas_id:['',[Validators.required]],
    active:['Y' , [Validators.required]]
  });

  constructor(private rolesVistaServices:RolesVistaService , private fb:FormBuilder) { }

  ngOnInit(): void {
    this.listGroup();
    this.getListViews();
   this.getListRoles();
  }
//getlist ROLES
getListRoles()
{
  this.rolesVistaServices.getListRoles()
                        .subscribe((resp:any) => {  
                           this.rolList = resp.response.roles;
                           
                        }

                        );
}

getListRelations(rol:any)
{ 
  this.rolesVistaServices.getListRelations(rol.role)
                          .subscribe((resp:any) => {
                            this.relationsList = resp.response;
                          });
}
cerrarModalRelations(){this.modalRelations = true;}
openModalRelations(){this.modalRelations = false;}
saveRelations()
{
  this.cerrarModalRelations();
  if(this.formRelations.valid)
  {
    this.rolesVistaServices.saveRelations(this.formRelations.value)
                            .subscribe((resp) => {
                              if(resp){
                                Swal.fire('Creado con Éxito' , 'Creado con éxito' , 'success');
                                this.formRelations.reset();
                                 
                              }
                            });
  }
}
//consultas get services //group
  listGroup()
  {
    this.rolesVistaServices.listGroup()
          .subscribe((resp:any) => {
            this.groupArray = resp.response;
          })
  }
  cerrarModalGrupo() { this.modalGrupo = true; }
  openModalGrupo() {this.modalGrupo = false; }
  saveGroup(){
      this.cerrarModalGrupo();
      if(this.formGroupMenu.valid)
      {
        this.rolesVistaServices.saveGroup(this.formGroupMenu.value)
                                .subscribe((resp) => {
                                  if(resp)
                                  {
                                    this.formGroupMenu.reset();
                                    this.listGroup();
                                  }
                                });
      }
  }
  
  /*
  *List Vistas
  */
 getListViews()
 {
  this.rolesVistaServices.getListViews()
        .subscribe((resp:any) => 
        {
          this.listViews = resp.response;
        });
 }
 cerrarModalViews(){this.modalVista = true;}
 openModalViews(){this.modalVista = false;}
 saveViews()
 {
    this.cerrarModalViews();
    if(this.formViews.valid)
    {
      this.rolesVistaServices.saveViews(this.formViews.value)
                          .subscribe((resp) => {
                            if(resp)
                            {
                              this.formViews.reset();
                              this.getListViews();
                            }
                          });
    }
 }

  //function tabla de vistas
  next()
  {
    this.first = this.first + this.rows;
  }
  prev()
  {
    this.first = this.first - this.rows;
  }
  reset() {
    this.first = 0;
  }
  isLastPage():boolean{
    return this.listViews ? this.first === (this.listViews.length - this.rows):true;
  }
  isFirstPage():boolean{
    return this.listViews ? this.first === 0 : true;
  }

   
}
