import { Distritos } from './distritos';
export class Login{
  user: User;
  token: string;
  constructor(init?: Partial<Login>){
    // noinspection TypeScriptValidateTypes
    Object.assign(this,init);
  }
}

export class User{
  distritos: Array<Distritos>;
  id: number;
  partido: string;
  rol: string;
  username: string;
  access: string;

  // user: string;
  // partido: string;
  // influencer: boolean;
  // administrador: boolean;
  // distritos: any[];
  // enabled: boolean;
  // authorities: DistritoAsignado[];
  // username: string;
  // rol: string;
  

  constructor(init?: Partial<User>){
    // noinspection TypeScriptValidateTypes
    Object.assign(this,init);
  }

}
export class DistritoAsignado{
  estado: string;
  distrito: string;
  secciones: string[];

  constructor(init?: Partial<DistritoAsignado>){
    // noinspection TypeScriptValidateTypes
    Object.assign(this,init);
  }
}
