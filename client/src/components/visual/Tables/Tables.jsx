import React, { useState } from "react";
import useUser from "../../../utils/hooks/useUser";
import PostTransaction from "../PostTransaction/PostTransaction";
import UpdateTransaction from "../UpdateTransaction/UpdateTransaction";
import { useDeleteTransactionMutation } from "../../../features/api/userApi";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";
import { Toast } from "../../../utils/alerts";
import Swal from "sweetalert2";

const Tables = ({ transactions, button }) => {
  const { currentUser, refreshList } = useUser();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [inputData, setInputData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);

  const handleUpdate = async (item) => {
    setInputData(item);
    setUpdateModalShow(true);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: `
        Do you want to delete the transaction?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "orange",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
      }).then((r) => {
        if (r.isConfirmed) {
          const response = deleteTransaction({
            userId: currentUser.id,
            id: id,
          });
          refreshList();
          Toast.fire({
            icon: "warning",
            title: `Transaction deleted!`,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <br />
      {button &&
        (currentUser?.balance >= 0 ? (
          <div className="row">
            <Alert key="success" variant="success">
              Balance: $ {currentUser?.balance},00
            </Alert>
          </div>
        ) : (
          <div className="row">
            <Alert key="danger" variant="danger">
              Balance: $ {currentUser?.balance},00
            </Alert>
          </div>
        ))}{" "}
      <br />
      <Table striped variant="dark">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
            {!button && <th></th>}
          </tr>
        </thead>
        <tbody>
          {transactions?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{`${item?.concept[0].toUpperCase()}${item.concept.slice(
                  1
                )} `}</td>
                {item.type === "entry" ? (
                  <td> {`$  ${item.value},00`}</td>
                ) : (
                  <td>$-{item.value},00</td>
                )}
                <td>{item.date.substring(0, 10).split("-").join("/")}</td>
                <td>
                  {item.type === "entry" ? (
                    <h4 className="text-success">Entry</h4>
                  ) : (
                    <h4 className="text-danger">Egress</h4>
                  )}
                </td>
                {!button && (
                  <td>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        handleUpdate(item);
                      }}
                    >
                      Update
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <br />
      {button && (
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setModalShow(true)}
          >
            New Transaction.
          </Button>
        </div>
      )}
      <PostTransaction show={modalShow} onHide={() => setModalShow(false)} />
      <UpdateTransaction
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
        refreshList={refreshList}
        inputData={inputData}
      />
    </div>
  );
};

export default Tables;
