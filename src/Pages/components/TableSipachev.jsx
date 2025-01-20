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
    zIndex: 9999,
    width: "80%", 
    maxHeight: "90vh", 
    overflow: "auto", 
    padding: "20px", 
  },
};

function TableSipachev({ onClick, showSipachevTable, calculatedData }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  console.log(modalIsOpen);
  
  return (
    <>
      <button className="button-table" onClick={() => {onClick() ; openModal();}}>
        Sipachev-Posivech
      </button>
        
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Active Points Modal"
        >
      {showSipachevTable && (
        <table border="1">
          <thead className="sipachev">
            <tr>
              <th>Year</th>
              <th>Vl</th>
              <th>Vl/Vo</th>
              <th>Vl * Vl/Vo</th>
              <th>V²</th>
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

export default TableSipachev;
