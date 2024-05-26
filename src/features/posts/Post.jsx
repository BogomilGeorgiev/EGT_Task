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

  const handleUpdatePost = (e) => {
    e.preventDefault();
    dispatch(updatePost(editedPost));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(post.id));
    }
  };

  return (
    <li className="list-none border-2 w-[800px] mx-auto">
      <div>
        <h2 className="text-xl font-semibold">Title:</h2>
        <input
          type="text"
          name="title"
          value={editedPost.title}
          className="w-[550px] max-w-[800px] border-b-2 border-sky-300 text-center"
          onChange={handleChangePost}
        />
        <h2 className="text-xl font-semibold">Body:</h2>
        <textarea
          type="text"
          name="body"
          value={editedPost.body}
          className="w-[550px] max-w-[800px] h-[200px]"
          onChange={handleChangePost}
        />
      </div>
      <div className="flex justify-between px-4 py-3">
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
