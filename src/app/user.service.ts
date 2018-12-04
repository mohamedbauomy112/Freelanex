import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

var token='';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  register(body: any){
    return this._http.post('http://127.0.0.1:3000/users/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body:any){
    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  user(){
    return this._http.get('http://127.0.0.1:3000/users/profile',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  logout(){
    return this._http.get('http://127.0.0.1:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
forget(body:any){
return this._http.post('http://127.0.0.1:3000/users/forgot',body,{
  observe:'body',
  withCredentials:true,
  headers:new HttpHeaders().append('Content-Type','application/json')
});
}
  statue(){
    return this._http.get('http://127.0.0.1:3001/api/status',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    }) }

    transactionInfo(token){

      return this._http.get('http://127.0.0.1:3001/api/tx/0x2a8e55ac5595d94f66cb4742297fa5acda0455fcdbfc5797cc6d6720c8697af8',{// chek now
        observe:'body',
      withCredentials:true,
      params: { token: token},
      //can we get token here and append it with hheader or req body
      headers:new HttpHeaders().append('Content-Type','X-Access-Token,X-Key') // what contain this X-Access-Token its heders content type  we use this here becuse our api allow X-Access-Token type headers requst only
      })
    }

    contract(){

      return this._http.get('http://127.0.0.1:3001/api/contract/CrowdSaleABI/0x9bab8c36f9d8B7DE7e18e82a80C8d9bF8f5F228f/call/goal',{
        observe:'body',
        withCredentials:true,
        headers:new HttpHeaders().append('Content-Type','application/json')
      //  headers:new HttpHeaders().append('Content-Type','X-Access-Token,X-Key')// set these header to nomal

      }) ;
     }

     addressBalance(address){
       return this._http.get('http://127.0.0.1:3001/api/address/0x57ba24167eac31D4cB8020E2ADB7FbF3716a0357/balance',{
        observe:'body',
        withCredentials:true,
        /* params: { address: address}, */
        headers:new HttpHeaders().append('Content-Type','application/json')
       });
     }
}
