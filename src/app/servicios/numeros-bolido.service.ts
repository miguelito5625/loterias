import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NumeroBolido } from '../clases/numero-bolido';

@Injectable({
  providedIn: 'root'
})
export class NumerosBolidoService {

  constructor(
    public afs: AngularFirestore
  ) 
  { }

  obtenerNumeros() {
    return this.afs.collection('numerosBolido', ref => ref.orderBy("numero", "asc")).snapshotChanges();
}

 async generarNumeros(){
  console.log('creando');

  for(let i=1; i<=99; i++){

    if(i<10){

      await this.afs.collection('numerosBolido').add(
        {
          numero: `0${i}`,
          habilitado: true
        }
      );

    }else{

     await this.afs.collection('numerosBolido').add(
        {
         
          numero: `${i}`,
          habilitado: true
        }
      );

    }

  }

  return true;
  
}

}
