import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim="Your Perfect Banking Partner!!!!!"

  accno="Account Number please!!!!"

 

  loginForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
 

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }


  login(){
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd

    if(this.loginForm.valid){
      //asynchronous
      this.ds.login(acno,pswd)
      .subscribe((result:any)=>{
        if(result){
          localStorage.setItem("currentUname",JSON.stringify(result.currentUname))
          localStorage.setItem("currrentAcno",JSON.stringify(result.currrentAcno))
          localStorage.setItem("token",JSON.stringify(result.token))
          alert(result.message)
          this.router.navigateByUrl("dashboard")
        }
      },
      (result)=>{
        alert(result.error.message)
      }
      )

      
    }
    else{
      alert("Invalid Form")
    }
   
      }

  //using template referencing variable

//   login(a:any,p:any){
   
// console.log(a.value)
//     var acno = a.value
//     var pswd = p.value

//     let db = this.database

//     if(acno in db){

//       if(pswd == db[acno]["password"]){

//         alert("Login Success!!!!")
//       }
//       else{
//         alert("Invalid Password!!!!")
//       }
//     }
//     else{
//       alert("Invalid Account Number!!!!")
//     }

//   }


}
