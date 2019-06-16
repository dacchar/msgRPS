import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StartGameComponent } from './start-game/start-game.component';
import { GameComponent } from './game/game.component';
import { FinishGameComponent } from './finish-game/finish-game.component';

@NgModule({
  declarations: [
    AppComponent,
    StartGameComponent,
    GameComponent,
    FinishGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
