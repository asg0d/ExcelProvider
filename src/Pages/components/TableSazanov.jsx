import React from 'react';
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


function TableSazanov({ onClick, showSazanovTable, calculatedData }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button className="button-table" onClick={() => { onClick(); openModal(); }}>
        Sazanov
      </button>
         
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Active Points Modal"
        >
      {showSazanovTable && (
        <table border="1">
          <thead className="sazanov">
            <tr>
              <th>Year</th>
              <th>X = Vo</th>
              <th>Y = lnVl</th>
              <th>X * Y = Vo * lnVl</th>
              <th>X² = (Vo)²</th>
            </tr>
          </thead>
          <tbody>
            {calculatedData.map((row, index) => (
              <tr key={index}>
                <td>{row.year}</td>
                <td>{row.X.toFixed(3)}</td>
                <td>{row.Y.toFixed(3)}</td>
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

export default TableSazanov;
