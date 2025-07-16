import { Video } from "./Video";

/**
 * Represents a group of related videos under a common heading (e.g. 'Enim vaadatud') 
 * on the front page.
 */

export interface Section {

  /** Title displayed at the top of the section */
  header: string;

  /** List of video items inside this section */
  data: Video[];
}