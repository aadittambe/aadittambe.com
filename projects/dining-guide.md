---
title: Dining Guide
org: The Washington Post
date: 07/13/2025
slug: dining-guide
order: 4
img: dining.png
imgAlt: Three Washington post dining guide projects.
url: >-
  https://www.washingtonpost.com/food/interactive/2026/10-best-new-restaurants-dc-area/
description: >-
  The Post’s seasonal restaurant guide — an interactive database and map of
  dining picks across D.C., Maryland, and Virginia. I led development across
  six editions.
---

![Three Washington Post dining guide projects.](/images/projects/dining.png "Dining guide projects produced over the years.")

I was the lead developer of The Post’s seasonal dining guide, an interactive restaurant database and map covering restaurant picks across D.C., Maryland, and Virginia. The guide is built with Next.js, using The Post’s design system, with restaurant locations rendered on a MapLibre GL map using custom vector tiles, and data flowing in from Google Sheets and The Post’s CMS.

![Three Washington Post dining guide map.](/images/projects/dining-map.png "A locator map built with MapLibre GL.")

Over six editions we evolved the architecture significantly. The [initial version](https://www.washingtonpost.com/food/interactive/2023/best-restaurants-dc-2023-tom-sietsema/) was a client-heavy React app. We then introduced centralized state with React Context and used SWR to lazily fetch flat JSON files per restaurant, so readers only downloaded content as they opened it. This is when the we also [introduced a map](https://www.washingtonpost.com/food/interactive/2024/best-dc-restaurants/), which our readers had requested via site comments. The [latest version](https://www.washingtonpost.com/food/interactive/2026/10-best-new-restaurants-dc-area/) moved to fully static pre-rendering with Next.js pages — every restaurant gets its own statically generated, shareable URL at build time, eliminating client-side data fetching entirely and making each page load nearly instant. We also built an publishing pipeline for text and assets to flow directly to Apple News.

Every optimization served the reader. Heavy components mount only as they scroll into view — photo carousels render a single image until visible, and the map initializes lazily — keeping initial load light even with dozens of photos. Deep-linkable restaurant pages meant readers could share a specific restaurant page, with browser back/forward navigation working seemlessly. We added a mobile map/list toggle, inline mini-map, and keyboard-accessible drawers, to ship a deliverable that loads fast, works on any device, and offers readers an engaging experience.
