import React, { useContext, useRef, useState } from "react";
import * as XLSX from "xlsx";
import Flex from "@react-css/flex";
import ActiveModal from "../Pages/ActiveModal/ActiveModals";
import FileUploads from "../Pages/FileUpload/FileUploads";
import Language from "./Language";
import StatekGraphic from "../Pages/StatekGraph/StatekGraphic";
import useLanguage from "../api/hooks/useLanguage";
import { TranslateData } from "../utils/TranslateData";
import { LangContext } from "../context/LanguageContext";
import Graphic from "../Pages/graphic/Graphic";

function TableRight() {
  const [tableData, setTableData] = useState([]);
  const { language } = useContext(LangContext);
  const { t } = useLanguage();
  const [showContent, setShowContent] = useState(false);
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);

  try {
    const columnKeys = [
      "N°",
      "year",
      "oil",
      "liquid",
      "waters",
      "watercut",
      "active point",
    ];

    const columns = columnKeys
      .filter((key) => key.trim() !== "")
      .map((key) => {
        const translatedKey =
          TranslateData.columns[language]?.[columnKeys.indexOf(key)] || key;
        return t(translatedKey);
      });

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          const formattedData = json.map((row) => row.map((cell) => cell || ""));

          const totalRows = formattedData.length;
          const activeCount = 11;

          const updatedData = formattedData.map((row, index, array) => {
            const year = parseInt(row[0]) || 0;
            const liquid = parseFloat(row[2]) || 0;
            const oil = parseFloat(row[1]) || 0;
            const waters = Math.abs((liquid - oil).toFixed(3));

            const previousRow = index > 0 ? array[index - 1] : null;
            const previousLiquid = previousRow ? parseFloat(previousRow[2]) || 0 : 0;

            const watercut =
              index > 0 && previousLiquid > 0
                ? (((liquid - previousLiquid) / previousLiquid) * 100).toFixed(2)
                : "0.00";

            const isActive = index >= totalRows - activeCount ? "1" : "0";

            return [
              ...row.slice(0, 3),
              waters,
              watercut,
              ...row.slice(4),
              isActive,
            ];
          });

          setTableData(updatedData);
        };
        reader.readAsArrayBuffer(file);
      }
    };

    const updateActivePoints = (updatedActivePoints) => {
      const totalRows = tableData.length;
      const updatedData = tableData.map((row, index) => {
        const isActive = index >= totalRows - updatedActivePoints ? "1" : "0";
        const newRow = [...row];
        newRow[5] = isActive;
        return newRow;
      });
      setTableData(updatedData);
    };

    const handleImportClick = () => {
      setShowContent(true); 
      if (fileInputRef.current) {
        fileInputRef.current.click(); 
      }
    };

    return (
      <div className="wrapper"  style={{ textAlign: "center", marginTop: "50px" }}>
 
        {!showContent ? ( 
      <div className="wrap">
            <button
            className="import"
            onClick={handleImportClick} 
            style={{
              cursor: "pointer",
              fontSize: "18px",
              border: "1px solid",
              padding: "6px",
              display: "inline-block",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {t("import")}
          </button>
          <p className="text">Drag a document here or click to file</p>
      </div>
        ) : (
          <>
            <table
              border="1"
              style={{
                width: "80%",
                borderCollapse: "collapse",
                marginTop: "10px",
              }}
            >
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{rowIndex + 1}</td>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <Flex style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
              <label
                className="import"
                htmlFor="fileInput"
                style={{
                  cursor: "pointer",
                  fontSize: "18px",
                  border: "1px solid",
                  padding: "6px",
                  display: "inline-block",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                {t("import")}
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
                ref={fileInputRef} // Fayl yuklash elementiga murojaat qilish
                style={{ display: "none" }}
              />
              <ActiveModal updateActivePoints={updateActivePoints} />
              <Language />
            </Flex>

          <Flex>
          <FileUploads tableData={tableData} />
          </Flex>
          <Graphic />
         <StatekGraphic />
          </>
        )}
      </div>
    );
  } catch (err) {
    console.error('Error in TableRight:', err);
    return (
      <div style={{ color: 'red', padding: '20px' }}>
        <h2>Error loading table</h2>
        <pre>{err.toString()}</pre>
      </div>
    );
  }
}

export default TableRight;
