import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RpsServiceService} from '../rps-service.service';
import {MLServiceService} from '../mlservice.service';
import {ImageServiceService} from '../image-service.service';
import config from '../../assets/config.json';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  currentHit = -1;
  currentAiHit = -1;
  hitIndex = 0;

  rockImage: string;
  paperImage: string;
  scissorsImage: string;
  questionImage: string;

  currentHumanHitImage: string;
  currentAiHitImage: string;

  progressBarValue: number;

  constructor(
    private rpsServiceService: RpsServiceService,
    private router: Router, private mlService: MLServiceService,
    private imageServiceService: ImageServiceService) {
  }

  ngOnInit() {
    this.rockImage = this.imageServiceService.rockImage;
    this.paperImage = this.imageServiceService.paperImage;
    this.scissorsImage = this.imageServiceService.scissorsImage;
    this.questionImage = this.imageServiceService.questionImage;
    this.currentHumanHitImage = this.imageServiceService.questionImage;
    this.setAIImage();
    this.startTimer();
  }

  startTimer() {
    this.progressBarValue = 0;
    const timerId = setInterval(() => this.progressBarValue += 5, 250);
    setTimeout(() => {

      // this.hitIndex++;
      // this.rpsServiceService.humanHits.push(this.currentHit);
      // this.rpsServiceService.aiHits.push(-1);
      // this.rpsServiceService.results.push('LOSE');
      // this.currentHumanHitImage = this.imageServiceService.questionImage;
      // this.currentAiHitImage = this.imageServiceService.questionImage;

      // this.sendHitToML(hit);
      //this.startTimer();

      clearInterval(timerId);

      // if (this.hitIndex === this.getMaxHits()) {
      //   this.router.navigateByUrl('/FinishGameComponent');
      // } else {
      //   if (this.hitIndex <= this.getMaxHits() - 1) {
      //     this.startTimer();
      //   }
      // }

    }, 5000);
  }

  getLeaderActiv(i: number): boolean {
    return this.rpsServiceService.getLeaderActiv(i);
  }

  getMaxHits(): number {
    return this.rpsServiceService.maxHits;
  }

  clickRock() {
    this.currentHumanHitImage = this.imageServiceService.rockImage;
    this.humanHit(0);
  }

  clickPaper() {
    this.currentHumanHitImage = this.imageServiceService.paperImage;
    this.humanHit(1);
  }

  clickScissors() {
    this.currentHumanHitImage = this.imageServiceService.scissorsImage;
    this.humanHit(2);
  }

  humanHit(hit: number) {
    this.hitIndex++;
    this.currentHit = hit;
    this.rpsServiceService.humanHits.push(hit);
    this.currentAiHitImage = this.imageServiceService.questionImage;
    this.sendHitToML(hit);
    this.startTimer();
  }

  saveResult() {
    this.rpsServiceService.results.push(this.getResult());
  }

  getResult(): string {
    if (this.currentHit === -1 || this.currentAiHit === -1) {
      return '';
    }

    if (this.currentHit === this.currentAiHit) {
      return 'DRAW';
    } else {
      if (this.currentHit === 0 && this.currentAiHit === 2 || this.currentHit === 1 && this.currentAiHit === 0
        || this.currentHit === 2 && this.currentAiHit === 1) {
        return 'WIN';
      } else {
        return 'LOSE';
      }
    }
  }

  getBackgroundColor(): string {
    if (this.getResult() === 'DRAW') {
      return 'yellow';
    } else if (this.getResult() === 'WIN') {
      return 'green';
    } else if (this.getResult() === 'LOSE') {
      return 'red';
    } else {
      return '';
    }
  }

  reset() {
    this.currentHit = -1;
    this.currentAiHit = -1;
    this.hitIndex = 0;
    this.rpsServiceService.reset();
  }

  nextPage() {
    this.sendToML();
    this.reset();
    this.router.navigateByUrl('/StartGameComponent');
  }

  sendToML(): void {
    var leaderIdCurrent: number;
    var leaderNameCurrent: string;
    if (config.mode === 'playing') {
      leaderIdCurrent = this.rpsServiceService.activeLeaderIndex;
      leaderNameCurrent = this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name;
    } else {
      leaderIdCurrent = -1;
      leaderNameCurrent = this.rpsServiceService.trainerName;
    }

    this.mlService.send2(
      {
        leaderId: leaderIdCurrent,
        leaderName: leaderNameCurrent,
        status: 'end',
        hit: this.currentHit,
        mode: config.mode
      }
    ).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  setAIImage() {
    if (this.currentAiHit === 0) {
      this.currentAiHitImage = this.imageServiceService.rockImage;
    } else if (this.currentAiHit === 1) {
      this.currentAiHitImage = this.imageServiceService.paperImage;
    } else if (this.currentAiHit === 2) {
      this.currentAiHitImage = this.imageServiceService.scissorsImage;
    } else {
      this.currentAiHitImage = this.imageServiceService.questionImage;
    }
  }

  sendHitToML(pHit: number): void {
    var leaderIdCurrent: number;
    var leaderNameCurrent: string;
    if (config.mode === 'playing') {
      leaderIdCurrent = this.rpsServiceService.activeLeaderIndex;
      leaderNameCurrent = this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name;
    } else {
      leaderIdCurrent = -1;
      leaderNameCurrent = this.rpsServiceService.trainerName;
    }

    this.mlService.send2(
      {
        leaderId: leaderIdCurrent,
        leaderName: leaderNameCurrent,
        status: 'playing',
        hit: pHit,
        mode: config.mode
      }
    ).subscribe(
      data => {
        console.log(data);
        this.currentAiHit = data.hit;
        this.rpsServiceService.aiHits.push(data.hit);

        this.setAIImage();
        this.saveResult();

        // check if the game finish:
        if (this.hitIndex === this.getMaxHits()) {
          this.router.navigateByUrl('/FinishGameComponent');
        }
      }
    );
  }

  getResultText(): string {
    if (this.getResult() === 'DRAW') {
      return 'Draw';
    } else if (this.getResult() === 'WIN') {
      return 'You win!';
    } else if (this.getResult() === 'LOSE') {
      return 'You lost.';
    } else {
      return '';
    }
  }
}
