// app/lib/mdx.ts
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
// import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown features

export async function mdToHtml(source: string, slug: string) {
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(source);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  const blogPostWithHTML: any = {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  };
  return blogPostWithHTML;
}
