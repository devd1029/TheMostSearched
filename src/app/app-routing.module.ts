import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {path:'', component: StartComponent},
  {path:'start', component: StartComponent},
  {path:'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
