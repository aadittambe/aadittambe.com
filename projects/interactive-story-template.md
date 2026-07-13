---
title: Interactive story template
org: The Washington Post
slug: interactive-story-template
date: 07/12/2026
description: I contribute to the development and maintainance of the Post’s template for creating and publishing bespoke, interactive stories.
img: template.png
---

At The Washington Post, I contribute to the building and maintainance our bespoke storytelling tools and templates. I help with the development and architecture of the newsroom’s most experimental framework, which allows graphics reporters and designers to build immersive stories.

![Three Washington Post stories built using the interactive template.](/images/projects/template.png "Interactive stories generated using the interactive template.")

Built with Next.js, the template leverages internal content APIs to seamlessly deliver text and visual assets from our CMS. In addition to developing reusable front-end NPM components, I contribute to the back-end publishing pipeline that deploys stories to AWS S3.

On the front end, I’ve built interactive, scroll-driven components used across our storytelling template, including a text-message component that visually recreates conversations within articles. I’ve also developed reusable logic for filtering large datasets and powering card-based experiences used in database-driven projects.

![Three reusable component.](/images/projects/components.png "An example of a filters component, a text message component, a scrollytelling component.")

On the back end, I contributed an internal reader-response platform that collects, stores, and aggregates audience submissions. The system uses AWS Lambda, API Gateway, Amazon Aurora PostgreSQL, and S3 to persist reader responses, generate aggregated results, and serve them back to projects in near real time. This infrastructure powered interactive experiences such as our favorite football kits project, allowing readers to compare their responses with those of the broader audience.

![Voting component.](/images/projects/voting.png "An example of a voting component, which stores aggregated user submissions.")

I’ve also built hooks that persist user responses to their Post reader profiles, enabling personalized experiences for logged-in users. These integrations have supported projects such as our gift guides, where saved responses allow readers to revisit and interact with personalized content across sessions.

![Save component.](/images/projects/save.png "Adding the ability to save items to a reader’s Post account.")

Today, the framework powers more than 400 of The Post’s most engaging and highest-converting stories each year. In 2024 alone, it was responsible for roughly 90 million pageviews across projects including live blogs, weather trackers, and election results.
