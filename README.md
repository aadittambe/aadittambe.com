# 👨🏽‍💻 My website

Codebase for my personal [website](https://aadittambe.com/).

The site is scaffolded with [Next.js](https://nextjs.org/) and uses [ArchieML](http://archieml.org/) as a micro CMS, so I can catch typos easily. A GitHub Action automatically builds and deploys this site to my FTP server when changes are pushed to the repository, because I like automation.

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
npm run start
```

## 🛠️ Build site

A [GitHub Action](.github/workflows/deploy.yml) automatically builds (and deploys the site to my FTP server) when changes to this repository are pushed to GitHub (on the `main` branch). However, to manually build it for local testing, run:

```
npm run build
```

## 🪖 Deploy site

The same GitHub Action mentioned in the earlier step deploys it to my FTP server with `ftp-deploy` when changes are pushed to the `main` branch. However, to manually deploy, you can run:

```
npm run deploy
```

## 🤖 Happy hacking

Feel free to reach out at aadit (dot) tambe (at) gmail (dot) com.
