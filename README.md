# 👨🏽‍💻 My website

Codebase for my personal [website](https://aadittambe.com/).

The site is scaffolded with [Next.js](https://nextjs.org/) and uses [ArchieML](http://archieml.org/) as a micro CMS, so I can catch typos easily.

## 🧰 Development

Download the code:

```
git clone https://github.com/aadittambe/aadittambe.com.git
```

Install `npm` dependencies:

```
npm install
```

This site uses a [Google Doc](https://docs.google.com/document/d/1lnWLWaUz2b-ho5QxBcjh5jdxF4Gf_K2gumFWfyma4xc/) as an ad-hoc CMS. To fetch data from the Google Doc — thanks to [this script](https://github.com/the-pudding/starter/blob/master/scripts/fetch-doc.js) from The Pudding which uses ArchieML — run:

```
npm run download
```

Start the development server:

```
npm run dev
```

## 🛠️ Build site

To build the site locally, run:

```
npm run build
```

## 🪖 Deploy site

To deploy to the FTP server, run:

```
npm run deploy
```

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
