import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { revertToOriginal, updateUserData } from "./usersSlice";
import { useAppDispatch } from "../../hooks";
import { User as UserType } from "../../types/types";

type UserCardProps = {
  user: UserType;
};

type ErrorObj = Record<string, string>;

function User({ user }: UserCardProps) {
  const dispatch = useAppDispatch();
  const [editUser, setEditUser] = useState<UserType>({ ...user });
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState<ErrorObj>({});

  const currentUrl = window.location.href;
  const isPostsPage = currentUrl.includes("posts");

  useEffect(() => {
    if (isPostsPage) setIsOpen(true);
  }, [isPostsPage]);

  useEffect(() => {
    function checkForErrors() {
      const errorsObj: ErrorObj = {};
      if (!editUser.username) errorsObj.username = "Username is required";
      if (!editUser.email) errorsObj.email = "Email is required";
      if (!editUser.address.street) errorsObj.street = "Street is required";
      if (!editUser.address.suite) errorsObj.suite = "Suite is required";
      if (!editUser.address.city) errorsObj.city = "City is required";
      setErrors(errorsObj);
    }

    checkForErrors();
  }, [editUser]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [field, secondField] = name.split(".") as [keyof UserType, string];
      setEditUser({
        ...editUser,
        [field]: { ...(editUser[field] as object), [secondField]: value },
      });
    } else {
      setEditUser({ ...editUser, [name]: value });
    }
    setIsDisabled(true);
  }

  function handleSubmit() {
    if (Object.keys(errors).length > 0)
      return alert("All fields are mandatory!");
    dispatch(updateUserData({ id: user.id, data: editUser }));
    setIsDisabled(false);
  }

  function handleRevertToOriginal() {
    setEditUser(user);
    dispatch(revertToOriginal({ id: user.id, originalData: user }));
    setIsDisabled(false);
  }

  return (
    <div className="flex flex-col gap-3 border-2 p-2 m-3 w-full max-h-[600px] max-w-3xl">
      <div
        onClick={isPostsPage ? () => {} : () => setIsOpen(!isOpen)}
        className="border-b-4 p-3"
      >
        <h3 className="text-xl font-semibold cursor-pointer">{user.name}</h3>
      </div>
      {isOpen && (
        <>
          <div className="flex flex-wrap justify-around gap-2">
            <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/3">
              <label className="font-semibold" htmlFor="username">
                Username:
              </label>
              <input
                className="input pl-2 text-center"
                type="text"
                name="username"
                id="username"
                value={editUser.username}
                onChange={handleChange}
                required
              />
              {errors.username && (
                <span className="text-red-500">{errors.username}</span>
              )}

              <label className="font-semibold" htmlFor="email">
                Email:
              </label>
              <input
                className="input pl-2 text-center"
                type="text"
                name="email"
                id="email"
                value={editUser.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/3">
              <label className="font-semibold">Street:</label>
              <input
                className="input pl-2 text-center"
                name="address.street"
                value={editUser.address.street}
                onChange={handleChange}
                required
              />
              {errors.street && (
                <span className="text-red-500">{errors.street}</span>
              )}

              <label className="font-semibold" htmlFor="suite">
                Suite:
              </label>
              <input
                className="input pl-2 text-center"
                type="text"
                name="address.suite"
                id="suite"
                value={editUser.address.suite}
                onChange={handleChange}
                required
              />
              {errors.suite && (
                <span className="text-red-500">{errors.suite}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/3">
              <label className="font-semibold" htmlFor="city">
                City:
              </label>
              <input
                className="input pl-2 text-center"
                type="text"
                name="address.city"
                id="city"
                value={editUser.address.city}
                onChange={handleChange}
                required
              />
              {errors.city && (
                <span className="text-red-500">{errors.city}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-y-0 sm:space-x-2 space-y-2 justify-between px-4 py-3">
            <button
              onClick={handleRevertToOriginal}
              className="border-2 border-black p-1 rounded-md hover:bg-red-300 cursor-pointer disabled:cursor-not-allowed"
              disabled={!isDisabled}
            >
              Cancel
            </button>
            {!isPostsPage && (
              <Link to={`/posts/${user.id}`}>
                <button className="border-2 border-black p-1 rounded-md hover:bg-sky-400 cursor-pointer">
                  See Posts
                </button>
              </Link>
            )}
            <button
              onClick={handleSubmit}
              className="border-2 border-black p-1 rounded-md hover:bg-green-300 cursor-pointer disabled:cursor-not-allowed"
              disabled={!isDisabled}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default User;
