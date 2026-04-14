# About Me Site

Personal bilingual portfolio built with React, TypeScript, Vite, MUI, and GitHub Pages in mind.

## Pages

- Home overview
- Scientific path
- Teaching career
- Professional work
- Personal / hobbies
- Admin page for browser-side JSON editing

## Stack

- React + TypeScript + Vite
- Material UI for layout, cards, forms, and tables
- `react-i18next` for EN / UA labels
- Local JSON content per locale
- Static-friendly admin tools with export/import

## Local development

```bash
npm install
npm run dev
```

## How content works

- UI labels live in [src/content/locales/en.json](/Users/mihailmyagkiy/MikeAirMain/Projects/VSCode/AboutMe/src/content/locales/en.json) and [src/content/locales/uk.json](/Users/mihailmyagkiy/MikeAirMain/Projects/VSCode/AboutMe/src/content/locales/uk.json).
- Page content defaults live in [src/content/data/content.en.json](/Users/mihailmyagkiy/MikeAirMain/Projects/VSCode/AboutMe/src/content/data/content.en.json) and [src/content/data/content.uk.json](/Users/mihailmyagkiy/MikeAirMain/Projects/VSCode/AboutMe/src/content/data/content.uk.json).
- The admin page edits the active locale in browser storage.
- To make edits permanent in GitHub Pages, export JSON from `/admin` and replace the matching source file in the repo.

## GitHub Pages deployment

1. Create a GitHub repository and push this project to the `main` branch.
2. In GitHub, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` again or run the `Deploy to GitHub Pages` workflow manually.

## Notes

- Routing uses `HashRouter`, which avoids static hosting refresh issues on GitHub Pages.
- Replace the placeholder texts, ORCID, links, and experience entries with your real data.
