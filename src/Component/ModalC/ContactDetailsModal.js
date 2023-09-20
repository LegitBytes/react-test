import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const ContactDetailsModal = ({ data, showModalC, setShowModalC }) => {
  const handleClose = () => {
    setShowModalC(false);
  };
  // console.table(data);
  return (
    <div>
      <Modal show={showModalC} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Contact Details</Modal.Title>
          <div>
            <Button
              onClick={handleClose}
              style={{
                backgroundColor: "white",
                borderColor: "var(--buttonAColor)",
                color: "black",
              }}
            >
              Close
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body style={{ overflow: "hidden" }}>
          <div
            style={{
              overflow: "hidden",
            }}
          >
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Id</th>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{data.email ?? "NA"}</td>
                </tr>
                <tr>
                  <th>Country</th>
                  <td>{data.country.iso ?? "NA"}</td>
                </tr>
                <tr>
                  <th>Phone Number</th>
                  <td>{data.phone_number ?? data.full_phone_number ?? "NA"}</td>
                </tr>
                <tr>
                  <th>Color</th>
                  <td>{data.color ?? "NA"}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default ContactDetailsModal;
