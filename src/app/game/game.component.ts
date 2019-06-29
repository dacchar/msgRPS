import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RpsServiceService} from '../rps-service.service';
import {MLServiceService} from '../mlservice.service';
import {ImageServiceService} from '../image-service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  currentHit: number = -1;
  currentAiHit: number = -1;
  hitIndex: number = 0;

  rockImage: string;
  paperImage: string;
  scissorsImage: string;
  questionImage: string;

  currentHumanHitImage: any;
  currentAiHitImage: any;

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
      clearInterval(timerId);
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

  /*
  increaseHit() {
    this.hitIndex++;
    this.aiHit();
    this.saveResult();

    // check if the game finish:
    if (this.hitIndex === this.getMaxHits()) {
      this.router.navigateByUrl('/FinishGameComponent');
    }
  }
   */

  humanHit(hit: number) {
    this.hitIndex++;
    this.currentHit = hit;
    this.rpsServiceService.humanHits.push(hit);
    this.currentAiHitImage = this.imageServiceService.questionImage;
    this.sendHitToML(hit);
    this.startTimer();


    // this.increaseHit();

    /*
    this.saveResult();

    // check if the game finish:
    if (this.hitIndex === this.getMaxHits()) {
      this.router.navigateByUrl('/FinishGameComponent');
    }
     */
  }

  /*
  async getAIHit2(): number {
    let createdEmployee = await this.mlService.getAIHit2();
    console.log('Created Employee: ' + createdEmployee.hit);

    var res = createdEmployee.hit;

    return res;
  }

   */

  aiHit() {
    /*
    let sss = this.mlService.getAIHit();
    var sss2 = this.mlService.hit;

    this.currentAiHit = this.getAIHit2();

     */


    this.currentAiHit = 1;


    this.rpsServiceService.aiHits.push(this.currentAiHit);
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

    /*
    if(this.results[i]==='WIN') {
      return 'green';
    } else if(this.results[i]==='LOSE') {
      return 'red';
    } else {
      return 'yellow';
    }

     */
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
    this.mlService.send2(
      {
        leaderId: this.rpsServiceService.activeLeaderIndex,
        leaderName: this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name,
        status: 'end',
        hit: this.currentHit
      }
    ).subscribe(
      data => {
        console.log(data);
        /*
        this.status = status;
         */
      }
    );

    /*
    this.mlService.send(
      {
        leaderId: this.rpsServiceService.activeLeaderIndex,
        leaderName: this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name,
        status: 'end',
        hit: this.currentHit
      }
    );
     */
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
    this.mlService.send2(
      {
        leaderId: this.rpsServiceService.activeLeaderIndex,
        leaderName: this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name,
        status: 'playing',
        hit: pHit
      }
    ).subscribe(
      data => {
        console.log(data);
        /*
        this.status = status;
         */
        this.currentAiHit = data.hit;
        console.log('currentAiHit: ' + data.hit);

        this.setAIImage();
        this.saveResult();

        // check if the game finish:
        if (this.hitIndex === this.getMaxHits()) {
          this.router.navigateByUrl('/FinishGameComponent');
        }
      }
    );


    /*
    this.mlService.send(
      {
        leaderId: this.rpsServiceService.activeLeaderIndex,
        leaderName: this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name,
        status: 'playing',
        hit: hit
      }
    );

     */
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
