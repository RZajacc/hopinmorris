import { Metadata } from "next";
import React from "react";
import Chart from "../components/charts/Chart";

type Props = {};

export const metadata: Metadata = {
  title: "plotly-chart",
};

function page({}: Props) {
  return (
    <div>
      <h1 className="font-bold">
        The chart is only temporary to test python plotly implementation
      </h1>
      <Chart />
    </div>
  );
}

export default page;
