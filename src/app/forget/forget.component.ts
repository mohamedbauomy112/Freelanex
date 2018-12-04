import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from "../user.service";

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  resetForm: FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required])
  });

  constructor(private router: Router, private _user: UserService) {
    this.Reload();
   }
  Reload(){
    if( window.localStorage )
    {
      if( !localStorage.getItem( 'firstLoad' ) )
      {
        localStorage[ 'firstLoad' ] = true;
        window.location.reload();
      }

      else
        localStorage.removeItem( 'firstLoad' );
    }

   }
  ngOnInit() {
  }

  forget(){
    if(!this.resetForm.valid){
      alert("Invalid Email"); return;
    }

    this._user.forget(JSON.stringify(this.resetForm.value)).subscribe(
      data=>console.log(data),
      error=>console.log(error)
    );
  }

}
