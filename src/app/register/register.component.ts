import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from "../user.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    username:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required]),
    cpass:new FormControl(null,[Validators.required]),

  });

  constructor(private _router: Router, private _userService: UserService) { }


  ngOnInit() {
  }

  register(){
    if(!this.registerForm.valid/*  || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value) */){
      alert("Invalid form please check the form and try another"); return;
    }
    if(this.registerForm.controls.password.value != this.registerForm.controls.cpass.value){
      alert("The password and Confirm password are diffrents");return;
    }

    this._userService.register(JSON.stringify(this.registerForm.value)).subscribe(
      data=>{console.log(data); this._router.navigate(['/login']);},
      error=>{console.log(error); alert('The email address is already taken!');}
    );
    console.log(JSON.stringify(this.registerForm.value));
  }

}
