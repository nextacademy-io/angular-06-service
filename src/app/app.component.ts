import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ProfilePictureClickedEvent,
  ProfilePictureComponent,
} from './profile-picture/profile-picture.component';

const BASE_PICTURE_URL = 'https://randomuser.me/api/portraits/women';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfilePictureComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private randomIndex = signal(90);

  previousProfileUrl = signal(`${BASE_PICTURE_URL}/90.jpg`);
  currentProfileUrl = computed(
    () => `${BASE_PICTURE_URL}/${this.randomIndex()}.jpg`
  );

  profilePictureClicked(event: ProfilePictureClickedEvent): void {
    console.log('Profile picture clicked:', event);
    this.previousProfileUrl.update(() => event.profileUrl);
    this.randomIndex.update(() => Math.floor(Math.random() * 100));
  }
}
