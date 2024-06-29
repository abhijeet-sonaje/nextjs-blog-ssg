// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import { getPostData } from "../../lib/posts";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = await fs.readdir(postsDirectory);
  // console.log("FileNames : ", filenames);

  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({
      slug: filename.replace(".md", ""),
    }));
}

// export async function generateMetadata({ params }: Props) {
//   const postPath = path.join(process.cwd(), "posts", `${params.slug}.mdx`);
//   const source = await fs.readFile(postPath, "utf8");

//   // Extract title and other metadata from frontmatter (if you use it)
//   // ...

//   return {
//     title: `Blog Post - ${params.slug}`, // Replace with extracted title
//   };
// }

export default async function BlogPostPage({ params }: Props) {
  try {
    const { title, date, contentHtml } = await getPostData(params.slug);

    const publishDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(new Date(date));

    return (
      <section>
        <h1 className="text-3xl mt-4 mb-0">{title}</h1>
        <p className="text-sm mt-0">{publishDate}</p>
        <br />
        <article className="text-base">
          <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
          <br />
          <p>
            <Link href="/">← Back to home</Link>
          </p>
        </article>
      </section>
    );
  } catch (error) {
    console.log("Error : ", error);
    notFound();
  }
}
