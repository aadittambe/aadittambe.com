import { vi, describe, it, expect, beforeEach } from "vitest";
import path from "path";

vi.mock("fs", () => ({
  default: {
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  },
}));

import fs from "fs";
import {
  getSortedPostsData,
  getAllPostSlugs,
  getPostDataBySlug,
} from "../../lib/posts";

const MOCK_POSTS = {
  "newer-post.md": `---
title: Newer Post
date: "2024-06-01"
slug: newer-post
---
Content of newer post`,
  "older-post.md": `---
title: Older Post
date: "2023-01-15"
slug: older-post
---
Content of older post`,
};

beforeEach(() => {
  fs.readdirSync.mockReturnValue(Object.keys(MOCK_POSTS));
  fs.readFileSync.mockImplementation((filePath) => {
    const fileName = path.basename(filePath);
    return MOCK_POSTS[fileName] ?? "";
  });
});

describe("getSortedPostsData", () => {
  it("returns an array of post objects", () => {
    const posts = getSortedPostsData();
    expect(posts).toHaveLength(2);
    expect(posts[0]).toMatchObject({ title: expect.any(String), slug: expect.any(String) });
  });

  it("sorts posts newest first", () => {
    const posts = getSortedPostsData();
    expect(posts[0].slug).toBe("newer-post");
    expect(posts[1].slug).toBe("older-post");
  });

  it("derives id from filename", () => {
    const posts = getSortedPostsData();
    expect(posts[0].id).toBe("newer-post");
  });
});

describe("getAllPostSlugs", () => {
  it("returns params-wrapped slug objects", () => {
    const slugs = getAllPostSlugs();
    expect(slugs).toHaveLength(2);
    expect(slugs[0]).toEqual({ params: { slug: expect.any(String) } });
  });

  it("includes all slugs from frontmatter", () => {
    const slugs = getAllPostSlugs();
    const values = slugs.map((s) => s.params.slug);
    expect(values).toContain("newer-post");
    expect(values).toContain("older-post");
  });
});

describe("getPostDataBySlug", () => {
  it("returns post data for a given slug", async () => {
    const post = await getPostDataBySlug("older-post");
    expect(post.slug).toBe("older-post");
    expect(post.title).toBe("Older Post");
  });

  it("includes processed contentHtml", async () => {
    const post = await getPostDataBySlug("newer-post");
    expect(post.contentHtml).toContain("Content of newer post");
  });
});
