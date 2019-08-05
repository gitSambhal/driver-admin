import { Component } from '@angular/core';
import { SharedService } from './shared.service'
import * as firebase from "firebase";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dbname:string;
  defautlVehicleSql = 'Angular';
  showDriver: boolean = true;
  showVehicle: boolean;
  sqlQueries: string[] = [];
  fbObjs: any[] = [];
  driverData = {}
  vehicleData = {}
  keys = [];
  fbkeys = {
    apiKey: "AIzaSyCX7c66RO00WBml3y87N40O0FHPR38cZR0",
    authDomain: "test-pwa-eee13.firebaseapp.com",
    databaseURL: "https://test-pwa-eee13.firebaseio.com",
    projectId: "test-pwa-eee13",
    storageBucket: "test-pwa-eee13.appspot.com",
    messagingSenderId: "602911331781",
    appId: "1:602911331781:web:809abfee984d3f9e"
  }

  fbkeyswhizzydev= {
	}

  firebaseobj: any = {
     apiKey: "AIzaSyCX7c66RO00WBml3y87N40O0FHPR38cZR0",
    authDomain: "test-pwa-eee13.firebaseapp.com",
    databaseURL: "https://test-pwa-eee13.firebaseio.com",
    projectId: "test-pwa-eee13",
    storageBucket: "test-pwa-eee13.appspot.com",
    messagingSenderId: "602911331781",
    appId: "1:602911331781:web:809abfee984d3f9e"
  }
  firebaseobj2: any;

  constructor(
    public shared: SharedService,
    // public db: AngularFirestore,

  ) {

  }
  ngOnInit() {

    this.driverData = {
  "driver_address1" : "j",
  "driver_address2" : "t",
  "driver_admin" : "",
  "driver_average_ratings" : 4,
  "driver_current_status" : "",
  "driver_id" : "",
  "driver_image" : "",
  "driver_mobile" : "",
  "driver_name" : ""
}



    this.vehicleData = {
  "current_status": "Active",
  "driver_id": "",
  "driver_image": "",
  "driver_mobile": "",
  "driver_name": "",
  "driver_vehicle_id": "",
  "status_updated_time": "null",
  "vehicle_document_insurance": "null",
  "vehicle_document_pollution": "null",
  "vehicle_document_rc": "null",
  "vehicle_max_weight": "null",
  "vehicle_name": "Two Wheeler",
  "vehicle_number": "",
  "vehicle_type": ""
}

    this.keys['driver'] = Object.keys(this.driverData);
    this.keys['vehicle'] = Object.keys(this.vehicleData);

    this.generateSql();
    this.firebaseobj = JSON.stringify(this.firebaseobj)
    try {
    this.dbname = firebase.database()['root_']

    } catch(e){
      console.log(e)
    }

  }

  generateSql() {
    this.defautlVehicleSql = `INSERT INTO driver_default_vehicle (driver_id, driver_vehicle_id) VALUES ('${this.driverData["driver_id"]}', '${this.vehicleData["driver_vehicle_id"]}');`;
  }

  copy(el) {
    this.shared.copy(el)
  }

  toggleDriver() {
    this.showDriver = !this.showDriver;
  }

  toggleVehicle() {
    this.showVehicle = !this.showVehicle;
  }
  changed(e, d) {
    console.log('dfklsjadlf')
    console.log({ d, e });
    if (e.key == 'driver_id') {
      this.driverData['driver_id'] = e.data;
      this.vehicleData['driver_id'] = e.data;

    }
    if (e.key == 'driver_vehicle_id') {
      this.vehicleData['driver_vehicle_id'] = e.data;
    }

    this.generateSql();
  }

  fbchanged($event) {
    console.log($event)
    try {
      this.firebaseobj2 = JSON.parse(JSON.stringify($event));
      this.initFB();
    } catch (e) {
      console.error('Invalid json', e)
    }

  }


  initFB() {
    // console.log(this.fbkeys)
    let key = this.fbkeys;
    key = this.firebaseobj2;
    console.log({key,firebase})
    if (!firebase.apps.length) {
      if(typeof key =='string'){
        key = this.parseJSON(key);
        // key = JSON.parse(JSON.stringify(eval("(" + key + ")")));
      }
      firebase.initializeApp(key);
    }
    this.dbname = firebase.database()['root_']
    console.log(firebase.database()['root_'])

  }
  
   parseJSON = (obj) => Function('"use strict";return (' + obj + ')')();

  
}
