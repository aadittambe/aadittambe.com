---
title: Apple News publishing
org: The Washington Post
date: 08/29/2026
slug: apple-news
order: 4
img: apple-news-tile.png
description: >-
  The pipeline that publishes the newsroom’s interactive stories to Apple News —
  I rebuilt the publishing tool and brought our quiz to the platform.
tag: Newsroom tool
---

The Post publishes its interactive stories to Apple News as well as the web. These
stories are built as code and published outside our CMS in AWS S3, so they need their own path onto the platform. I work on building and maintaining the tools that convert them into Apple News Format and send them to our channels.

I reworked and modernized the newsroom’s Apple News publishing package, which assembles
a story’s text, images, video and fonts into a bundle and publishes it through the Apple
News API.

Apple News renders most of an article natively, but anything interactive has to ship as
a web embed — a self-contained bundle that loads nothing at runtime. As part of this
effort, I helped colleagues convert their interactive graphics into web embeds for
Apple News.

![A story with an interactive web embed as it appears in Apple News.](/images/projects/apple-news-webembed.png "An interactive web embed published in Apple News.")

I also built the Apple News version of our quiz format, which ships the whole quiz as a
single embed. I wrote a generator that builds that bundle from a published quiz — it
renders the format’s own components, so the Apple News version stays in step with the
web story instead of drifting from a separate copy.

![A Washington Post quiz as it appears in Apple News.](/images/projects/apple-news-quiz.png "A quiz published to Apple News.")

The generator downloads every image, video and font into the bundle, follows the
reader’s light or dark mode, and reports the component’s height back to Apple News so it
sits correctly in the article.
