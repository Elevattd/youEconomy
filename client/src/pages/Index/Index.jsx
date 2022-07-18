import React, { useEffect } from "react";
// import Tables from "../../components/Tables/Tables";

const Index = ({ currentUser }) => {
  useEffect(() => {}, [currentUser?.all_transactions]);
  const content = (
    <div>
      <div>
        {/* <h4 className="danger"> Balance: $ {currentUser.balance},00 </h4> */}
        <h4 className="danger"> Balance: $ 0000,00 </h4>
      </div>
      {/* <Tables transactions={currentUser?.current_transactions} /> */}
    </div>
  );
  return content;
};

export default Index;
