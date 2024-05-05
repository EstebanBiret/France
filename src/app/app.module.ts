import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { CliqueComponent } from './clique/clique.component';
import { DecouverteComponent } from './decouverte/decouverte.component';
import { TrouveComponent } from './trouve/trouve.component';

@NgModule({
  declarations: [
    AppComponent,
    CliqueComponent,
    DecouverteComponent,
    TrouveComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
