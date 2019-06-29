import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RpsServiceService } from '../rps-service.service';

@Component({
  selector: 'app-error-game',
  templateUrl: './error-game.component.html',
  styleUrls: ['./error-game.component.css']
})
export class ErrorGameComponent implements OnInit {

  constructor(private rpsServiceService: RpsServiceService, private router: Router) { }

  ngOnInit() {
  }

  reset() {
    this.rpsServiceService.reset();
  }

  nextPage() {
    this.reset();
    this.router.navigateByUrl('/StartGameComponent');
  }
}
