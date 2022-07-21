import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useUser from "../../../utils/hooks/useUser";
import { useUpdateTransactionMutation } from "../../../features/api/userApi";
import { Toast } from "../../../utils/alerts";
/* styles */
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";

const UpdateTransaction = (props) => {
  const { refreshList } = useUser();
  const [input, setInput] = useState({
    id: "",
    concept: "",
    type: "",
    value: 0,
    date: "",
  });
  const [updateTransaction] = useUpdateTransactionMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(props.inputData).length) {
      setInput(props.inputData);
    }
  }, [props.inputData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        await updateTransaction({
          transaction: input.id,
          inputData: {
            concept: input.concept,
            value: input.value,
            date: input.date,
          },
        }).then((r) => {
          if (r.data.msg) {
            refreshList();
            props.onHide();
            Toast.fire({
              icon: "success",
              title: `Transaction updated!`,
            });
          }
        })
      );
    } catch (error) {
      console.log(error);
    }

    setInput({ concept: "", type: "", value: null });
  };

  const handleInputChange = (e) => {
    e.preventDefault();

    if (e.target.name !== "date") {
      setInput({ ...input, [e.target.name]: e.target.value });
    } else if (e.target.name === "date") {
      const date = new Date(e.target.value).toISOString();

      setInput({ ...input, date: date });
    }
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
          Update transaction.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-2 ">
          <span className="input-group-text" id="basic-addon1">
            $
          </span>

          <input
            aria-label="Text input with dropdown button"
            type="number"
            name="value"
            value={input?.value}
            onChange={handleInputChange}
          />
          <span className="input-group-text">.00</span>
        </InputGroup>
        <div className="input-group">
          <span className="input-group-text">Description.</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            value={input?.concept}
            name="concept"
            onChange={handleInputChange}
          />
        </div>
        <Form.Control
          type="date"
          name="date"
          // max={new Date().toISOString().slice(0, 8)}
          //   value={input?.date.substring(0, 10).split("-").join("/")}
          min="2020-01-01"
          max="2026-12-31"
          onChange={handleInputChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check" />
        </Form.Group>
        <Button
          onClick={handleSubmit}
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
export default UpdateTransaction;
