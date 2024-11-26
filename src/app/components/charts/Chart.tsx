"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamic import was necessary to make plotly work without throwing an error
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Props = {};

function Chart({}: Props) {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
        },
        { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
      ]}
      layout={{ width: 320, height: 240, title: { text: "A Fancy Plot" } }}
    />
  );
}

export default Chart;
