import Posts from "./components/posts";

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello and Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          to <span className="font-bold">Tractor Tuesday Blogs</span>.
        </span>
      </p>
      <Posts />
    </main>
  );
}
