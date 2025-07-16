/**
 * Represents a video/show/film item displayed in one video section.
 */

export interface Video {

   /** Main heading/title of the video */
  heading: string;

  /** Short description or lead text (may contain HTML) */
  description: string;

  /** URL to the video cover image */
  imageUrl: string;
}