import { LockedPage } from './../locked/locked.page';
import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AccessService {
  logoutTimer = new BehaviorSubject(0);
  constructor(private platform: Platform, private modal: ModalController) {
    this.platform.pause.subscribe(() => {
      this.lockApp();
    });
  }

  resetLogoutTimer() {
    this.logoutTimer.next(5);
    this.decreaseTimer();
  }

  decreaseTimer() {
    setTimeout(() => {
      if (this.logoutTimer.value == 0) {
        this.lockApp();
      } else {
        this.logoutTimer.next(this.logoutTimer.value - 1);
        this.decreaseTimer();
      }
    }, 1000);
  }

  async lockApp() {
    const modal = await this.modal.create({
      component: LockedPage,
    });
    await modal.present();
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.reset) {
        this.resetLogoutTimer();
      }
    });
  }
}
