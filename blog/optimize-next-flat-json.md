---  
title: Optimizing Next.js with Flat JSON Files  
subhead: To optimize performance in Next.js projects, particularly those with large datasets, a strategy of flattening CMS data into JSON files during the build process and serving them client-side from the public folder can result in faster, smoother user experiences.  
tag: tag  
slug: next-flat-jsons-data-fetching  
date: 12/5/24  
---

At the Post we use Next.js, a React-based framework, to build special projects and interactive web applications. While most of our projects are single-page, some database-driven ones require passing and displaying larger datasets, often aggregated from multiple CMS story files into modals or tables.

Next.js imposes a page size threshold of `126kB`, and exceeding this limit can result in slower loading times, particularly on mobile networks.

To address this, I started writing out flat JSON files containing necessary CMS data attributes during the build process and serving them from the `public` folder. This approach lets me fetch pre-generated files client-side, speeding up load times while keeping the app under the size threshold.

Although Next.js offers multiple ways to fetch and serve data (such as `getStaticProps`), passing large datasets as page props can increase the JavaScript bundle size. Instead, I generate flat files during the build process and store them in the `public` folder. These files are then fetched client-side via an HTTP request (e.g., `/data/my-file.json`) using SWR.

During development, I fetch the necessary data from our content API and write it out as static JSON files. This process is automated with a script that runs during the Next.js build. By avoiding passing large datasets through page props, this method significantly reduces the JavaScript bundle size, helping the app stay within performance limits.

For instance, our [2024 fall dining guide](https://www.washingtonpost.com/food/interactive/2024/best-dc-restaurants/) uses text and data from several CMS files — one for each restaurant. So a script in `getStaticProps` runs and downloads that data in JSON files, storing it in the public directory. When a user clicks on one of the restaurants, an SWR fetches the relevant data to display on the modal. 

The advantages of this approach include smaller bundle sizes, faster page loads, and better caching (since Next.js caches JSON files in the browser, eliminating the need for repeated server fetches). It also simplifies data management by fetching only the required file when needed, making the code easier to maintain.

I was introduced to the concept of flat files through [django-bakery](https://github.com/palewire/django-bakery/), which helps “bake” django apps as static files, along with [How I learned to Stop Worrying and Love Flat Files](https://palewi.re/docs/django-bakery/_static/the-dream.pdf) presentation that walks through its advantages. 

A key downside is SEO: the page won't include all the information that is written to JSON files at build time. To mitigate this, I pass essential meta information through `getStaticProps` so that it’s “baked” into the page during build time, leaving only non-essential data (from an SEO perspective) outside the bundle.

In the case of the dining guide, some key data attributes — such as restaurant names, addresses and cuisine type — are passes as props and “baked” into the page markup. So if a user searches for the “Bar Del Monte Washington Post interactive,” the guide would still show up in the search results. 

When fetching data client-side from static JSON files, I ensure error handling is in place. If a file is missing or if the fetch fails due to network issues, I implement fallback logic using SWR. For example, I show a loading spinner until the data is fetched or provide a meaningful error message if loading fails.

This approach is especially effective for content-driven sites where data doesn't change frequently, offering a simple and scalable solution for managing and serving data. However, it's essential to evaluate its suitability for use cases involving frequently changing or real-time data. Generally, though, this method strikes a strong balance between static generation and dynamic client-side behavior, providing a smooth user experience and faster loading times.

