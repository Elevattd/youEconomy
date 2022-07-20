import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/slices/authSlice";
import Tables from "../Tables/Tables";

const Transactions = ({ refreshList }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [type, setType] = useState("all");

  const handleSelectChange = (e) => {
    setType(e.target.value.toString());
    refreshList(e.target.value.toString());
  };

  const content = (
    <div>
      <select name="type" value={type} onChange={handleSelectChange}>
        <option value="entry" name="type">
          Entry
        </option>
        <option value="egress" name="type">
          Egress
        </option>
        <option value="all" name="type">
          All
        </option>
      </select>
      <Tables transactions={currentUser?.all_transactions} />
    </div>
  );

  return content;
};

export default Transactions;
