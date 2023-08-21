import { Post } from "@/model/post";
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
  // if (!data) notFound();
  return (
    <div>
      <h1>Post List Page</h1>

      <ul>
        {data.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getData(): Promise<Post[]> {
// export async function getData() {
  // server-side
  // build-time

  console.log("static props");
  const response = await fetch(
    // "https://js-post-api.herokuapp.com/api/posts?_page=1_limit=10"
    "https://jsonplaceholder.typicode.com/posts"
  );
  // const data: Post[] = await response.json();
  const posts = await response.json();
  // if (data.length === 0) {
  //   return undefined;
  // }

  return posts;
  // return {
  //   posts: data.map((x: any) => ({ id: x.id, title: x.title })),
  // };
}
