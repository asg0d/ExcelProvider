import React, { useState } from "react";
import useLanguage from "../../api/hooks/useLanguage";
import Modal from "react-modal";
import {
  TableKambarov,
  TableMaksimov,
  TableNazarov,
  TablePivardyan,
  TableSazanov,
  TableSipachev,
} from "../components";



function FileUploads({ tableData }) {
  const [calculatedData, setCalculatedData] = useState([]);
  const [results, setResults] = useState({
    ΣX: 0,
    ΣY: 0,
    ΣXY: 0,
    ΣX2: 0,
    ΣX2_squared: 0,
  });
  const [showResults, setShowResults] = useState(false);
  const [showNazarovTable, setShowNazarovTable] = useState(false);
  const [showSipachevTable, setShowSipachevTable] = useState(false);
  const [showMaksimovTable, setShowMaksimov] = useState(false);
  const [showSazanovTable, setShowSazanov] = useState(false);
  const [showPrivardyanTable, setShowPrivardyan] = useState(false);
  const [showKambarovTable, setShowKambarov] = useState(false);

  const { t } = useLanguage();

  const calculateTable = () => {
    const filteredData = tableData.filter((row) => row[5] !== "1");

    const calcData = filteredData.map((row) => {
      const year = row[0];
      const X = parseFloat(row[3]) || 0;
      const Y = row[2] && row[1] ? parseFloat(row[2]) / parseFloat(row[1]) : 0;

      const Y_ln = Y > 0 ? Math.log(Y) : 0;

      return {
        year,
        X,
        Y,
        XY: X * Y,
        Y_ln,
        X2: Math.pow(X, 2),
      };
    });

    const ΣX = calcData.reduce((sum, row) => sum + row.X, 0);
    const ΣY = calcData.reduce((sum, row) => sum + row.Y, 0);
    const ΣXY = calcData.reduce((sum, row) => sum + row.XY, 0);
    const ΣX2 = calcData.reduce((sum, row) => sum + row.X2, 0);
    const ΣX2_squared = Math.pow(ΣX, 2);

    const N = calcData.length;
    const A = (N * ΣXY - ΣX * ΣY) / (N * ΣX2 - ΣX2_squared);
    const B = (ΣY - A * ΣX) / N;

    setCalculatedData(calcData);
    setResults({ ΣX, ΣY, ΣXY, ΣX2, ΣX2_squared, A, B });
    setShowResults(true);
    // setShowTableButton(true);

    openModal()
  };

  const toggleTable = (setTableState) => {
    setTableState((prev) => !prev);
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button className="active-button" onClick={calculateTable}>
        {t("calculate")}
      </button>

        <TableNazarov
          onClick={() => setShowNazarovTable(true)}
          showNazarovTable={showNazarovTable}
          calculatedData={calculatedData}
        />
        <TableSipachev
          onClick={() => setShowSipachevTable(true)}
          showSipachevTable={showSipachevTable}
          calculatedData={calculatedData}
        />
        <TableMaksimov
          onClick={() => setShowMaksimov(true)}
          showMaksimovTable={showMaksimovTable}
          calculatedData={calculatedData}
        />
        <TableSazanov
          onClick={() => setShowSazanov(true)}
          showSazanovTable={showSazanovTable}
          calculatedData={calculatedData}
        />
        <TablePivardyan
          onClick={() => setShowPrivardyan(true)}
          showPrivardyanTable={showPrivardyanTable}
          calculatedData={calculatedData}
        />
        <TableKambarov
          onClick={() => setShowKambarov(true)}
          showKambarovTable={showKambarovTable}
          calculatedData={calculatedData}
        />
    </>
  );
}

export default FileUploads;
