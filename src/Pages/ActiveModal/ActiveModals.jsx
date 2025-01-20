import React from "react";
import Modal from "react-modal";
import Flex from "@react-css/flex";
import DefaultSection from "../../components/DefaultSection";
import useLanguage from "../../api/hooks/useLanguage";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function ActiveModal({ updateActivePoints , openModal }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState([
    { method: "Nazarov-Silachev", points: 8 },
    { method: "Silachev-Possevich", points: 0 },
    { method: "Maksimov", points: 8 },
    { method: "Sazonov", points: 8 },
    { method: "Pirverdian", points: 8 },
  ]);

  const [activePoints, setActivePoints] = React.useState(11);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSave() {
    updateActivePoints(activePoints);
    console.log("Saved activePoints:", activePoints);
    console.log("Saved data:", data);
    closeModal();
  }

  function handleInputChange(index, event) {
    const newData = [...data];
    newData[index].points = event.target.value;
    setData(newData);
  }

  const { t } = useLanguage();

  return (
    <div>
      <Flex style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
        <button className="active-button" onClick={openModal}>
          {t("activePoints")}
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Active Points Modal"
        >
          <h2> {t("activePoints")}</h2>
          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Метод</th>
                <th>Количество ак</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.method}</td>
                  <td>
                    <input
                      type="number"
                      value={item.points}
                      onChange={(event) => handleInputChange(index, event)}
                      style={{ width: "100%" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <label style={{ display: "block", marginTop: "20px" }}>
            <strong>Nechta Active Points?</strong>
          </label>
          <input
            type="number"
            value={activePoints}
            onChange={(e) => setActivePoints(Number(e.target.value))}
            style={{ width: "100%", padding: "5px", marginTop: "10px" }}
          />
          <button
            onClick={handleSave}
            style={{ marginTop: "10px", marginRight: "10px" }}
          >
            Save
          </button>
          <button onClick={closeModal}>Close</button>
        </Modal>
        <DefaultSection
          activePoints={activePoints}
          setActivePoints={setActivePoints}
        />
      </Flex>
    </div>
  );
}

export default ActiveModal;
