import Post from "./Post";

function Posts({ posts }) {
  return (
    <div className="py-4 pb-3">
      <h1 className="text-2xl font-bold mb-3">Posts</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
