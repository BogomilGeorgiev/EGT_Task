import User from "../features/users/User";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchUsers,
  getUsers,
  getUsersError,
  getUsersStatus,
} from "../features/users/usersSlice";
import Loader from "../ui/Loader";
import LinkButton from "../ui/LinkButton";
import { stateStatuses } from "../constants";
import { useAppDispatch } from "../hooks";

export default function Users() {
  const dispatch = useAppDispatch();
  const users = useSelector(getUsers);
  const status = useSelector(getUsersStatus);
  const error = useSelector(getUsersError);

  useEffect(() => {
    if (status === stateStatuses.IDLE) {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === stateStatuses.LOADING) {
    return <Loader />;
  }

  if (status === stateStatuses.REJECTED) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <LinkButton to="/tasks">Tasks Page &rarr;</LinkButton>
      </div>
      {users.length === 0 ? (
        <div className="text-center mt-10 font-bold text-lg sm:text-xl md:text-2xl">
          No users to display...
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
