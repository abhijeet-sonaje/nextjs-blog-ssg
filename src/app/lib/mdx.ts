// app/lib/mdx.ts
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown features

export async function mdxToHtml(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm], // Add more plugins if needed
    },
  });
  return mdxSource;
}