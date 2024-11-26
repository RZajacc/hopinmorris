"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamic import was necessary to make plotly work without throwing an error
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Props = {
  data: any;
};

function Chart({ data }: Props) {
  return <Plot data={data.data} layout={data.layout} />;
}

export default Chart;
