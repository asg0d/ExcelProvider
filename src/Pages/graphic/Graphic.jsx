import React, { useState, useEffect } from "react";
import {
  Chart,
  ScatterController,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useLanguage from "../../api/hooks/useLanguage";

Chart.register(
  ScatterController,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement
);

function Graphic() {
  const [canvasJS, setCanvasJS] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [scaleX, setScaleX] = useState(100);
  const [scaleY, setScaleY] = useState(10);
  const [a, setA] = useState(0.0000024643);
  const [b, setB] = useState(10.721025);

  const { t } = useLanguage();

  useEffect(() => {
    import("@canvasjs/react-charts")
      .then((module) => {
        setCanvasJS(module.default);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading CanvasJS:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading chart...</div>;
  }

  if (error) {
    return <div>Error loading chart component</div>;
  }

  const data = {
    datasets: [
      {
        label: t("activePoints"),
        data: [
          { x: 10, y: 2 },
          { x: 20, y: 4 },
          { x: 30, y: 6 },
        ],
        backgroundColor: "magenta",
        type: "scatter",
      },
      {
        label: t("trendLine"),
        data: [
          { x: 0, y: b },
          { x: 100, y: a * 100 + b },
        ],
        borderColor: "blue",
        borderWidth: 2,
        type: "line",
      },
    ],
  };

  const chartJsOptions = {
    scales: {
      x: { max: scaleX },
      y: { max: scaleY },
    },
  };

  const canvasJsOptions = {
    animationEnabled: true,
    title: {
      text: "Number of New Customers",
    },
    axisY: {
      title: "Number of Customers",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "spline",
        showInLegend: true,
        dataPoints: [
          { y: 155, label: "Jan" },
          { y: 150, label: "Feb" },
          { y: 152, label: "Mar" },
          { y: 148, label: "Apr" },
          { y: 142, label: "May" },
          { y: 150, label: "Jun" },
          { y: 146, label: "Jul" },
          { y: 149, label: "Aug" },
          { y: 153, label: "Sept" },
          { y: 158, label: "Oct" },
          { y: 154, label: "Nov" },
          { y: 150, label: "Dec" },
        ],
      },
      {
        type: "spline",
        showInLegend: true,
        dataPoints: [
          { y: 172, label: "Jan" },
          { y: 173, label: "Feb" },
          { y: 175, label: "Mar" },
          { y: 172, label: "Apr" },
          { y: 162, label: "May" },
          { y: 165, label: "Jun" },
          { y: 172, label: "Jul" },
          { y: 168, label: "Aug" },
          { y: 175, label: "Sept" },
          { y: 170, label: "Oct" },
          { y: 165, label: "Nov" },
          { y: 169, label: "Dec" },
        ],
      },
    ],
  };

  return (
    <div>
      <button 
        className="active-button graphic"
        onClick={() => setShowGraph(!showGraph)}
      >
        {showGraph ? t("hideGraph") : t("showGraph")}
      </button>

      {showGraph && (
        <div>
          <h3 className="graphic">{t("graphTitle")}</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
                
            }}
          >
            <div style={{ height: "300px", width: "600px" }}>
              <Line data={data} options={chartJsOptions} />
            </div>

            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <div style={{ marginTop: "20px" }}>
                <label>
                  {t("changeXScale")}:
                  <input
                    type="number"
                    value={scaleX}
                    onChange={(e) => setScaleX(Number(e.target.value))}
                  />
                </label>
                <label style={{ marginLeft: "20px" }}>
                  {t("changeYScale")}:
                  <input
                    type="number"
                    value={scaleY}
                    onChange={(e) => setScaleY(Number(e.target.value))}
                  />
                </label>
              </div>

              <div style={{ marginTop: "20px" }}>
                <label>
                  {t("changeAValue")}:
                  <input
                    type="number"
                    step="0.00000001"
                    value={a}
                    onChange={(e) => setA(Number(e.target.value))}
                  />
                </label>
                <label style={{ marginLeft: "20px" }}>
                  {t("changeBValue")}:
                  <input
                    type="number"
                    step="0.01"
                    value={b}
                    onChange={(e) => setB(Number(e.target.value))}
                  />
                </label>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h4>{t("lineEquationTitle")}</h4>
                <p>
                  Y = {a}X + {b} ({t("coefficientA")} = {a}, {t("coefficientB")} = {b})
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <h3>{t("canvasJsChartTitle")}</h3>
            <canvasJS.CanvasJSChart options={canvasJsOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Graphic;
