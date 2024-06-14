// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { mdxToHtml } from '../../lib/mdx';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../components/Layout';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = await fs.readdir(postsDirectory);
  console.log('FileNames : ', filenames);

  return filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => ({
      slug: filename.replace('.mdx', ''),
    }));
}

export async function generateMetadata({ params }: Props) {
  const postPath = path.join(process.cwd(), 'posts', `${params.slug}.mdx`);
  const source = await fs.readFile(postPath, 'utf8');

  // Extract title and other metadata from frontmatter (if you use it)
  // ...

  return {
    title: `Blog Post - ${params.slug}`, // Replace with extracted title
  };
}

export default async function BlogPostPage({ params }: Props) {
  const postPath = path.join(process.cwd(), 'posts', `${params.slug}.mdx`);
  try {
    const source = await fs.readFile(postPath, 'utf8');
    const mdxSource = await mdxToHtml(source);

    return (
      <Layout>
        <article>
          <h1>{params.slug}</h1> {/* Replace with extracted title */}
          <MDXRemote {...mdxSource} />
        </article>
      </Layout>
    );
  } catch (error) {
    notFound();
  }
}
