# Video Front Page Viewer (ERR Jupiter Clone)

This Angular project renders a dynamic video front page based on ERR's Jupiter platform. It fetches video section data from a remote API and displays it using banner and scrollable components with progressive loading and arrow-based navigation.

---

## Project Structure - keypoints

src/
│
├── app/
│ ├── app.component.ts # Root component that loads and displays banner and video sections
│ ├── app.component.html # Template for layout, banner, and scrollable sections
│ ├── Services/
│ │ ├── video.service.ts # Service for fetching and processing data from the ERR API
│ ├── Interfaces/
│ │ ├── section.ts # Defines structure of a section
│ │ └── video.ts # Defines structure of a video item
│ ├── Components/
│ │ ├── frontpage-banner/
│ │ │ ├── frontpage-banner.component.ts # Component for top banner (single video/show)
│ │ │ └── frontpage-banner.component.html # Template for banner
│ │ │ └── frontpage-banner.component.css # Styles for banner
│ │ ├── video-section/
│ │ │ ├── video-section.component.ts # Scrollable section component with arrows
│ │ │ └── video-section.component.html # Template with scroll container and video items
│ │ │ └── video-section.component.css # Styles for arrows and layout
├── assets/
│ │ ├── arrow.png # Picture of arrow for buttons in video section
---

## Features

-  **Banner section** — Displays a highlighted show/movie image, heading and description at the top
-  **Asynchronous data loading** — All content is fetched via `HttpClient` from ERR's public API
-  **Lazy loading** — Only a few sections are loaded at a time to improve performance
-  **Arrow-controlled scroll** — Sections are horizontally scrollable using custom arrows
-  **Responsive design** — Works on mobile and desktop layouts

---

## How it works

1. `VideoService` fetches `frontPage.data` from the ERR API.
2. `VideoService` processes:
   - The **first item** for the banner
   - All `highTimeline === true` sections for scrollable lists
3. `VideoSectionComponent` renders scrollable rows of videos, where chunking is handled in the parent (`AppComponent`) using `chunkSize`.
4. Arrows appear based on scroll position, allowing manual navigation.
5. FrontpageBannerComponent renders banner info.

---

## Dependencies

- Angular CLI version: 17.3.17
- TypeScript: ~5.4.2

---

## Notes

- Data structures are defined using `Section` and `Video` interfaces for clarity and type safety.

---

## Author

Developed by Milena Petrova  
Designed to replicate the interactive structure of [https://jupiter.err.ee](https://jupiter.err.ee)


# Development

Option 1. Navigate to downloaded project repository in Command Prompt (e.g. cd Jupiter). Run `ng serve --open` to build the project. Then open http://localhost:4200/ in your browser.

Option 2. Open downloaded project repository in Visual Studio Code or another coding environment. Open terminal and run `ng serve --open`. Browser should open automatically. Otherwise open http://localhost:4200/ in your browser.

