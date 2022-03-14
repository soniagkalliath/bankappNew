import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  depositForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  withdrawForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  user:any
  acno:any
  lDate:any
  

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    if(localStorage.getItem("currentUname")){
      this.user = JSON.parse(localStorage.getItem("currentUname")||'')
    }
  
    this.lDate = new Date()
    
   }

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("Please Log In")
      this.router.navigateByUrl("")

    } 
    
  }

deposit(){
 
  var acno = this.depositForm.value.acno
  var pswd = this.depositForm.value.pswd
  var amount = this.depositForm.value.amount

  if(this.depositForm.valid){
    //asynchronous
     this.ds.deposit(acno,pswd,amount)
  .subscribe((result:any)=>{
    if(result){
      alert(result.message)
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

withdraw(){
  var acno = this.withdrawForm.value.acno
  var pswd = this.withdrawForm.value.pswd
  var amount = this.withdrawForm.value.amount

  if(this.withdrawForm.valid){
    //asynchronous
    this.ds.withdraw(acno,pswd,amount)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
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

logout(){
  localStorage.removeItem("currrentAcno")
 localStorage.removeItem("currentUname")
  localStorage.removeItem("token")
  this.router.navigateByUrl("")
}


deleteAcc(){
   
  this.acno = JSON.parse(localStorage.getItem("currrentAcno")||'')
}

deleteFromParent(event:any){
console.log(event)
  //asynchronous
  this.ds.deleteAccount(event)
  .subscribe((result:any)=>{
    if(result){
      alert(result.message)
      localStorage.removeItem("currrentAcno")
      localStorage.removeItem("currentUname")
       localStorage.removeItem("token")
      this.router.navigateByUrl("")
    }
  },
  (result)=>{
    alert(result.error.message)
  }
  )
}

cancelFromParent(){
  this.acno=""
}
}
