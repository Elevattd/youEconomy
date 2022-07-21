import React from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { selectCurrentUser } from "../../../features/slices/authSlice";
import {
  useLoginMutation,
  useLogOutMutation,
} from "../../../features/api/authApi";

const Logout = () => {
  const [logOut] = useLogOutMutation();
  const currentUser = useSelector(selectCurrentUser);
  const [{ isLoading }] = useLoginMutation();

  const handleClick = (e) => {
    e.preventDefault();
    logOut();
    window.location.reload(true);
  };

  const content =
    currentUser && Object.keys(currentUser).length ? (
      <div>
        <Button
          variant="primary "
          size="md"
          onClick={handleClick}
          disabled={isLoading}
        >
          Logout
        </Button>
      </div>
    ) : null;

  return content;
};

export default Logout;
