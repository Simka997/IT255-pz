import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers} from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dodajcvet',
  templateUrl: './dodajcvet.component.html',
  styleUrls: ['./dodajcvet.component.css']
})
export class DodajcvetComponent implements OnInit {

  public cvet_tipovi: any[];

  public dodajCvetForm= new FormGroup({
    sifra: new FormControl(),
    naziv: new FormControl(),
    cena: new FormControl(),
    opis: new FormControl(),
    cvet_tip: new FormControl()
  });

  public addCvetTipForm = new FormGroup({
    tip: new FormControl()
  });

  constructor(private _http: Http, private _router: Router) { }
  


  ngOnInit() {
    this._getCvetTip();
  }



  private _getCvetTip() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));
    this._http.get('http://localhost/cvecara/getcvettip.php', {headers: headers}).subscribe((data): any => {
          this.cvet_tipovi = JSON.parse(data['_body']).cvet_tipovi;
        },
        err => {
          this._router.navigateByUrl('');
        }
      );
  }


  public dodajCvet() {
    var podaci = "sifra="+this.dodajCvetForm.value.sifra+"&naziv="+this.dodajCvetForm.value.naziv+
    "&cena="+this.dodajCvetForm.value.cena+"&opis="+this.dodajCvetForm.value.opis+"&cvet_tip_id="+this.dodajCvetForm.value.cvet_tip;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append("token",localStorage.getItem("token"));
    this._http.post('http://localhost/cvecara/addCveta.php',podaci, { headers:headers }).subscribe( data => {
      
          if(data["_body"].indexOf("error") === -1){
            alert("Uspesno dodavanje cveta");
            this._router.navigateByUrl('/');
          }else{
            alert("Neuspesno dodavanje cveta");
          }
           console.log(data["_body"]);
        }
      );


  }


  public addCvetTip() {
    const data = 'tip=' + this.addCvetTipForm.value.tip;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));

    this._http.post('http://localhost/cvecara/addcvettip.php', data, { headers: headers}).subscribe((result) => {
      this._router.navigateByUrl('svitipovicveca');
     
   },
    err => {
      const obj = JSON.parse(err._body);
      const element  = <HTMLElement> document.getElementsByClassName('alert')[0];
      element.style.display = 'block';
      element.innerHTML = obj.error.split('\\r\\n').join('<br/>').split('\"').join('');
    }
  );

 }

 
}
