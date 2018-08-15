import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http} from '@angular/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  korisnici: any = [];

  constructor(private _http: Http, private router: Router) {
  }

  ngOnInit() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('token', localStorage.getItem('token'));

    this._http.get('http://localhost/cvecara/getUsers.php', {headers: headers}).subscribe(
      data => {
        this.korisnici = JSON.parse(data['_body']).users;
      },
      error => {
        console.log('Error korisnici.component.ts: \n' + error.toString());
      }
    );
  }
}
