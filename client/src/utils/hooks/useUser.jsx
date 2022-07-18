import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/slices/authSlice";

const useUser = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentToken = useSelector(selectCurrentToken);

  return {
    currentUser,
    currentToken,
  };
};

export default useUser;
