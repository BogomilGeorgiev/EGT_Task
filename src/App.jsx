import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Tasks from "./pages/Tasks";
import UserPosts from "./pages/UserPosts";
import Users from "./pages/Users";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Users />,
      },
      {
        path: "/posts/:userId",
        element: <UserPosts />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
