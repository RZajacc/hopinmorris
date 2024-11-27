"use client";
import React, { useState } from "react";
import PlotlyChart from "./PlotlyChart";

type Props = {
  teamPlotData: {
    data: any;
    layout: any;
  };
  depPlotData: {
    data: any;
    layout: any;
  };
};

function ComparisonSection({ teamPlotData, depPlotData }: Props) {
  const [plot, setPlot] = useState("team");

  const baseClass =
    "py-2 px-3 rounded-xl border shadow-md shadow-gray-600 hover:bg-green-300 transition-colors duration-700 ";
  return (
    <div>
      <section className="space-x-3 my-5 flex justify-center">
        <button
          className={
            baseClass +
            `${plot === "team" ? "bg-green-400 font-semibold" : "bg-gray-300"}`
          }
          onClick={() => {
            setPlot("team");
          }}
        >
          Team
        </button>
        <button
          className={
            baseClass +
            `${
              plot === "department"
                ? "bg-green-400 font-semibold"
                : "bg-gray-300"
            }`
          }
          onClick={() => {
            setPlot("department");
          }}
        >
          Department
        </button>
      </section>
      <PlotlyChart data={plot === "team" ? teamPlotData : depPlotData} />
    </div>
  );
}

export default ComparisonSection;
