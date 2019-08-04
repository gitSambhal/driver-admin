import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { SharedService } from './shared.service'

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

@NgModule({
  imports: [BrowserModule, FormsModule,

    // AngularFireModule.initializeApp({
    //   apiKey: "AIzaSyCX7c66RO00WBml3y87N40O0FHPR38cZR0",
    //   authDomain: "test-pwa-eee13.firebaseapp.com",
    //   databaseURL: "https://test-pwa-eee13.firebaseio.com",
    //   projectId: "test-pwa-eee13",
    //   storageBucket: "test-pwa-eee13.appspot.com",
    //   messagingSenderId: "602911331781",
    //   appId: "1:602911331781:web:809abfee984d3f9e"
    // }),
    // AngularFirestoreModule 

  ],
  declarations: [AppComponent, HelloComponent],
  providers: [
    SharedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
