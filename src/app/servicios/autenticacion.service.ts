import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { auth } from 'firebase';
import { NodeSnackbarService } from './node-snackbar.service';
import { JqueryConfirmService } from './jquery-confirm.service';
// import translate from 'translate';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private servicioSnackbar: NodeSnackbarService,
    private servicioJqueryComfirm: JqueryConfirmService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          // this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Registro usuario con email/password
  registroUsuario(email, password) {

    var modalCargando = this.servicioJqueryComfirm.modalCargando();
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        console.log(result);
        modalCargando.close();
        this.router.navigate(['/']);
        this.servicioSnackbar.mostrarSnackBarArriba('Usuario registrado, intenta iniciar sesion');


        // this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        // window.alert(error.message)
        modalCargando.close();
        // translate.engine = 'google';
        // translate.key = 'AIzaSyC753Q4lRbPglDsCKMVEN68qdsWT3spbJQ';
        // translate(error.message, 'es').then(data => {
        //   this.servicioJqueryComfirm.mensajeDeError(data);
        // },
        //   err => {
        //     modalCargando.close();
        //     console.log('error en la traduccion');
        //     this.servicioJqueryComfirm.mensajeDeError('');
        //   });

        // this.servicioJqueryComfirm.mensajeDeError(errorTraducido);
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get sesionActiva(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  loginConCorreo(email: string, password: string) {

    var modalCargando = this.servicioJqueryComfirm.modalCargando();

    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {

        this.SetUserData(result.user);

        localStorage.setItem('sesionActiva', "true");
        localStorage.setItem('correo', result.user.email);
        this.router.navigate(['/']);
        modalCargando.close();
        this.servicioSnackbar.mostrarSnackBarArriba('Sesion iniciada');


      }).catch((error) => {
        // window.alert(error.message)
        modalCargando.close();
        // translate.engine = 'google';
        // translate.key = 'AIzaSyC753Q4lRbPglDsCKMVEN68qdsWT3spbJQ';
        // translate(error.message, 'es').then(data => {
        //   this.servicioJqueryComfirm.mensajeDeError(data);
        // },
        //   err => {
        //     modalCargando.close();
        //     console.log('error en la traduccion');
        //     this.servicioJqueryComfirm.mensajeDeError('');
        //   });
      })


  }

  obtenerUsuarios() {
    return this.afs.collection('users').snapshotChanges();
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: Usuario = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      ultimoInicioDeSesion: Date()
    }
    console.log(userData);

    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  cerrarSesion() {
    var modalCargando = this.servicioJqueryComfirm.modalCargando();
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('sesionActiva');
      this.router.navigate(['/']);
      modalCargando.close();
      this.servicioSnackbar.mostrarSnackBarArriba('Sesion cerrada');
    })
  }
}
