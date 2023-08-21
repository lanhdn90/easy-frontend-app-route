import { Post } from "@/model/post";
import { notFound } from "next/navigation";

export interface PostPageProps {
  params: {
    postId: string;
  };
}

// export const generateStaticParams = async () => {
//   const response = await fetch(
//     // "https://js-post-api.herokuapp.com/api/posts?_page=1_limit=10"
//     "https://jsonplaceholder.typicode.com/posts"
//   );
//   const data: Post[] = await response.json();
//   //   console.log("🚀 ~ file: page.tsx:14 ~ generateStaticParams ~ data:", data)

//   return data.map((post: Post) => ({
//     params: {
//       postId: post.id.toString(),
//     },
//   }));
// };

const getPost = async (id: string): Promise<Post | undefined> => {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (data.status === 200) {
    const post = await data.json();
    return post;
  } else {
    return undefined;
  }
};

export default async function Page(props: PostPageProps) {
  const post = await getPost(props.params.postId);
  if (!post) notFound();
  return (
    <div>
      <div>Title: {post.title}</div>
      <div>Body: {post.body}</div>
    </div>
  );
}
