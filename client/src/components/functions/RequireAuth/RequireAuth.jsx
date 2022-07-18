import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectIsLoading } from "../../../features/slices/uiSlice";

import Loader from "../../visual/Loader/Loader";

const RequireAuth = () => {
  const loading = useSelector(selectIsLoading);

  if (loading) {
    return <Loader />;
  }

  return <Outlet />;
};

export default RequireAuth;
