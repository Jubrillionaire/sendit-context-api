import React, { useEffect, useState, useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import { FaTrashAlt } from "react-icons/fa";
import "../styles/profile.css";
import { ParcelContext } from "../contexts/ParcelContext";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";

const Profile = props => {

  const {loadParcelsAction, editDestinationAction, cancelParcel, setLoading, loading, parcels, errMsg} = useContext(ParcelContext)
  let subtitle;

  useEffect(() => {
    loadParcelsAction();
    setLoading();
  }, []);


  console.log(parcels)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [destination, setDestination] = useState("");

  const handleChange = e => {
    setDestination(e.target.value);
  };

  const handleEdit = id => {
    editDestinationAction(destination, id);
    setModal(false);
  };

  const handleCancel = id => {
    props.cancelParcel(id);
  };

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const table =  parcels.map(data => {
    return (
      <tbody key={data.id}>
        <tr>
          <span>
            <Button color="danger" onClick={toggle}>
              edit destination
              <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>
                  Please enter A preferred destination
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={() => handleEdit(data.id)}>
                    <Label style={{ marginRight: 20 }}>Destination:</Label>
                    <input type="text" onChange={handleChange} />
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => handleEdit(data.id)}>
                    Submit
                  </Button>{" "}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </Button>
          </span>
          <th scope="row">{data.id}</th>
          <td>{data.pickup_location}</td>
          <td>{data.destination}</td>
          <td>{data.recipient_name}</td>
          <td>{data.recipient_phone_no}</td>
          <td>{data.status}</td>
          <button
            disabled={data.status === "cancelled" ? true : false}
            onClick={() => handleCancel(data.id)}
            className="btn btn-danger p-1 pri"
          >
            <FaTrashAlt />
          </button>
        </tr>
      </tbody>
    );
  });
  if (loading) {
    return (
      <Spinner
        className="spinner"
        animation="border"
        variant="dark"
        role="status"
      >
        <span className="sr-only ">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div className="all">
      <div className="card" style={{ width: "20rem" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h5>Number of orders: { parcels.length} </h5>{" "}
          </li>
          <li className="list-group-item">
            <h5>
              Orders in Transit:{" "}
              { parcels.filter(data => data.status === "in transit").length}{" "}
            </h5>
          </li>
          <li className="list-group-item">
            <h5>
              Delivered:{" "}
              { parcels.filter(data => data.status === "delivered").length}{" "}
            </h5>
          </li>
          <li className="list-group-item">
            <h5>
              Cancelled Orders:{" "}
              { parcels.filter(data => data.status === "cancelled").length}
            </h5>
          </li>
        </ul>
      </div>
      <div className="parcels">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th scope="col">ID</th>
              <th scope="col">Pickup Location</th>
              <th scope="col">Destination</th>
              <th scope="col">Recipient Name</th>
              <th scope="col">Recipient Phone-No</th>
              <th scope="col">Status</th>
              <th></th>
            </tr>
          </thead>
          {table}
        </table>
      </div>
    </div>
  );
};


export default Profile;
