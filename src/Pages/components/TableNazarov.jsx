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

function TableNazarov({ onClick, showNazarovTable, calculatedData }) {
  const [modalIsOpen , setIsOpen ] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <>
      <button className="button-table" onClick={() => {onClick(); openModal(); }}>
        Nazarov-Sipachev
      </button>
          
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Active Points Modal"
      
      >
      {showNazarovTable && (
        <>
          <table border="1">
            <thead className="two-thead">
              <tr>
                <th>Year</th>
                <th>X (water)</th>
                <th>Y (Liquid / Oil)</th>
                <th>XY</th>
                <th>X²</th>
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
        </>
      )}
      <button onClick={closeModal}>close</button>
      </Modal>
    </>
  );
}

export default TableNazarov;
