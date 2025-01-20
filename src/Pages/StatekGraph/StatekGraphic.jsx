import React, { useState } from 'react';
import { Chart } from "react-google-charts";

export const data = [
  ["Element", "Density", { role: "style" }],
  ["Nazarov", 200, "#b87333"],
  ["Sipachev", 300, "silver"],
  ["Sazanov", 0, "gold"],
  ["Privardyan", 0, "color: #e5e4e2"],
  ["Kambarov", 500, "color: #e5e4e2"],
  ["Maksimov", 900, "color: #e5e4e2"],
];


const StatekGraphic = () => {
    const [showChart , setShowChart] = useState(false);

    const handleButtonClick = () => {
      setShowChart(true)
    }

     
    
    return (
        <>
        <button 
         className="active-button graphic"
          onClick={handleButtonClick}
         >
           Resultate
        </button>

      {showChart && 
        <Chart 
        chartType="ColumnChart"
         width="80%" 
         height="80%" 
         style={{marginTop: "20px"}}
        data={data} />
      }
            
        </>
    );
}

export default StatekGraphic;
