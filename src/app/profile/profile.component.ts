import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { ContractService } from "../service/contract.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // bar chart
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:string[] = ['','2018(Q1)', '2018(Q2)', '2018(Q3)', '2018(Q4)', '2019(Q1)', '2019(Q2)', '2019(Q3)'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [
    {data: [0,65, 59, 80, 81, 56, 55, 40], label: 'ICO TOKEN (SUPPLY & DEMAND)'},
  ];
// Doughnut chart
public doughnutChartLabels:string[] = ['Crowd sale', 'Team', 'Advisors','Project','Master nodes','Program'];
public doughnutChartData:number[] = [41, 18, 15, 10, 8, 8];
public doughnutChartType:string = 'doughnut';

  //////////////////
  progress="";
  token:String="";
  username:String="";
  address:String="";
  val:any='0';
  option:any='';
  coin='';
  tokenBalnce:string ='';
  etherBalance:string ='';
  public balance:number;
  constructor(private _router: Router, private _user: UserService,private cs: ContractService) {


    this.Reload();
    ///////////////////
    this._user.user().subscribe(// this is profile router and we get token from here
      data=>{this.addName(data);},
      error=>this._router.navigate(['/login'])
    );
////////////////////
    this._user.contract().subscribe(// why you get token this.token
      data => this.progressValue(data),
      error => console.log(error)
    );

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
   // events charts
  public chartClicked(e:any):void {
    console.log(e);
  }
  public chartHovered(e:any):void {
    console.log(e);
  }



////////////////////////
   addName(data){
    this.username=data.user;
    this.token=data.token;// get token from profile router
   // this.address=data.address;
   }
   //
   progressValue(data){
    this.progress = data.data.result;
   }
   //
   computeProgress(){ // not used
    console.log(this.token);
   }



  ngOnInit() {

  }

  logout(){
    this._user.logout().subscribe(
      data=>{console.log(data); this._router.navigate(['/login']);},
      error=>console.error(error)
    );
  }


  statue(){
    this._user.transactionInfo(this.token).subscribe(
      data=>{console.log(data);},
      error=>console.error(error)
    );
  }


  cointype(event:any){
    this.coin=event.target.value;
  }

  onKey(value){
    if(value>=0){
      // for example
      if(this.coin === "ETH"){
        this.val=value * 0.0001;
      }else if(this.coin==="BIT"){
        this.val=value * 0.000001;
      }else if(this.coin==="DOL"){
        this.val=value * 0.001;
      }

    }
    else{alert("Please enter positive number...")}

  }

  selectoption(event: any){
    this.option=event.target.value;
  }

  buy(){
    if(this.option== "Meta Mask"){
      // here code of meta mask
      console.log("Using Metamask Now");
      this.cs.buyToken(this.val);

       this.cs.TokenBalance().then(tok=>this.tokenBalnce=tok);
       this.cs.EtheruemBalance().then(ether=>this.etherBalance=ether);


    }
    else if(this.option=="Other Ways"){
      // here code of other way
      console.log("Using Other way now")

    }else if(this.option=="Select Now!"){
      alert("Please Select Type Of Buy Method !")
    }else{alert("Please Select Type Of Buy Method !")}
  }
}
