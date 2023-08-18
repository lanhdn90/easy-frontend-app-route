import Link from "next/link";
import { notFound } from "next/navigation";
export interface PostsListProps {
  posts: any[];
}
export interface ResponseModel {
  data: any[];
  pagination: { _page: number; _limit: number; _totalRows: number };
}

export default async function Page() {
  const data = await getData();
  if (!data) notFound();
  return (
    <div>
      <h1>Post List Page</h1>

      <ul>
        {data.posts?.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getData(): Promise<PostsListProps | undefined> {
  // server-side
  // build-time

  console.log("static props");
  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=10_limit=10"
  );
  console.log("🚀 ~ file: page.tsx:39 ~ getData ~ response:", response)
  const data: ResponseModel = await response.json();
  console.log("🚀 ~ file: page.tsx:40 ~ getData ~ data:", data)

  if (data.data.length === 0) {
    return undefined;
  }

  return {
    posts: data.data.map((x: any) => ({ id: x.id, title: x.title })),
  };
}
