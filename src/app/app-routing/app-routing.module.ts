import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from '../pages/pocetna/pocetna.component';
import { LokacijaComponent } from '../pages/lokacija/lokacija.component';
import { OnamaComponent } from '../pages/onama/onama.component';
import { DostavaComponent } from '../pages/dostava/dostava.component';
import { PretragaComponent } from '../pages/pretraga/pretraga.component';
import { RegistrujseComponent}  from '../pages/registrujse/registrujse.component';
import {UsersComponent}  from '../pages/users/users.component';
import { PrijaviseComponent } from '../pages/prijavise/prijavise.component';
import { NavbarComponent } from '../pages/navbar/navbar.component';
import { DodajcvetComponent } from '../pages/dodajcvet/dodajcvet.component'
import { SvitipovicvecaComponent } from '../pages/svitipovicveca/svitipovicveca.component';
import{UpdatecvettipComponent} from "../pages/updatecvettip/updatecvettip.component";


const routes: Routes = [
  { path: '', redirectTo: 'pocetna', pathMatch: 'full'}, // redirekcija na pocetnu stranicu
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'lokacija', component: LokacijaComponent },
  { path: 'o nama', component: OnamaComponent },
  { path: 'dostava', component: DostavaComponent },
  { path: 'pretraga', component: PretragaComponent },  
  { path: 'registrujse', component: RegistrujseComponent },
  { path: 'users', component: UsersComponent },
  { path: 'prijavise', component: PrijaviseComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'dodajcvet', component: DodajcvetComponent },
  { path: 'svitipovicveca', component: SvitipovicvecaComponent },
  { path: 'updatecvettip', component: UpdatecvettipComponent }

  
];
@NgModule({
 imports: [
 RouterModule.forRoot(routes)
 ],
 exports: [
 RouterModule
 ],
 declarations: []
})
export class AppRoutingModule { }