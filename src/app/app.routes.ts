import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CliqueComponent } from './clique/clique.component';
import { DecouverteComponent } from './decouverte/decouverte.component';
import { TrouveComponent } from './trouve/trouve.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { standalone: true } },
  { path: 'clique', component: CliqueComponent, data: { standalone: true } },
  { path: 'decouverte', component: DecouverteComponent, data: { standalone: true } },
  { path: 'trouve', component: TrouveComponent, data: { standalone: true } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
