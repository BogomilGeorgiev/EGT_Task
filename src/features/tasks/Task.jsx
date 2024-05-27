function Task({ task, handleStatus }) {
  return (
    <tr>
      <td className="px-4 py-2 border-b">{task.title}</td>
      <td className="px-4 py-2 border-b">{task.userId}</td>
      <td className="px-4 py-2 border-b">
        {task.completed ? "Completed" : "Not Completed"}
      </td>
      <td className="px-4 py-2 border-b">
        <button
          className={`font-semibold w-auto sm:w-40 h-12 sm:h-16 px-2 py-2 bg-sky-200 rounded-2xl whitespace-pre-wrap flex items-center justify-center ${
            task.completed
              ? "bg-green-500 hover:bg-red-500"
              : "bg-red-500 hover:bg-green-500"
          }`}
          onClick={() => handleStatus(task.id, !task.completed)}
        >
          Set as {task.completed ? "Not Completed" : "Completed"}
        </button>
      </td>
    </tr>
  );
}

export default Task;
