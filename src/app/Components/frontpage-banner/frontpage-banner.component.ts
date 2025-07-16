import { Component, Input } from '@angular/core';
import { Video } from '../../Interfaces/Video';

/**
 * Component contains banner picture, heading and description. Banner component
 * is displayed on top of the front page.
 */

@Component({
  selector: 'app-frontpage-banner',
  standalone: true,
  imports: [],
  templateUrl: './frontpage-banner.component.html',
  styleUrl: './frontpage-banner.component.css'
})
export class FrontpageBannerComponent {

  /**
   * Input: Banner data passed from parent component.
   */

  @Input() video!: Video;
}
