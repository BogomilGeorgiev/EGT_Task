import User from "../features/users/User";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../features/users/userSlice";
import Loader from "../ui/Loader";
import LinkButton from "../ui/LinkButton";

export default function Users() {
  const dispatch = useDispatch();
  // to add the getSelectors in the userSlice
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    return <div>Error occured: {error}</div>;
  }

  return (
    <div className="">
      <LinkButton to="/tasks">Tasks Page</LinkButton>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}
