import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Headers, Http} from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-prijavise',
  templateUrl: './prijavise.component.html',
  styleUrls: ['./prijavise.component.css']
})
export class PrijaviseComponent implements OnInit {

  
  /**
   * Preuzimanje podatak iz forma za prijavu
   */
  public loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private _http: Http, private _router: Router) {
  }

  /**
   * Proverava da li je postavljen token u localStorage, odnosno, proverava da li je korisnik ulogovan
   */
  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this._router.navigateByUrl('');
    }
  }

  /**
   * Manje-vise je ista stvar kao sa registracijom, da ne kucam sve
   */
  
  public prijaviMe() {

    let data = "username="+this.loginForm.value.username+"&password="+this.loginForm.value.password;

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    this._http.post('http://localhost/cvecara/prijaviMe.php', data, {headers:headers}).subscribe( data => {
        let obj = JSON.parse(data["_body"]);
      
        localStorage.setItem('token', obj.token);
        localStorage.setItem('admin', obj.admin);
        location.reload();
        this._router.navigate(['/']);
     },
      err => {
        let obj = JSON.parse(err._body);
        let element  = <HTMLElement> document.getElementsByClassName("alert")[0];
        element.style.display = "block";
        element.innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
      }
    );


  }
}


