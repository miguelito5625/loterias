import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NumerosDiariaService {

  constructor(
    public afs: AngularFirestore
  ) 
  { }

  obtenerNumeros() {
    return this.afs.collection('numerosDiaria', ref => ref.orderBy("numero", "asc")).snapshotChanges();
}

 async generarNumeros(){
  console.log('creando');

  for(let i=0; i<=99; i++){

    if(i<10){

      await this.afs.collection('numerosDiaria').add(
        {
          numero: `0${i}`,
          habilitado: true
        }
      );

    }else{

     await this.afs.collection('numerosDiaria').add(
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
