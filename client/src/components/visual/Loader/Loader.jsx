import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectCurrentAuthFetched,
  selectCurrentToken,
} from "../../../features/slices/authSlice";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  const currentToken = useSelector(selectCurrentToken);
  const authFetched = useSelector(selectCurrentAuthFetched);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (currentToken) return navigate(from, { replace: true });
    if (authFetched) return navigate("/", { replace: true });
  }, [currentToken, authFetched]);

  return <Spinner animation="border" variant="primary" />;
};

export default Loader;
