# 👨🏽‍💻 My website

Codebase for my personal [website](https://aadittambe.com/).

The site is scaffolded with [Next.js](https://nextjs.org/).

## 🧰 Development

### Prerequisites

This site is built with [Next.js 16](https://nextjs.org/), which requires **Node.js 18.18+**. It's recommended to use the latest LTS release.

### Setup

Download the code:

```
git clone https://github.com/aadittambe/aadittambe.com.git
```

Install `npm` dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

## ✍️ Managing content

### Projects

Each project is a Markdown file in `projects/`, with metadata in frontmatter (title, org, date, thumbnail, live URL, etc.). Projects with a `description` render as cards on the [projects page](https://aadittambe.com/projects/); those without one render as smaller tiles. If a file has body content below the frontmatter, it gets its own page at `/projects/<slug>` with a "Read more" link on its card.

To scaffold a new project, run the interactive prompt, which asks for the metadata and creates the `.md` file:

```
npm run new-project
```

To manage existing projects — edit metadata, drag to reorder, or delete — there's a local admin UI:

```
npm run admin
```

The admin also flags images in `public/images/projects/` that no project references (in frontmatter or body), so they can be deleted from the UI.

It runs at `http://localhost:4321` (or the next free port), binds to loopback only, and is never part of the deployed site.

### Resume

Resume data (work experience, awards, skills, and education) lives in `data/resume.json` — edit it directly to update the resume page.

## 🛠️ Build site

To build the site locally, run:

```
npm run build
```

## 🪖 Deploy site

The site is hosted on [Netlify](https://www.netlify.com/). Every push to the
`main` branch automatically triggers a build and deploy — no manual step needed.

## 🧪 Tests

This site has a unit test suite powered by [Vitest](https://vitest.dev/). To run tests in watch mode:

```
npm run test
```

Or run them once:

```
npm run test:run
```

## 🤖 Happy hacking

Feel free to reach out at aadit (dot) tambe (at) gmail (dot) com.
