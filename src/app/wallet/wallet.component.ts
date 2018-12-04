import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { ContractService } from "../service/contract.service";
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  tokenBalnce:string ='';
  etherBalance:string ='';
  username:String="";
  address:String="";

  constructor(private _router: Router, private _user: UserService,private cs: ContractService) {

    this.Reload();

    this._user.user().subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    );

    this.addreessBalanceInfo();

   // this.cs.TokenBalance().then(tok=>this.tokenBalnce=tok);
  //this.cs.EtheruemBalance().then(ether=>this.etherBalance=ether);
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

  addName(data){
    this.username=data.user;
    this.address = data.address;
   }
   getBalanceOfAddress(data){
    this.etherBalance = data.data.balance;
   }

   addreessBalanceInfo(){

        this._user.addressBalance(this.address).subscribe(
          data=>this.getBalanceOfAddress(data),
          error=>console.log(error)
        );
   }


  ngOnInit() {
  }

  logout(){
    this._user.logout().subscribe(
      data=>{console.log(data); this._router.navigate(['/login']);},
      error=>console.error(error)
    );
  }



}
