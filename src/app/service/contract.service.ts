import { Injectable } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";
//import * as Web3 from 'web3/src/index';
declare let window: any;
declare let require: any;
let tokenAbi = require('./tokenContract.json');
let crowedAbi = require('./crowdsaleApi.json');
let Web3=require('web3');
let BN = require('bn.js');
let bigNumber=require('big-number');
@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public  tokenBalance;
  public  ethBalance;
  private _account: string = null;
  private _web3: any;
  private contractabi: any;
  private contract:any;
  private tokenIns:any;
  private token: any;
  private crowdsaleIns:any;
  private crowdSaleAddress: string = "0x9bab8c36f9d8B7DE7e18e82a80C8d9bF8f5F228f"; //crowdSale address
  private tokenaddres: string = "0x8222d094a6a04b099441b6ebd425f805d5dc462a"; // token address

  constructor() {

    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(window.web3.currentProvider);

    } else {
      console.warn('Please use a dapp browser like mist or MetaMask plugin for chrome');
    }



   this.contract =new this._web3.eth.Contract(crowedAbi,this.crowdSaleAddress);

   this.token = new this._web3.eth.Contract(tokenAbi,this.tokenaddres);

   }




   private async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts.');
            return;
          }

          if (accs.length === 0) {
            alert(
              'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
            );
            return;
          }else{resolve(accs[0]);console.log(accs[0]);}


        })
      }) as string;

      this._web3.eth.defaultAccount = this._account;
    }
    return Promise.resolve(this._account);
  }


  ////

  public async getUserBalance(): Promise<number> {

    //let _web3 = this._web3;
    let account = await this.getAccount();
    var balance;
    balance=await this._web3.eth.getBalance(account);
    var amount = this._web3.utils.fromWei(balance.toString(), 'ether'); // this work ! yes


    return new Promise((resolve, reject) => {
      console.log(amount+ " ether");
    }) as Promise<number>;
  }

  // buy token with metamask
  public async buyToken(amountinether): Promise<string>{

    if (this._web3.version.network !== '4') {
      alert('Please connect to the Rinkeby network');
    }

    let account = await this.getAccount();
    var balance;
    balance=await this._web3.eth.getBalance(account);
    var amountinwei =  this._web3.utils.toWei(amountinether.toString(), 'ether');// W not w right?

    // check usesr input value enough for transaction if not give errom msg
    // if enough send transaction...
    if(balance<amountinwei){
      //sorry not sufficiant funds for transaction
    }
    else{
      const res= await new Promise((resolve, reject) => {
        this._web3.eth.sendTransaction({
          to:  this.crowdSaleAddress ,
          value: amountinwei,
          from: account
        }, (error, hash) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(hash);
        })
      }) as string ;
    //return here
    return res;
  }

    }

    // compute token balance
    public async TokenBalance(): Promise<string>{
      let account = await this.getAccount();

    this.tokenBalance= await this.token.methods.balanceOf(account).call();
    return this.tokenBalance as string;
    }

    // compute etheruem balance
    public async EtheruemBalance(): Promise<string>{
      let account = await this.getAccount();
      const balanceWei=await this._web3.eth.getBalance(account);

      this.ethBalance = this._web3.utils.fromWei(balanceWei.toString()) ;
     console.log(this.ethBalance);
     return this.ethBalance as string;

    }


}
