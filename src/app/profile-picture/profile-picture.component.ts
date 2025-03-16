import { Component, computed, input, output } from '@angular/core';

export interface ProfilePictureClickedEvent {
  profileUrl: string;
}

@Component({
  selector: 'app-profile-picture',
  imports: [],
  templateUrl: './profile-picture.component.html',
})
export class ProfilePictureComponent {
  diameter = input(100); // In pixels
  profileUrl = input.required<string>();

  profilePictureClicked = output<ProfilePictureClickedEvent>();

  pictureStyle = computed(() => ({
    width: `${this.diameter}px`,
    height: `${this.diameter}px`,
  }));

  onProfilePictureClicked(): void {
    this.profilePictureClicked.emit({ profileUrl: this.profileUrl() });
  }
}
