import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'; 
//import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-svitipovicveca',
  templateUrl: './svitipovicveca.component.html',
  styleUrls: ['./svitipovicveca.component.css']
})
export class SvitipovicvecaComponent implements OnInit {
  er:any[];

  private cvet_tipovi : any[]; 
 // private router: Router;
  constructor(private _http: Http, private _router: Router) {
  }


  ngOnInit() {
    this._getCvetTip();
  }

  private _getCvetTip() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this._http.get('http://localhost/cvecara/getcvettip.php', {headers: headers}).subscribe((data): any => {
          this.cvet_tipovi = JSON.parse(data['_body']);
        },
        err => {
          this._router.navigateByUrl('');
        }
      );
  }

  public removeCvetTip(event: Event, item: Number) { 
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
     this._http.get('http://localhost/cvecara/deletecvettip.php?id='+item, {headers:headers})  .subscribe( data => {
       
        this.er = JSON.parse(data["_body"]).error; 

    
       if(data["_body"].indexOf("error") === -1){
         
        event.srcElement.parentElement.parentElement.remove();
          }else{
         //   alert(this.er);
            alert(data["_body"]);                                 
        }
        //data => this.postResponse = data;
      }); 
    }



    public updateCvetTip(item: Number){

      this._router.navigate(['../updatecvettip',item]);
        
      }
}
