import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetAllTransactionsMutation,
  useGetCurrentQuery,
  useGetUserQuery,
} from "../../features/api/userApi";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/slices/authSlice";

const useUser = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentToken = useSelector(selectCurrentToken);
  const [getAllTransactions] = useGetAllTransactionsMutation();
  const getUser = useGetUserQuery(currentUser?.id);
  const getCurrentTransactions = useGetCurrentQuery(currentUser?.id);

  useEffect(() => {
    getAllTransactions({ id: currentUser?.id, type: "" });
  }, []);

  const refreshList = (type = "") => {
    if (type.toString() === "all") type = "";
    getAllTransactions({ id: currentUser?.id, type });
    getUser.refetch();
    getCurrentTransactions.refetch();
  };

  return {
    currentUser,
    currentToken,
    refreshList,
  };
};

export default useUser;
