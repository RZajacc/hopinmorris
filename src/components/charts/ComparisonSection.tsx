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
  label1: string;
  label2: string;
};

function ComparisonSection({
  teamPlotData,
  depPlotData,
  label1,
  label2,
}: Props) {
  // Currently selected plot
  const [plot, setPlot] = useState("plot1");

  // Base class for a button
  const baseClass =
    "py-2 px-3 rounded-xl border shadow-md shadow-gray-600 hover:bg-green-600 transition-colors duration-700 ";
  return (
    <div>
      <section className="space-x-3 mb-5 flex justify-center">
        {/* Buttons for selecting currently active plot */}
        <button
          className={
            baseClass +
            `${
              plot === "plot1"
                ? "bg-black text-white font-semibold"
                : "bg-white border-2 border-black"
            }`
          }
          onClick={() => {
            setPlot("plot1");
          }}
        >
          {label1}
        </button>
        <button
          className={
            baseClass +
            `${
              plot === "plot2"
                ? "bg-black text-white font-semibold"
                : "bg-white border-2 border-black"
            }`
          }
          onClick={() => {
            setPlot("plot2");
          }}
        >
          {label2}
        </button>
      </section>
      {/* Plot with filled with the data based on selected plot */}
      <PlotlyChart data={plot === "plot1" ? teamPlotData : depPlotData} />
    </div>
  );
}

export default ComparisonSection;
