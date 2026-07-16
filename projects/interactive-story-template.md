---
title: Interactive story template
org: The Washington Post
date: 07/12/2026
slug: interactive-story-template
order: 1
img: template.png
description: >-
  The Post’s template for building bespoke stories — I help develop and maintain
  the framework used across the newsroom.
tag: Newsroom tool
---

At The Washington Post, I contribute to the building and maintainance our bespoke storytelling tools and templates. I help with the development and architecture of the newsroom’s most experimental framework, which allows graphics reporters and designers to build immersive stories.

![Three Washington Post stories built using the interactive template.](/images/projects/template.png "Interactive projects generated using the  template.")

Built with Next.js, the template leverages internal content APIs to seamlessly deliver text and visual assets from our CMS. In addition to developing reusable front-end NPM components, I contribute to the back-end publishing pipeline that deploys stories to AWS S3 and Apple News.

On the front end, I’ve built interactive, scroll-driven components used across our storytelling template, as well as a text-message component that visually recreates conversations within articles. I’ve also developed reusable logic for filtering large datasets and powering card-based experiences used in [database-driven](https://www.washingtonpost.com/food/interactive/cookie-recipes-holiday/) projects.

![Three reusable component.](/images/projects/components.png "An example of a filters component, a text message component, a scrolly-video component.")

On the back end, I contributed an internal reader-response platform that collects, stores, and aggregates audience submissions. The system uses AWS Lambda, Amazon Aurora PostgreSQL, and S3 to persist reader responses, generate aggregated results, and serve them back to projects in near real time. This infrastructure powered interactive experiences such as our [world cup kits project](https://www.washingtonpost.com/sports/interactive/2026/06/16/11-best-world-cup-2026-kits/), allowing readers to compare their responses with those of the broader audience.

![Voting component.](/images/projects/voting.png "An example of a voting component, which stores aggregated user submissions.")

I’ve also built hooks that persist user responses to their Post reader profiles, enabling personalized experiences for logged-in users. These integrations have supported projects such as our [gift guides](https://www.washingtonpost.com/lifestyle/interactive/2025/gift-guide-2025/), where saved responses allow readers to revisit and interact with personalized content across device sessions.

![Save component.](/images/projects/save.png "Saving items to a reader’s Post accounts.")

The framework powers more than 400 of The Post’s most engaging and highest-converting stories each year. In 2024 alone, it was responsible for roughly 90 million pageviews across projects including live blogs, weather trackers, and election results.
