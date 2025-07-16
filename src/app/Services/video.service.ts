import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Section } from '../Interfaces/Section';
import { Video } from '../Interfaces/Video';

/**
 * Provides video sections and banner data for the front page.
 * 
 * This service fetches data from the ERR API 
 * and extracts the banner and video sections for display.
 * 
 * Used by AppComponent, FrontpageBannerComponent and VideoSectionComponent.
 */

@Injectable({ providedIn: 'root' })
export class VideoService {
  private apiUrl = 'https://services.err.ee/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee';

  constructor(private http: HttpClient) {}

  getFrontPage(): Observable<
  {
    bannerSection: {
    heading: string;
    description: string;
    imageUrl: string;
  };
  frontPageSections: {
    header: string;
    data: {
      heading: string;
      description: string;
      imageUrl: string;
    }[];
  }[];
  }> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        const rawSections = res.data?.category?.frontPage || [];

      /* Extracts the banner section from the first item in frontPage.
       Maps banner heading, description and picture to an object
       of type Video.*/
        if (!rawSections.length || !rawSections[0].data?.length) {
          console.log("Banner is not found")
        }

        const bannerItem = rawSections?.[0]?.data?.[0];

        const bannerSection: Video = {
          heading: bannerItem?.heading || '',
          description: bannerItem?.lead || '',
          imageUrl: bannerItem?.photos?.[0]?.photoUrlBase || ''
        };

        /* Extracts sections with shows/films: 
            * Displays only those sections, where highTimeline === true. 
            * Maps each valid section to a Section object,
          which contains shows of type Video.
            * Each item in the section's data array becomes a Video object,
          which has a title, description and photo.
        */
        const frontPageSections = rawSections
          .slice(1) 
          .filter((section: { highTimeline: boolean; data: string | any[]; }) => section.highTimeline === true && section.data?.length)
          .map((section: any) => ({
            header: section.header || '',
            data: section.data.map((item: any) => ({
              heading: item.heading || '',
              description: '', // description might be added later
              imageUrl: item.verticalPhotos?.[0]?.photoUrlBase || ''
            }))
          }));

        return { bannerSection, frontPageSections };
      })
    );
  }
}