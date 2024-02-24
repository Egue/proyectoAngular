import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; 
import { AuthService } from 'src/app/auth/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import {AccordionModule} from 'primeng/accordion';
import { SistemaGestionService } from 'src/app/services/sistema-gestion.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ],
  providers:[MessageService]
})
export class PerfilComponent implements OnInit {
 
  public imgTemp:any = "";

  public imagen?:any;

  public formKeys = this.fb.group({
    public_key:['' , Validators.required],
    private_key:['' , Validators.required]
  });

  public formPassword = this.fb.group({
    password: ['' , [Validators.required , Validators.minLength(8)]]
  });

  constructor(public auth:AuthService , 
    private usuarioService:UsuariosService , 
    public fb:FormBuilder , 
    private sistemaGestionService:SistemaGestionService , 
    private errorHandlingService:ErrorHandlingService , 
    private messageService: MessageService) { }

  ngOnInit(): void { 
    this.getFindKeyById();
    this.getVehiculosFindByIdusuario();
  }

  getFindKeyById()
  {
    this.usuarioService.findKeyById(this.auth.usuario)
                  .subscribe((resp:any) => {
                      this.formKeys.reset({...resp.response[0]} , {emitEvent: false , onlySelf:true})
                  })
                  
  }

  generateKey()
  {
    this.usuarioService.generateKeyElectronica(this.auth.usuario)
                                              .subscribe((resp:any) => {
                                                if(resp.response)
                                                {
                                                  this.getFindKeyById();
                                                  Swal.fire({
                                                    icon: 'success',
                                                    title: 'Llaves Generadas con éxito',
                                                    showConfirmButton: false,
                                                      timer: 1500
                                                  })
                                                }
                                              } , err => {
                                                Swal.fire({
                                                  title:'Oops..',
                                                  text:'Error al generar llave',
                                                  icon:'error'
                                                })
                                              })
  }
  aleatorioKey()
  {
            let pass = '';
            let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                    'abcdefghijklmnopqrstuvwxyz0123456789@#$)=¡¿!%&/(';
              
            for (let i = 0; i <= 10; i++) {
                let char = Math.floor(Math.random()
                            * str.length + 1);
                  
                pass += str.charAt(char)
            }
              
            this.formPassword.get('password')?.setValue(pass);
  }
  updatedContrasena()
  { const {password} = this.formPassword.value;

    this.usuarioService.updatedPassword(this.auth.usuario , password)
                          .subscribe((resp:any) => {
                            if(resp.response)
                            { 
                              Swal.fire({
                                icon: 'success',
                                title: 'Llaves Generadas con éxito',
                                showConfirmButton: false,
                                  timer: 1500
                              })
                              this.auth.logout();
                            }
                          })
  }

  getVehiculosFindByIdusuario()
  { 
      this.sistemaGestionService.getVehiculosFindByIdusuario(this.auth.usuario.id)
                      .subscribe((resp:any) => {
                       // console.log(resp);
                      })
  }

  imageChange(file:any)
  {
     //console.log($event.target.files[0])
     
     if(!file.target.files[0]){
        this.imgTemp = null;
     }else
     { 
     this.imagen =  file.target.files[0];
     const reader = new FileReader();

     const url64 = reader.readAsDataURL(this.imagen);

     reader.onload = () => {
      this.imgTemp = reader.result
     }
    }
  }

  uploadImagen()
  {
      this.usuarioService.changeImage(this.imagen , this.auth.usuario.id).subscribe( () => {

      }  , () => {
        this.messageService.add({severity:'error' , summary:'Actualizando imagen' , detail: this.errorHandlingService.error.error.response})
      });
  }


}
