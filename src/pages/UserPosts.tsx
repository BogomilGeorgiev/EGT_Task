import { useParams } from "react-router-dom";
import Posts from "../features/posts/Posts";
import User from "../features/users/User";
import { useDispatch, useSelector } from "react-redux";

import LinkButton from "../ui/LinkButton";
import { useEffect } from "react";
import {
  fetchPosts,
  getFetchPostsStatus,
  getPosts,
  getPostsError,
} from "../features/posts/postsSlice";
import Loader from "../ui/Loader";
import { fetchUsers, getUsersStatus } from "../features/users/usersSlice";
import { stateStatuses } from "../constants";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";

function UserPosts() {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const posts = useSelector(getPosts);
  const postsStatus = useSelector(getFetchPostsStatus);
  const usersStatus = useSelector(getUsersStatus);
  const error = useSelector(getPostsError);

  const user = useSelector((state: RootState) =>
    state.users.users.find((user) => user.id === Number(userId))
  );

  useEffect(() => {
    if (postsStatus === stateStatuses.IDLE) {
      dispatch(fetchPosts(Number(userId)));
    }
  }, [dispatch, userId, postsStatus]);

  useEffect(() => {
    if (usersStatus === stateStatuses.IDLE) {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  if (postsStatus === stateStatuses.LOADING || !user) {
    return <Loader />;
  }

  if (postsStatus === stateStatuses.REJECTED) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <LinkButton to="-1">&larr; Go back</LinkButton>
        <LinkButton to="/tasks">Tasks Page &rarr;</LinkButton>
      </div>
      <div className="mb-4">
        <User user={user} />
      </div>
      <div className="mb-4">
        <Posts posts={posts} />
      </div>
    </div>
  );
}

export default UserPosts;
