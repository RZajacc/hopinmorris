import { Metadata } from "next";
import { promises as fs } from "fs";
import React from "react";
import Chart from "../components/charts/Chart";

type Props = {};

export const metadata: Metadata = {
  title: "plotly-chart",
};

async function page({}: Props) {
  const file = await fs.readFile(
    process.cwd() + "/src/assets/chart.json",
    "utf8"
  );
  const data = JSON.parse(file);
  return (
    <div>
      <h1 className="font-bold">
        The chart is only temporary to test python plotly implementation
      </h1>
      <Chart data={data} />
    </div>
  );
}

export default page;
