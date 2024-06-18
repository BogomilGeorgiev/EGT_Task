import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      {isLoading && <Loader />}

      <div className="w-full mx-auto sm:w-11/12 md:w-10/12 lg:w-8/12 px-4">
        <main className="py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
