import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import {startWith, switchMap} from "rxjs/operators";
import { PollingService } from 'src/app/services/polling.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  status: boolean;
  polling: boolean;
  subscription: Subscription;
  constructor(private api: PollingService) { }

  ngOnInit(): void {
  }

  startPolling() {
    this.polling = true;
    this.subscription = interval(1000)
    .pipe(
      startWith(0),
      switchMap(() => this.api.consumo())
    )
    .subscribe(res => {
      this.status = res.status;
      console.log("a ver: ", res.status);
      if (res.status === false) {
        this.polling = false;
        this.stopPolling();
      }
    })
  }

  stopPolling() {
    console.log("me desuscribo");
    this.subscription.unsubscribe();
  }
}
