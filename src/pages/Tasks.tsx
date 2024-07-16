import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchTasks,
  getTasks,
  getTasksError,
  getTasksStatus,
  updateTaskStatus,
} from "../features/tasks/tasksSlice";
import { PAGE_SIZE, stateStatuses } from "../constants";

import Task from "../features/tasks/Task";
import Loader from "../ui/Loader";
import Pagination from "../ui/Pagination";
import LinkButton from "../ui/LinkButton";
import { useAppDispatch, useAppSelector } from "../hooks";

function Tasks() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();

  const status = useSelector(getTasksStatus);
  const tasks = useAppSelector(getTasks);
  const error = useSelector(getTasksError);
  const usersData = [...new Set(tasks.map((task) => task.userId))];

  const [filter, setFilter] = useState({
    status: "all",
    title: "",
    userId: "all",
  });

  useEffect(() => {
    if (status === stateStatuses.IDLE) {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(1);
  };

  const handleStatusChange = (taskId: number, completed: boolean) => {
    dispatch(updateTaskStatus({ id: taskId, completed }));
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filter.status === "all" ||
        task.completed.toString() === filter.status) &&
      (filter.title === "" || task.title.includes(filter.title)) &&
      (filter.userId === "all" || task.userId.toString() === filter.userId)
    );
  });

  const totalPages = Math.ceil(filteredTasks.length / PAGE_SIZE);
  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // if currentPage = 1, starting index will be 0, if 2 - starting index will be 10
  // if currentPage = 1, ending index will be 10, if 2 - 20 and so on..

  if (status === stateStatuses.LOADING) {
    return <Loader />;
  }

  if (status === stateStatuses.REJECTED) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <>
      <div className="flex justify-between p-4">
        <LinkButton to="-1">&larr; Go back</LinkButton>
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Tasks</h2>
        <div className="flex flex-col gap-4 mb-6">
          <label className="font-semibold">Filter by Status</label>
          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="pl-2 block w-full rounded-lg border-sky-500 border-2 bg-white py-1 shadow-sm"
          >
            <option value="all">All</option>
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>

          <label className="font-semibold">Filter by Title:</label>
          <input
            type="text"
            name="title"
            className="border-sky-500 border-2 rounded-lg pl-2 w-full"
            value={filter.title}
            onChange={handleFilterChange}
          />
          <label className="font-semibold">Filter by Owner:</label>
          <select
            name="userId"
            value={filter.userId}
            onChange={handleFilterChange}
            className="pl-2 block w-full rounded-lg border-sky-500 border-2 bg-white py-1 shadow-sm"
          >
            <option value="all">All</option>
            {usersData.map((user, i) => (
              <option key={i} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Owner</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.length === 0 ? (
                <tr className="flex justify-center">
                  <td className="text-center font-bold py-3">
                    No Tasks to show...
                  </td>
                </tr>
              ) : (
                currentTasks.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    handleStatus={handleStatusChange}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex border-2 mt-5">
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}

export default Tasks;
