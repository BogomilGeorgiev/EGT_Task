import { useParams } from "react-router-dom";
import Posts from "../features/posts/Posts";
import User from "../features/users/User";
import { useDispatch, useSelector } from "react-redux";

import LinkButton from "../ui/LinkButton";
import { useEffect } from "react";
import { fetchPosts } from "../features/posts/postsSlice";
import Loader from "../ui/Loader";

function UserPosts() {
  // to add the getSelectors in the postsSlice

  const { userId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === Number(userId))
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts(userId));
    }
  }, [dispatch, userId, status]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    return <div>Error occured: {error}</div>;
  }

  return (
    <div>
      <div className="flex">
        <LinkButton to="-1">&larr; Go back</LinkButton>
      </div>
      <User user={user} />
      <Posts posts={posts} />
    </div>
  );
}

export default UserPosts;
