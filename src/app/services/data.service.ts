import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers : new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})



export class DataService {

currentUname:any

currrentAcno:any

  database:any={
    1000:{acno:1000,uname:"Neer",password:"1000",balance:5000,transaction:[]},
    1001:{acno:1001,uname:"Laisha",password:"1001",balance:5000,transaction:[]},
    1002:{acno:1002,uname:"Vyom",password:"1002",balance:5000,transaction:[]}
  }


  constructor(private http:HttpClient) { 
  //  this.getDetails()
  }

//save details in loacal storage

saveDetails(){
  if(this.database){
    localStorage.setItem("database",JSON.stringify(this.database))
  }

  if(this.currentUname){
    localStorage.setItem("currentUname",JSON.stringify(this.currentUname))
  }

  if(this.currrentAcno){
    localStorage.setItem("currentAcno",JSON.stringify(this.currrentAcno))
  }
}

//get details in loacal storage

getDetails(){

  if(localStorage.getItem("database")){

    this.database = JSON.parse(localStorage.getItem("database") || "")
  }

  if(localStorage.getItem("currentUname")){
    this.currentUname = JSON.parse(localStorage.getItem("currentUname") || "")
  }
}

//getTransaction array

getTransaction(acno:any){

  const data={
    acno
  }
//Transaction API
return this.http.post('http://localhost:3000/transaction',data,this.getOption())

}

//deleteAccount

deleteAccount(acno:any){
  //deleteAPI
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
}




  //register 
 register(acno:any,uname:any,password:any){

  const data={
    acno,
    uname,
    password
  }
  //Register API

 return this.http.post("http://localhost:3000/register",data)
 }


 //login

 login(acno:any,password:any){

  const data={
    acno,
    password
  }
   
  //login API
  return this.http.post("http://localhost:3000/login",data)
}

//deposit

deposit(acno:any,password:any,amt:any){

  const data={
    acno,
    password,
    amt
  }
  //deposit API
  return this.http.post("http://localhost:3000/deposit",data,this.getOption())
}

//to add token inside http header
getOption(){
  const token = JSON.parse(localStorage.getItem("token")||'')

  let headers = new HttpHeaders()

  if(token){
    headers = headers.append('x-access-token',token)
    options.headers = headers
  }
return options
}


//withdraw

withdraw(acno:any,password:any,amt:any){

  const data={
    acno,
    password,
    amt
  }
  //withdraw API
  return this.http.post("http://localhost:3000/withdraw",data,this.getOption())
}

}
