import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule } from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms'
import {MatInputModule} from '@angular/material/input';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StartGameComponent } from './start-game/start-game.component';
import { GameComponent } from './game/game.component';
import { FinishGameComponent } from './finish-game/finish-game.component';
import { ErrorGameComponent } from './error-game/error-game.component';

@NgModule({
  declarations: [
    AppComponent,
    StartGameComponent,
    GameComponent,
    FinishGameComponent,
    ErrorGameComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatInputModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
