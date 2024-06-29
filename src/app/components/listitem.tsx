import Link from "next/link";

type Props = {
  post: {
    slug: string;
    title: string;
    date: string;
  };
};

export default function ListItem({ post }: Props) {
  const { slug, title, date } = post;
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(date));

  return (
    <li className="mt-4 text-2xl dark:text-white/90">
      <Link
        className="underline hover:text-black/70 dark:hover:text-white"
        href={`/posts/${slug}`}
      >
        {title}
      </Link>
      <br />
      <p className="text-sm mt-1">{formattedDate}</p>
    </li>
  );
}
