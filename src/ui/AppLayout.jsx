import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex align-middle">
      {isLoading && <Loader />}

      <div className="mx-auto">
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
