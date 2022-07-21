import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { useDispatch } from "react-redux";
import { useCreateTransactionMutation } from "../../../features/api/userApi";
import useUser from "../../../utils/hooks/useUser";
import { Toast } from "../../../utils/alerts";
import { validateForm } from "../Login/hooks/useValidate";

const Transactions = (props) => {
  const { currentUser, refreshList } = useUser();
  const [errorInput, setErrorInput] = useState({});
  const [input, setInput] = useState({});
  const [createTransaction] = useCreateTransactionMutation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!Object.keys(input).length || Object.keys(errorInput).length) {
      Toast.fire({
        icon: "error",
        title: `Complete the inputs`,
      });
    } else {
      try {
        dispatch(
          await createTransaction({ userId: currentUser.id, data: input }).then(
            (r) => {
              if (r.data.msg) {
                refreshList();
                props.onHide();
                Toast.fire({
                  icon: "success",
                  title: `Transaction created!`,
                });
                setInput({});
                setErrorInput({});
              }
            }
          )
        );
      } catch (error) {
        return error;
      }
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();

    if (e.target.name !== "date") {
      setInput({ ...input, [e.target.name]: e.target.value });
    } else if (e.target.name === "date") {
      const date = new Date(e.target.value).toISOString();
      setInput({ ...input, date: date });
    }
    setErrorInput(validateForm({ ...input, [e.target.name]: e.target.value }));
    console.log("errors", Object.keys(errorInput).length);
    console.log("input", input);
    console.log("inputLength", Object.keys(input).length);
  };

  const content = (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Transaction.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-2 ">
          <select
            aria-label="Default select example"
            name="type"
            onChange={handleInputChange}
          >
            <option selected disabled value="default">
              Select the transaction
            </option>
            <option value="egress">Egress</option>
            <option value="entry">Entry</option>
          </select>
          <span className="input-group-text" id="basic-addon1">
            $
          </span>

          <input
            aria-label="Text input with dropdown button"
            type="number"
            name="value"
            onChange={handleInputChange}
          />
          <span className="input-group-text">.00</span>
        </InputGroup>
        <div className="input-group">
          <span className="input-group-text">Description.</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            name="concept"
            onChange={handleInputChange}
          />
        </div>
        <Form.Control
          type="date"
          name="date"
          // max={new Date().toISOString().slice(0, 8)}
          min="2020-01-01"
          max="2026-12-31"
          onChange={handleInputChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Form.Group className="mb-3">
          {errorInput.concept && (
            <h6 className="text-danger">{errorInput.concept}</h6>
          )}
          {errorInput.type && (
            <h6 className="text-danger">{errorInput.type}</h6>
          )}
          {errorInput.value && (
            <h6 className="text-danger">{errorInput.value}</h6>
          )}
          {errorInput.date && (
            <h6 className="text-danger">{errorInput.date}</h6>
          )}
        </Form.Group>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          variant="primary "
          size="md"
          type="submit"
        >
          Confirm
        </Button>

        {/* {errorsEmail.email && (
					<p className="text-danger">{errorsEmail.email}</p>
				)}
				{errorsName.name && <p className="text-danger">{errorsName.name}</p>}
				{errorsPassword.password && (
					<p className="text-danger">{errorsPassword.password}</p>
				)} */}
      </Modal.Footer>
    </Modal>
  );

  return content;
};

export default Transactions;
