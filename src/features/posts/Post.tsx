import { useEffect, useState } from "react";
import { deletePost, updatePost } from "./postsSlice";
import { useAppDispatch } from "../../hooks";
import { Post as PostType } from "../../types/types";

type PostProps = {
  post: PostType;
};

type ErrorObj = Record<string, string>;

function Post({ post }: PostProps) {
  const [editedPost, setEditedPost] = useState({ ...post });
  const [errors, setErrors] = useState<ErrorObj>({});
  const dispatch = useAppDispatch();

  const handleChangePost = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleUpdatePost = () => {
    if (Object.keys(errors).length > 0)
      return alert("All fields are mandatory!");
    dispatch(updatePost(editedPost));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(post.id));
    }
  };

  useEffect(() => {
    function checkForErrors() {
      const errorsObj: ErrorObj = {};
      if (!editedPost.title) errorsObj.title = "Title is required";
      if (!editedPost.body) errorsObj.body = "Body text is required";

      setErrors(errorsObj);
    }

    checkForErrors();
  }, [editedPost]);

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
        {errors.title && <span className="text-red-500">{errors.title}</span>}
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Body:</h2>
        <textarea
          name="body"
          value={editedPost.body}
          className="w-full h-[150px] text-center sm:h-[200px] p-2"
          onChange={handleChangePost}
        />
        {errors.body && <span className="text-red-500">{errors.body}</span>}
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
