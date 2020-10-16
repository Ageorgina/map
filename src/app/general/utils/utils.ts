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


}
