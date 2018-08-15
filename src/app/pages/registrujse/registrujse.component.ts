import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrujse',
  templateUrl: './registrujse.component.html',
  styleUrls: ['./registrujse.component.css']
})
export class RegistrujseComponent implements OnInit {

  public registracijaForm = new FormGroup({

    username: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    admin: new FormControl()
  });

  constructor(private _http: Http, private _router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this._router.navigateByUrl('');
    }
  }
  /**
   * Ova funkcija registruje novog korisnik au bazu
   */
  public registracija() {

    /**
     * Ovaj deo koda preuzima vrednosti koje korisnik unese u registracionu formu
     */
    const data =
      "username=" + this.registracijaForm.value.username + "&password=" + this.registracijaForm.value.password
      + "&firstName=" + this.registracijaForm.value.firstName + "&lastName=" + this.registracijaForm.value.lastName
      + "&admin=" + 0;
    /**
     * Ovaj deo koda postavlja hedere, kako bi mogli da prosledjumemo krenecijale putem URL-a
     */
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    /**
     * Ovaj deo koda salje prikupljene podatke backendu. To je ovaj URL ispod
     * data promenljiva sadrzi sve prikupljene podatke i poslace ih formatirane onako kako bi backend 
     * razumeo poruku
     */
    this._http
      .post('http://localhost/cvecara/registrujMe.php', data, {
        headers: headers
      })

      .subscribe(
        result => {
          const obj = JSON.parse(result['_body']);
          localStorage.setItem('token', obj.token);
          localStorage.removeItem('token');
          this._router.navigateByUrl('/prijavise');
        },
        err => {
          const obj = JSON.parse(err._body);
          const element = <HTMLElement>(
            document.getElementsByClassName('alert')[0]
          );
          element.style.display = 'block';
          element.innerHTML = obj.error.split('\\r\\n').join('<br/>').split('\"').join('');
        }
      );
  }
}


