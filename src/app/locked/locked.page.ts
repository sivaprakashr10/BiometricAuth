import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NativeBiometric } from 'capacitor-native-biometric';

@Component({
  selector: 'app-locked',
  templateUrl: './locked.page.html',
  styleUrls: ['./locked.page.scss'],
})
export class LockedPage implements OnInit {
  showFallback = true;
  password = '';
  hasBiometricAuth = false;
  constructor(private modal: ModalController) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    const available = await NativeBiometric.isAvailable();

    this.hasBiometricAuth = available.isAvailable;
    if (this.hasBiometricAuth) {
      this.openBiometricAuth();
    }
  }

  async openBiometricAuth() {
    const authResult = await NativeBiometric.verifyIdentity({
      reason: 'Your sesson timed out',
      // title: 'Your session timed out'?
    });
    if (authResult.verified) {
      this.dismissLockScreen();
    }
  }

  unlock() {
    if (this.password == '1234') {
      this.dismissLockScreen();
    }
  }

  dismissLockScreen() {
    this.modal.dismiss({ reset: true });
  }
}
