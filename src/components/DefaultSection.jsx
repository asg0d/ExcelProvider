import React from "react";
import useLanguage from "../api/hooks/useLanguage";

function DefaultSection({ activePoints, setActivePoints }) {
  const { t } = useLanguage();

  return (
    <div className="default-section">
      <h3 className="default-text"> {t("n default")}</h3>
      <input
        type="number"
        id="number"
        min="0"
        max="100"
        placeholder="11"
        value={activePoints}
        onChange={(e) => setActivePoints(Number(e.target.value))}
      />
      <p className="default-text">fo.:</p>
      <input type="text" className="default-input" placeholder="0.15" />
      <p className="default-text">fw</p>
      <input type="text" className="default-input" placeholder="0.85" />
    </div>
  );
}

export default DefaultSection;
