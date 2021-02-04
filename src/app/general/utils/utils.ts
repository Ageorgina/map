import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Utils {
    constructor() {
    }

  numeros($event: KeyboardEvent) {
    const value = ($event.target as HTMLInputElement).value;
    if ($event.target) {
      ($event.target as HTMLInputElement).value = value.replace(/[^0-9]+/g, '');
    }
  }
  numerosp($event: KeyboardEvent) {
    const value = ($event.target as HTMLInputElement).value;
    if ($event.target) {
      ($event.target as HTMLInputElement).value = value.replace(/[^-.0-9\s]+/g, '');
    }
  }
  porcentaje($event: KeyboardEvent){

    const value = ($event.target as HTMLInputElement).value;
       if(value.lastIndexOf('.') > 2 || value.lastIndexOf('.') === 0){
            ($event.target as HTMLInputElement).value = value.replace(value, '');
       }
    var isValid = value.match(/^(100([.]0{2})?|[0-9]?|([0-9]?[0-9]([.]{1}[0-9]{2})\s))$/gm) == null ? false:true;

    if ( Number(value) > 100  ) {
      ($event.target as HTMLInputElement).value = value.replace($event.key, '');
    }
  }




}
