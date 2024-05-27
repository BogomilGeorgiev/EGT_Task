import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "./postsSlice";

function Post({ post }) {
  const [editedPost, setEditedPost] = useState({ ...post });
  const dispatch = useDispatch();

  const handleChangePost = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleUpdatePost = () => {
    dispatch(updatePost(editedPost));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(post.id));
    }
  };

  return (
    <li className="list-none border-2 w-full mx-auto max-w-3xl p-4">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Title:</h2>
        <input
          type="text"
          name="title"
          value={editedPost.title}
          className="input w-full border-b-2 mb-4 p-3 border-sky-300 text-start sm:text-center"
          onChange={handleChangePost}
        />
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Body:</h2>
        <textarea
          type="text"
          name="body"
          value={editedPost.body}
          className="w-full h-[150px] text-center sm:h-[200px] p-2"
          onChange={handleChangePost}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between px-4 py-3 space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={handleDelete}
          className="border-2 border-black p-1 rounded-md hover:bg-red-300 cursor-pointer disabled:cursor-not-allowed"
        >
          Delete
        </button>
        <button
          onClick={handleUpdatePost}
          className="border-2 border-black p-1 rounded-md hover:bg-orange-300 cursor-pointer disabled:cursor-not-allowed"
        >
          Edit
        </button>
      </div>
    </li>
  );
}

export default Post;
