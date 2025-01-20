import Flex from '@react-css/flex';
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


function TableKambarov({ onClick, showKambarovTable, calculatedData}) {
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
    Kambarov
      </button>


      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Active Points Modal"
        >
     {showKambarovTable && (
        <table border="1">
          <thead className="kambarov">
            <tr>
              <th>Year</th>
              <th>X = Vl - 1</th>
              <th>Y = Vl</th>
              <th>X * Y = Vl - 1 * Vl</th>
              <th>X² = (Vl - 1)²</th>
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
   
     <button className='close' onClick={closeModal}>Close</button>

     </Modal>

     
    </>
  );
}

export default TableKambarov;
