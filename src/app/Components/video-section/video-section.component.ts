import { Component, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Section } from '../../Interfaces/Section';
import { CommonModule } from '@angular/common';

/**
 * This component displays a section heading (e.g., "Enim vaadatud") 
 * and a scrollable list of videos with images. Every video is of type Video, 
 * videos under one heading make up a list of type Section.
 * 
 * The data for the heading and video items is based on the Section interface.
 * 
 * The component (hereinafter referred to as the "video section") supports horizontal 
 * scrolling via left and right arrows.
 */

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-section.component.html',
  styleUrl: './video-section.component.css'
})
export class VideoSectionComponent implements AfterViewInit {

  /**
   * Input: Video section data passed from parent component.
   */

   @Input() section!: Section; 
   @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

   // Arrows to scroll video section
   showRightArrow = true;
   showLeftArrow = false;

  ngAfterViewInit() {
    this.updateArrowVisibility();

    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      this.updateArrowVisibility();
    });
  }

  // Display/hide left and right arrow depending on whether user is in the beggining of
  // the section/has reached the end of the section

  updateArrowVisibility(): void {
    const el = this.scrollContainer.nativeElement;
    const trehsold = 1.5;
    this.showLeftArrow = el.scrollLeft > trehsold;
    this.showRightArrow = el.scrollLeft + el.clientWidth < el.scrollWidth - trehsold;
  }
  
  // Scrolling the section to the left/right using arrows 

  scrollLeft(): void {
    const width = this.scrollContainer.nativeElement.offsetWidth;
    this.scrollContainer.nativeElement.scrollBy({ left: -width, behavior: 'smooth' });
  }

  scrollRight(): void {
    const width = this.scrollContainer.nativeElement.offsetWidth;
    this.scrollContainer.nativeElement.scrollBy({ left: width, behavior: 'smooth' });
  }
 
}
