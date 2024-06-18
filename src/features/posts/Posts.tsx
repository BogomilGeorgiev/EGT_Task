import Post from "./Post";
import { Post as PostType } from "../../types/types";

type PostsProps = {
  posts: PostType[];
};

function Posts({ posts }: PostsProps) {
  return (
    <div className="ml-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-3">Posts</h1>
      {posts.length === 0 ? (
        <div className="text-center mt-10 font-bold text-lg sm:text-xl md:text-2xl">
          No posts to show...
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
