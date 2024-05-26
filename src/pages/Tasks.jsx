import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus } from "../features/tasks/tasksSlice";
import Task from "../features/tasks/Task";

function Tasks() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const PAGE_SIZE = 10;
  const status = useSelector((state) => state.tasks.status);
  const tasks = useSelector((state) => state.tasks.tasks);
  const usersData = [...new Set(tasks.map((task) => task.userId))];

  const [filter, setFilter] = useState({
    status: "all",
    title: "",
    userId: "all",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(1);
  };

  const handleStatusChange = (taskId, completed) => {
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

  return (
    <div className="container mx-auto p-4 w-[800px]">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="flex flex-col gap-6 mb-6">
        <label className="font-semibold">Filter by Status</label>
        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="mt-1 pl-2 block w-full rounded-lg border-sky-500 border-2 bg-white py-1 shadow-sm"
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
          className="mt-1 pl-2 block w-full rounded-lg border-sky-500 border-2 bg-white py-1 shadow-sm"
        >
          <option value="all">All</option>
          {usersData.map((user, i) => (
            <option key={i} value={user.id}>
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
            {currentTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleStatus={handleStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex border-2 p-1 mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`px-3 py-1 cursor-pointer rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-400"
            }`}
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
