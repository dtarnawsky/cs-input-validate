import { CommonModule, NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonList, IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { ScreenReader } from '@capacitor/screen-reader';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonInput, NgClass, FormsModule, IonButton, CommonModule, IonItem, IonList, IonCardContent, IonCard, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  username = '';
  password = '';
  usernameError = 'A username must be specified';
  usernameHasError = false;
  @ViewChild('usernameControl') usernameControl!: IonInput;

  constructor() { }

  async validate(focus = false) {
    //await this.delay(100); // Wait for username to update
    console.log(`"${this.username}"`);
    this.usernameHasError = false;
    this.usernameError = '';
    if (this.username.length <= 3) {
      this.usernameError = 'A username must be at least 3 characters';
    }
    if (this.username.trim() == '') {
      this.usernameError = 'A username must be specified';
    }


    this.usernameHasError = !!this.usernameError;
    if (this.usernameHasError) {
      if (focus) {
        this.usernameControl.setFocus();
      }
    }

  }

  submit(e: Event) {
    e.preventDefault();
    this.validate(true);

  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }
}