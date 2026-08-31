# jvecina.dev

My personal portfolio site. Full stack MERN app with a public site for visitors and an admin panel I use to manage projects and read contact messages.

## Live

- Site: [https://jvecina.dev](https://jvecina-dev.vercel.app/)
- API: deployed separately on Render

## How it's built

The frontend is a React + Vite app. The backend is an Express API backed by MongoDB. They're split into two folders, `client` and `server`, and deploy separately (frontend on Vercel, backend on Render).

Project data normally comes from the API, but the client also has a build step that fetches all projects once and writes them to a static `projects.json` file. This avoids visitors sitting through a cold start when the free tier Render instance has spun down. When a project loads, it also pulls the live README straight from GitHub and renders it on the project page, so the project write up stays in sync with the actual repo.

The admin panel lets me log in, add or edit projects, and read messages that come in through the contact form. Saving a project or a message can trigger a Vercel deploy hook so the static site rebuilds with the latest data.

## Stack

**Client**
- React 19, Vite, TypeScript
- Tailwind CSS 4
- React Router
- React Hook Form
- Axios
- react-markdown + remark-gfm, for rendering GitHub READMEs

**Server**
- Express 5, TypeScript
- MongoDB with Mongoose
- JWT auth with bcrypt for the admin login
- Zod for request validation
- Helmet, CORS, and rate limiting on the contact form

## Project structure

```
jvecina.dev/
├── client/            React app
│   ├── src/
│   │   ├── pages/         routes: home, projects, project detail
│   │   ├── components/    home, projects, contact, layout, ui
│   │   ├── hooks/         GitHub README fetch, scroll spy
│   │   └── api/           axios instance
│   └── scripts/           build time script that syncs projects.json
└── server/            Express API
    └── src/
        ├── modules/
        │   ├── auth/       admin login
        │   ├── admin/      protected actions, e.g. triggering a deploy
        │   ├── projects/   CRUD for portfolio projects
        │   └── messages/   contact form submissions
        ├── middleware/     auth, validation, rate limiting, security headers
        └── config/         environment variables
```

## Running it locally

You'll need Node and a MongoDB connection string.

**Server**

```bash
cd server
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
VERCEL_DEPLOY_HOOK_URL=your_vercel_deploy_hook
PORT=5000
```

```bash
npm run dev
```

**Client**

```bash
cd client
npm install
npm run dev
```

The dev server proxies API calls to the local backend. `npm run build` also runs the project sync script first, which needs `SYNC_PROJECTS_URL` set to wherever the API is reachable.

## Notes

This is a solo project, not looking for contributions, but feel free to poke around the code.
