import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartGameComponent} from './start-game/start-game.component';
import {GameComponent} from './game/game.component';
import {FinishGameComponent} from './finish-game/finish-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/StartGameComponent', pathMatch: 'full' },
  { path: 'StartGameComponent', component: StartGameComponent},
  { path: 'game', component: GameComponent},
  { path: 'FinishGameComponent', component: FinishGameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
