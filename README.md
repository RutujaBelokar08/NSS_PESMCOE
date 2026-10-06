# NSS PESMCOE Website

The site uses React/Vite for the public pages and a small Node.js server with SQLite for editable content, admin login, academic sessions and uploaded files. The database and uploads live in `data/`, outside the public build, and persist across restarts.

## Run locally

Use Node.js 24 or newer, then run:

```sh
npm install
npm run dev
```

Open the Vite address shown in the terminal. On the first run, visit `/admin/setup` to create the administrator account (password must be at least 12 characters), then sign in at `/admin/login`.

## Production

```sh
npm run build
npm start
```

The Node server serves the built site and the CMS API on port `4174` by default. Set `PORT` to change it. Keep the `data/` directory backed up: it contains the SQLite database and uploaded photos/documents. To place the server behind HTTPS, configure the proxy to set `X-Forwarded-Proto: https` so the login cookie is marked Secure.

## Content management

The dashboard supports academic session history, team members, programme officers, domains, activities, notices, events, achievements, gallery photos, statistics, about information, and contact/footer details. Records stay associated with their session. Selecting a new current session changes the default content shown on the public site while preserving prior sessions. Uploaded images and PDFs are written to `data/uploads/` and served through `/uploads/`.

Run `node scripts/cms-acceptance.mjs` to exercise the 2027–28 CMS workflow with a temporary database and uploads. It removes its temporary test data after completion.
