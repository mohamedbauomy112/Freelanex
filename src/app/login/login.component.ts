import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from "../user.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  loginForm: FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });

  constructor(private router: Router, private _user: UserService) { }


  ngOnInit() {
  }

  login(){

    if(!this.loginForm.valid){
      alert("Invalid Form Login"); return;
    }

    this._user.login(JSON.stringify(this.loginForm.value)).subscribe(
      data=>{console.log(data); this.router.navigate(['/profile']);},
      error=>{console.log(error);alert("Email Or Password Incorrect..")}
    );
  }

}
