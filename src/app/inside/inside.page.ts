import { AccessService } from './../services/access.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {
  logoutTimer = this.access.logoutTimer.asObservable();
  constructor(private access: AccessService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.access.resetLogoutTimer();
  }
}
