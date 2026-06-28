# ReleaseCheck

A small release checklist tool. Each release has a name, a date, a set of
fixed checklist steps, an optional additional info note, and a status that
is computed from how many steps are checked off (planned, ongoing, done).

## Note on scope

The original brief asked for a PostgreSQL/MySQL backend behind an API,
deployed online. This submission is intentionally scoped down to a
frontend-only single-page app: there is no server and no database.
Application state is persisted in the browser's `localStorage` instead.

Because of this, there are no API endpoints to list. The "API and database
schema" requirement is covered below by documenting the data shape that is
stored in `localStorage` and the functions that read/write it, which play
the same role an API and a database would in a full-stack version.

## Features built

Must-haves from the brief:

- View a list of all releases, each with a name, date, and a status
- Create a new release with a name, due date, and optional additional info
- Check and uncheck the steps that make up a release
- Update a release's additional info
- Single-page application
- Simple CSS styling, no fancy design
- README with instructions to run locally
- Single-user, no login or user management

Status logic (not a literal must-have, but the rule that drives it):

- Status is computed automatically, never chosen by the user: no step
  checked is "Planned", at least one step checked is "Ongoing", all steps
  checked is "Done"

Nice-to-haves from the brief:

- Delete a release
- Responsive layout

Extra, not requested in the brief:

- Required field validation on name and date before saving

## Features skipped

These are called out explicitly rather than left unmentioned:

- Backend server: not built. There is no Node/Express/etc. process.
- PostgreSQL/MySQL database: not built. `localStorage` is used instead,
  see "Note on scope" above.
- API layer (REST or GraphQL) between frontend and backend: not built,
  since there is no backend for the frontend to talk to.
- Deployment of an API: not applicable have just deployed frontend.
- Docker setup for the backend: not applicable, no backend exists.
- Automated tests: not written.
- Date format validation, max-length limits, or any validation beyond
  "name and date are not empty": not implemented.

## Data model (in place of a database schema)

There is one entity, `Release`, stored as a JSON array under the
`localStorage` key `releasecheck:releases`. Each release has this shape:

```ts
{
  id: number,                 // unique id, generated with Date.now()
  release: string,            // name of the release, required
  date: string,                // due date, required
  stepsCompleted: boolean[],   // one entry per fixed step, true if done
  additionalText: string,      // optional notes
}
```

The list of step labels (7 fixed steps, the same for every release) is
defined once in `src/data/steps.js` and is not duplicated per release.
Status is never stored. It is computed on the fly from `stepsCompleted` by
`src/utils/getStatus.js`.

## API (not applicable)

There is no backend, so there is no HTTP/GraphQL API. The equivalent of an
API layer is the `useReleases` hook (`src/hooks/useReleases.js`), which
exposes the same operations a REST API would, backed by `localStorage`
instead of a database:

| Function                     | Equivalent of          | What it does                               |
| ---------------------------- | ---------------------- | ------------------------------------------ |
| `addRelease()`               | `POST /releases`       | creates a blank release and returns its id |
| `updateRelease(id, updates)` | `PATCH /releases/:id`  | updates name, date, steps, or notes        |
| `deleteRelease(id)`          | `DELETE /releases/:id` | removes a release                          |
| `releases` (state)           | `GET /releases`        | the current list of all releases           |

## Tech stack

- React 19 + Vite
- react-router-dom for client-side routing between the list and detail pages
- react-icons for icons
- Plain CSS, no UI framework

## Project structure

```
release-check/
  README.md
  release-check-frontend/
    src/
      App.jsx                  routing and page layout
      hooks/
        useReleases.js         release state, CRUD operations, localStorage sync
      data/
        releaseData.js         seed data used on first run
        steps.js                the 7 fixed checklist step labels
      utils/
        getStatus.js            derives Planned/Ongoing/Done
        validateRelease.js      required field validation
        storage.js               localStorage read/write helpers
      components/
        ReleaseTable/           list page
        ReleaseDetail/          detail page
```

## Running locally

Requirements: Node.js 18 or later.

```bash
cd release-check-frontend
npm install
npm run dev
```

This starts the Vite dev server. Open the URL it prints in the terminal
(typically `http://localhost:5173`) in a browser.

Other available scripts (run from `release-check-frontend/`):

- `npm run build`: production build
- `npm run preview`: preview the production build locally
- `npm run lint`: run ESLint
