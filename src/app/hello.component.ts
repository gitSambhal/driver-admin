import { Component, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';
import {SharedService} from './shared.service';
import * as firebase from "firebase";

@Component({
  selector: 'hello',
  templateUrl: `hello.component.html`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent {
  @Input() tableName: string;
  @Input() keys: any[] = [];
  @Input() data: any[] = [];
  sqlresult: string[] = [];
  newKey: string = '';
  @Output() changedHandler = new EventEmitter();
  constructor(
    public shared: SharedService,

  ){

  }
  ngOnInit() {
    this.changed();

  }



  changed() {
    console.log('changed')
    let driverColumns = Object.keys(this.data).join();
    let driverValues = Object.values(this.data).map((el) => `'${el}'`);

    this.sqlresult[0] = `INSERT INTO ${this.tableName} (${driverColumns}) values (${driverValues})`;

    this.changedHandler.emit(driverValues)
  }
  
  empty() {
    // console.log(this.data)
    for (let prop in this.data) {
      if (this.data.hasOwnProperty(prop)) {
        this.data[prop] = ''
      }
    }
    this.changedHandler.emit(this.data)

  }

  copy(el) {
       this.shared.copy(el)
  }

  add(){
    if(this.newKey.length ==0){
      console.log('Enter something')
      return;
    }
     if(this.keys.includes(this.newKey)){
      console.log('Key Aready exist')
      return;
    }
    
    this.keys.push(this.newKey);
    this.data[this.newKey]= '';
    this.newKey = '';
    this.changedHandler.emit(this.data)

  }

  remove(key){
    let index = this.keys.indexOf(key);
    this.keys.splice(index,1);
    delete this.data[key];
    this.changedHandler.emit(this.data)

  }

  generateId(k){
    this.data[k] = uuid();
    this.changed();
    this.changedHandler.emit({key:k, data:this.data[k]});
  }

  save(){
    console.log(firebase)
    let id = '';
    if(this.tableName.includes('vehicle')) {
      id = this.data['driver_vehicle_id']
    } else {
      id = this.data['driver_id']
    }
    if(!id){
      alert('Id cannot be empty');
      return;
    }
    if (!firebase.apps.length) {
      alert('Connect to firebase first');
      return;
    }
    if(!confirm(JSON.stringify({id,data:this.data}))) return;
    firebase.database().ref(this.tableName+'/'+id).set(this.data).then((resp)=>{
      console.log(resp);
      alert('Record added')
    }).catch((err)=>{
      console.log(err);
      alert('Some error occured')
    })
  }

}
