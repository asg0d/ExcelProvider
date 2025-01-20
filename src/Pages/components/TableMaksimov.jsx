import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999, // Ensure the modal is above other content
    width: "80%", // Modal kengligi
    maxHeight: "90vh", // Modal maksimal balandligi
    overflow: "auto", // Tarkibni sig'dirish uchun
    padding: "20px", // Ichki bo'shliq
  },
};


function TableMaksimov({ onClick, showMaksimovTable, calculatedData }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <button className="button-table" onClick={() =>  {onClick(); openModal()}}>
        Maksimov
      </button>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Active Points Modal"
        >
      {showMaksimovTable && (
        <table border="1">
          <thead className="maksimov">
            <tr>
              <th>Year</th>
              <th>X = Vo</th>
              <th>Y = ln(Vw)</th>
              <th>X * Y = Vo * lnVw</th>
              <th>X² = (Vo)²</th>
            </tr>
          </thead>
          <tbody>
            {calculatedData.map((row, index) => (
              <tr key={index}>
                <td>{row.year}</td>
                <td>{row.X.toFixed(3)}</td>
                <td>{row.Y_ln.toFixed(3)}</td>
                <td>{row.XY.toFixed(3)}</td>
                <td>{row.X2.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        <button onClick={closeModal}>Close</button>
     </Modal>
    </>
  );
}

export default TableMaksimov;
