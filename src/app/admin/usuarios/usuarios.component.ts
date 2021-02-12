import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService, UserService, AlertsService } from '../../general/services';
import { User, Distritos } from '../../general/model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  user = new User;
  loading = true;
  userForm : FormGroup;
  distForm: FormGroup;
  submitted = false;
  error = 'Campo Obligatorio';
  titulo = "Usuario"
  partidos= [];
  roles = [];
  distritos: any[] = [];
  estados: any[] = [];
  distritosArr: Distritos[] = [];
  disabledDist = false;
  disabledSec = false;
  secciones = [];
  edo: any;
  dist : any;
  estadoArr = new Distritos;
  new = false;
  dropdownSettings : IDropdownSettings;
  //distritos = [];

  constructor(private formBuilder: FormBuilder,private menu: MenuService, private userSrv: UserService,
                private alert: AlertsService ) { 

    this.menu.getPartidos().subscribe(partidos => this.partidos = partidos );
    this.menu.getinfoMx().subscribe(estados => this.estados = estados );
    
    this.menu.getRoles().subscribe(roles => this.roles = roles );

    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      access: ['', Validators.required],
      partido: [''],
      rol: ['', Validators.required],
      clave_entidad: ['']
    });
    this.distForm = this.formBuilder.group({
      estado: ['', Validators.required],
      distrito: [''],
      secciones: ['']
  });
  this.distForm.get(['estado']).setValue(['Estados']);
  this.distForm.get(['distrito']).setValue(['Distritos']);
  this.userForm.get(['rol']).setValue(['Roles']);
  this.userForm.get(['partido']).setValue(['Partidos']);

  }
  get fval() { return this.userForm.controls;  }

  ngOnInit() {
    this.loading = false;
  }
  onSubmit(){
    if(this.userForm.invalid === true || this.distForm.invalid === true){
      this.alert.showError();
      return ;
    }
    this.loading = true;
    this.user.username = this.fval.username.value;
    this.user.access = this.fval.access.value;
    this.user.partido = this.fval.partido.value;
    this.user.rol = this.fval.rol.value;
    this.user.distritos = this.distritosArr;
    this.userSrv.createUser(this.user).subscribe(response => {
      this.loading = false;
      this.alert.showSuccess();
      this.clearUser();
    })
  }
  selectedEdo(event) {
     this.disabledDist = true;
     this.estados.filter( estado => {
       if (estado.clave_entidad === event.srcElement.value ) {
         this.edo = estado.clave_entidad;
         this.dropdownSettings = {
          singleSelection: false,
          idField: 'item_id',
          textField: 'item_text',
          selectAllText: 'Seleccionar Todos',
          unSelectAllText: 'Ninguno',
          //itemsShowLimit: 3,
        };
         this.distritos = estado.distritos;
         console.log('d', this.distritos
         )
       }
     });  
  }

  selectedDist() {
    this.disabledSec = true;
   }
   saveEdo(){
     this.new = true;
    if ((this.distForm.controls.distrito.value).length === 2) {
      this.dist = '0' + String(this.distForm.controls.distrito.value);    
    } else {
      this.dist = '00' + String(this.distForm.controls.distrito.value);
    }
     this.estadoArr.distrito = this.dist;

     this.estadoArr.estado = this.edo;
     if(this.distForm.controls.secciones.value=== null){
       this.secciones = [];
      
     } else if(this.distForm.controls.secciones.value.length >= 1){
     (this.distForm.controls.secciones.value).filter(seccion =>{
      this.secciones.push(seccion.value);
    })
  }
     this.estadoArr.secciones = this.secciones;
     if(this.distritosArr.length >= 1){
      this.distritosArr.filter(response => {
         if(response.estado !== this.edo && response.distrito !== this.dist){
           this.distritosArr.push(this.estadoArr);
         }
        return

       })
     } else {
      this.distritosArr.push(this.estadoArr);

     }

 
   }
   clear(){
    this.new = false;
    this.disabledDist = false;
    this.disabledSec = false;
     this.distForm.reset();
     this.estadoArr = new Distritos;
     this.secciones = [];
     this.edo ='';
     this.dist = '';
     this.distForm.get(['estado']).setValue(['Estados']);
     this.distForm.get(['distrito']).setValue(['Distritos']);
   }
   clearUser(){
    this.userForm.get(['rol']).setValue(['Roles']);
    this.userForm.get(['partido']).setValue(['Partidos']);
    this.distritosArr = [];
    this.userForm.reset();
    this.clear();
   }

   onItemSelect(item) {
    console.log('onItem',item);
  }
  onSelectAll(items) {
    console.log('onSelect',items);
  }



}
