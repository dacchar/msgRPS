import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import {RpsServiceService} from '../rps-service.service';
import {MLServiceService} from '../mlservice.service';
import {ImageServiceService} from '../image-service.service';
import {GamepadServiceService} from '../gamepad-service.service';
import config from '../../assets/config.json';

enum GameProcessStatus {
  WaitingForHumanHit = 1,
  WaitingForAIHit
}

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

  progressBarValue = 0;
  intervalBs: any;
  // startCount = 0;

  intervalTimeRequest: any;
  intervalGamePad: any;

  time = 'Wait please...';

  gamepadHit = {
    timestamp: -1,
    hit: 0
  };

  backgroundColor: string;

  gameProcessStatus: GameProcessStatus = GameProcessStatus.WaitingForHumanHit;

  // @ViewChild(BaseChartDirective)
  // public chart: BaseChartDirective;
  //
  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  //   scales : {
  //     yAxes: [{
  //       ticks: {
  //         beginAtZero: true,
  //         stepSize: config.gameLength / 2,
  //         max : config.gameLength,
  //       }
  //     }]
  //   }
  // };
  // public barChartLabels: Label[] = ['Intermediary result'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = [];
  // public chartColors = [
  //   { backgroundColor: '#008800' },
  //   { backgroundColor: '#fcfc40' },
  //   { backgroundColor: '#ff0000' }
  // ];
  //
  // public barChartData: ChartDataSets[] = [
  //   { data: [0], label: 'Win' },
  //   { data: [0], label: 'Draw' },
  //   { data: [0], label: 'Lost' }
  // ];



  // Pie

   @ViewChild(BaseChartDirective)
  public pieChart: BaseChartDirective;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    },
    plugins: {
      datalabels: {
        // formatter: (value, ctx) => {
        //   const label = ctx.chart.data.labels[ctx.dataIndex];
        //   return label;
        // },
      },
    }
  };
  public pieChartLabels: Label[] = ['?', 'Win', 'Draw', 'Lost'];
  public pieChartData: number[] = [config.gameLength, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['lightgray', 'lightgreen', 'yellow', 'red'],
    },
  ];
  // // pie end


  constructor(
    private rpsServiceService: RpsServiceService,
    private router: Router, private mlService: MLServiceService,
    private imageServiceService: ImageServiceService,
    private gamepadServiceService: GamepadServiceService
  ) {
  }

  ngOnInit() {
    this.rockImage = this.imageServiceService.rockImage;
    this.paperImage = this.imageServiceService.paperImage;
    this.scissorsImage = this.imageServiceService.scissorsImage;
    this.questionImage = this.imageServiceService.questionImage;
    this.currentHumanHitImage = this.imageServiceService.questionImage;
    this.setAIImage();
    // this.startTimer();

    this.clearGamePad();
    this.startInterval();

    // this.getTime();
    // this.startTimeRequest();

    // this.gamepadServiceService.getJSON().subscribe(data => {
    //   console.log('Data:');
    //   console.log('Hit: ' + data.hit);
    // });

    // this.gamepadServiceService.getGamepadHit().subscribe(data => {
    //   console.log('Type Data:');
    //   console.log('Timestamp: ' + data.timestamp);
    //   console.log('Hit: ' + data.hit);
    // });

    if (config.gamepad.on) {
      this.startIntervalGamePad();
    }
  }

  ngOnDestroy() {
   this.stopInterval();
   // this.stopTimeRequest();

   if (config.gamepad.on) {
     this.stopIntervalGamePad();
   }
  }

  startInterval() {
    // this.start_count += 1;
    // if(this.start_count == 1){
    this.intervalBs = setInterval( () => {
      // console.log( 'progressBarValue: ' + this.progressBarValue );
      this.progressBarValue += 5;
      if ( this.progressBarValue === 100 ) {
        // console.log( 'Stop..' );
        clearInterval(this.intervalBs);

        // do logic:
        // this.hitIndex++;
        // this.rpsServiceService.humanHits.push(-1);
        // this.rpsServiceService.aiHits.push(-1);
        // this.rpsServiceService.results.push('LOSE');
        // this.currentHumanHitImage = this.imageServiceService.questionImage;
        // this.currentAiHitImage = this.imageServiceService.questionImage;

        // this.startInterval();
      }
    }, 250);
    // }
  }

  stopInterval() {
    console.log( 'stopInterval called...' );
    if (this.intervalBs) {
      // this.startCount = 0;
      // this.activeIndex = 0;
      this.progressBarValue = 0;

      clearInterval(this.intervalBs);
    }
  }

  startTimeRequest() {
    this.intervalTimeRequest = setInterval( () => {
      console.log( 'Time requested...' );
      this.getTime();
    }, 60000);
  }

  stopTimeRequest() {
    console.log( 'Stop time request...' );
    if (this.intervalTimeRequest) {
      clearInterval(this.intervalTimeRequest);
    }
  }

  clearGamePad() {
    this.gamepadServiceService.clearGamepad().subscribe(gamepadHit => {
      console.log('clear gamepad.');
    });
  }

  startIntervalGamePad() {
    // this.start_count += 1;
    // if(this.start_count == 1){
    this.intervalGamePad = setInterval( () => {

      if (this.gameProcessStatus === GameProcessStatus.WaitingForHumanHit) {  // filter quick human clicks
        this.gamepadServiceService.getGamepadHit().subscribe(gamepadHit => {
            // console.log('Gamepad:');
            // console.log('Timestamp: ' + gamepadHit.timestamp);
            // console.log('Hit: ' + gamepadHit.hit);
            if (this.gamepadHit.timestamp !== gamepadHit.timestamp) {
              this.gamepadHit = gamepadHit;   // save last game pad hit

              switch (gamepadHit.hit) {
                case 0:
                  this.clickRock();
                  break;
                case 1:
                  this.clickPaper();
                  break;
                case 2:
                  this.clickScissors();
                  break;
              }
            }
          }
        );  // subscribe
      }
    }, config.gamepad.requestFrequence);
    // }
  }

  stopIntervalGamePad() {
    console.log( 'stopInterval called...' );
    if (this.intervalGamePad) {
      clearInterval(this.intervalGamePad);
    }
  }


  /*
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

   */

  getLeaderActiv(i: number): boolean {
    return this.rpsServiceService.getLeaderActiv(i);
  }

  getMaxHits(): number {
    return this.rpsServiceService.maxHits;
  }

  clickRock() {
    if (this.gameProcessStatus === GameProcessStatus.WaitingForHumanHit) {  // filter quick human clicks
      this.currentHumanHitImage = this.imageServiceService.rockImage;
      this.humanHit(0);
    }
  }

  clickPaper() {
    if (this.gameProcessStatus === GameProcessStatus.WaitingForHumanHit) {  // filter quick human clicks
      this.currentHumanHitImage = this.imageServiceService.paperImage;
      this.humanHit(1);
    }
  }

  clickScissors() {
    if (this.gameProcessStatus === GameProcessStatus.WaitingForHumanHit) {  // filter quick human clicks
      this.currentHumanHitImage = this.imageServiceService.scissorsImage;
      this.humanHit(2);
    }
  }

  humanHit(hit: number) {
    this.backgroundColor = 'white';
    this.gameProcessStatus = GameProcessStatus.WaitingForAIHit;
    this.hitIndex++;
    this.currentHit = hit;
    this.rpsServiceService.humanHits.push(hit);
    this.currentAiHitImage = this.imageServiceService.questionImage;
    this.sendHitToML(hit);
    // this.startTimer();
    this.startInterval();
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

  setBackgroundColor() {
    if (this.getResult() === 'DRAW') {
      this.backgroundColor = 'yellow';
    } else if (this.getResult() === 'WIN') {
      this.backgroundColor =  'green';
    } else if (this.getResult() === 'LOSE') {
      this.backgroundColor = 'red';
    } else {
      this.backgroundColor = 'white';
    }
  }

  // getBackgroundColor(): string {
  //   if (this.getResult() === 'DRAW') {
  //     return 'yellow';
  //   } else if (this.getResult() === 'WIN') {
  //     return 'green';
  //   } else if (this.getResult() === 'LOSE') {
  //     return 'red';
  //   } else {
  //     return '';
  //   }
  // }

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
    let leaderIdCurrent: number;
    let leaderNameCurrent: string;
    if (config.mode === 'playing') {
      leaderIdCurrent = this.rpsServiceService.activeLeaderIndex;
      leaderNameCurrent = this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name;
    } else {
      leaderIdCurrent = -1;
      leaderNameCurrent = this.rpsServiceService.trainerName;
    }

    this.mlService.send2(
      {
        gameId: this.rpsServiceService.gameId,
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
    let leaderIdCurrent: number;
    let leaderNameCurrent: string;
    if (config.mode === 'playing') {
      leaderIdCurrent = this.rpsServiceService.activeLeaderIndex;
      leaderNameCurrent = this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name;
    } else {
      leaderIdCurrent = -1;
      leaderNameCurrent = this.rpsServiceService.trainerName;
    }

    this.mlService.send2(
      {
        gameId: this.rpsServiceService.gameId,
        leaderId: leaderIdCurrent,
        leaderName: leaderNameCurrent,
        status: 'playing',
        hit: pHit,
        mode: config.mode
      }
    ).subscribe(
      data => {   // process response from AI :
        console.log(data);
        this.currentAiHit = data.hit;
        this.rpsServiceService.aiHits.push(data.hit);

        this.setAIImage();
        this.setBackgroundColor();
        this.saveResult();

        // this.barChartData[0].data[0] = this.rpsServiceService.calculateHumanWins();
        // this.barChartData[1].data[0] = this.rpsServiceService.calculateDraw();
        // this.barChartData[2].data[0] = this.rpsServiceService.calculateHumanLost();
        // this.chart.chart.update();

        this.pieChartData[0] = config.gameLength - this.hitIndex;
        this.pieChartData[1] = this.rpsServiceService.calculateHumanWins();
        this.pieChartData[2] = this.rpsServiceService.calculateDraw();
        this.pieChartData[3] = this.rpsServiceService.calculateHumanLost();
        this.pieChart.chart.update();

        this.gameProcessStatus = GameProcessStatus.WaitingForHumanHit;    // AI finished, now the human can make a hit

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

  getTime(): void {
    this.gamepadServiceService.getTime()
       .subscribe(time => this.time = time.datetime);
  }
}
