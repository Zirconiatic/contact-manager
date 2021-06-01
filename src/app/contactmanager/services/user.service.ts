import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //get user details by ID
  userById(id: number): User {
    return this.dataStore.users.find(x=>x.id == id);
  }

  private _users:BehaviorSubject<User[]>;

  //we need a private data store to store the data
  private dataStore:{
    users:User[]
  }

  //for Http Client we need to import HttpClientModule
  constructor(private http:HttpClient) { 
    this.dataStore={users:[]};
    //initialize the behaviour subject
    this._users = new BehaviorSubject<User[]>([]);
   }

   //now return this subject as an observable so as to the users subscribe the Observables
   //to get the required data
   get users():Observable<User[]>{
     return this._users.asObservable();
   }

   addUser(user:User):Promise<User>{
     return new Promise((resolver,reject)=>{
       user.id = this.dataStore.users.length+1;
       this.dataStore.users.push(user);

       //we need to notify the datastore that the values have been updated
       this._users.next(Object.assign({},this.dataStore).users);
       resolver(user);
     })
   }

   loadAll(){
     const userUrl = 'https://angular-material-api.azurewebsites.net/users';

     return this.http.get<User[]>(userUrl)
     .subscribe(data=>{
      this.dataStore.users = data;

      //we need to call the next on behavious subject to publish data on all our subscribing subjects
      //we dont actually want to push out the entire data store since that will allow the componenets to manipulate the data,
      //so create a new object copy all the data fromm the data store and then publish Object.assign 
      //takes 2 params the target you want to copy to and source-> only users data
      //this will be poplated in the side nav
      this._users.next(Object.assign({},this.dataStore).users);
     },
     error => {
       console.log("Failed to initializa the data");
     })
   }
}
