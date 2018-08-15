import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {
  public cvece: any[];
  constructor(private _http: Http) {
    this._http.get('http://localhost/cvecara/getCvece.php').subscribe((data) => {
      this.cvece = JSON.parse(data['_body']).cvece;
    });
  }
  ngOnInit() {
    
  }

}
