import { PostList } from "./_components/post-list";

export default async function Page() {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();

  // const data = await fetch("/api/accounts"); // using defined app routes
  // const posts = await data.json();

  return <PostList/>;
}
