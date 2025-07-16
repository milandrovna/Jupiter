import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { VideoService } from './Services/video.service';
import { Section } from './Interfaces/Section'
import { CommonModule } from '@angular/common';
import { VideoSectionComponent } from "./Components/video-section/video-section.component";
import { Video } from './Interfaces/Video';
import { FrontpageBannerComponent } from "./Components/frontpage-banner/frontpage-banner.component";

/**
 * Root component for the application.
 *
 * Responsible for:
 * - Fetching and managing the main banner and video sections data.
 * - Rendering the top banner using `FrontPageBannerComponent`
 * - Rendering multiple scrollable sections using `VideoSectionComponent`
 * - Initializing the page layout once data is received from `VideoService`
 */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VideoSectionComponent, FrontpageBannerComponent, FrontpageBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jupiter';

  /**
   * Scrollable video sections that to be displayed below the banner.
   */
  frontPageSections: Section[] = []; 

  /**
   *  Scrollable video sections that are currently displayed on the frontpage.
   */

  displayedSections: Section[] = []; 
  
  /**
   * Number of sections to load and display at a time.
   * Used for progressive/lazy rendering as the user scrolls.
   *
   * A smaller value improves initial performance, but requires more scroll events.
   * Default: 3
   */

  chunkSize = 3; 

  /**
   * Banner content shown at the top of the page.
   */

  bannerSection!: Video;
  

  constructor(private videoService: VideoService) {}

  /**
   * Fetches front page data when the component initializes.
   * Populates banner and video sections for rendering.
   */

  ngOnInit(): void{
    this.videoService.getFrontPage().subscribe(({ bannerSection, frontPageSections }) => {
    this.bannerSection = bannerSection;
    this.frontPageSections = frontPageSections;
    this.displayedSections = this.frontPageSections.slice(0, this.chunkSize);
  });
  }

  // Listener to display more video sections on the front page, when user scrolls down 
  @HostListener('window:scroll', [])
    onScroll(): void{
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if(scrollTop + windowHeight >= docHeight - 100) {
        this.loadNextChunkOfVideoSections();
      }

    } 
  loadNextChunkOfVideoSections(): void {
    const next = this.displayedSections.length + this.chunkSize;
    const sectionsLeft = this.frontPageSections.length;

    if (sectionsLeft < next) {
      this.displayedSections = this.frontPageSections.slice(0, sectionsLeft);
    }
    else if (next <= sectionsLeft) {
      this.displayedSections = this.frontPageSections.slice(0, next);
    }
  }
}
