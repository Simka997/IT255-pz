import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { PocetnaComponent } from './pages/pocetna/pocetna.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LokacijaComponent } from './pages/lokacija/lokacija.component';
import { OnamaComponent } from './pages/onama/onama.component';
import { DostavaComponent } from './pages/dostava/dostava.component';
import { RegistrujseComponent } from './pages/registrujse/registrujse.component';
import {PretragaComponent } from './pages/pretraga/pretraga.component';
import { PretragaPipe } from './pipes/pretraga.pipe';
import { UsersComponent } from './pages/users/users.component';
import { PrijaviseComponent } from './pages/prijavise/prijavise.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { DodajcvetComponent } from './pages/dodajcvet/dodajcvet.component';
import { SvitipovicvecaComponent } from './pages/svitipovicveca/svitipovicveca.component';
import { UpdatecvettipComponent } from './pages/updatecvettip/updatecvettip.component';
@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    LokacijaComponent,
    OnamaComponent,
    DostavaComponent,
    RegistrujseComponent,
    PretragaComponent,
    PretragaPipe,
    UsersComponent,
    PrijaviseComponent,
    NavbarComponent,
    DodajcvetComponent,
    SvitipovicvecaComponent,
    UpdatecvettipComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
