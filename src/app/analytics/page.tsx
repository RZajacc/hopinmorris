import { Metadata } from "next";
import { promises as fs } from "fs";
import React from "react";
import PlotlyChart from "@/components/charts/PlotlyChart";
import PickupStations from "@/components/stationsMap/PickupStations";
import dbConnect from "@/lib/dbConnect";
import user from "@/models/user";
import ComparisonSection from "@/components/charts/ComparisonSection";

export const metadata: Metadata = {
  title: "Analytics",
};

async function page() {
  // Collect the department data
  const departmentFile = await fs.readFile(
    process.cwd() + "/src/assets/donut_chart_departments.json",
    "utf8"
  );
  const departmentData = JSON.parse(departmentFile);

  // Collect the team data
  const teamFile = await fs.readFile(
    process.cwd() + "/src/assets/donut_chart_team.json",
    "utf8"
  );
  const teamtData = JSON.parse(teamFile);

  // await dbConnect();

  // const users = await user.find({});

  return (
    <div>
      <h1 className="font-bold">
        The chart is only temporary to test python plotly implementation
      </h1>
      <ComparisonSection
        teamPlotData={teamtData}
        depPlotData={departmentData}
      />
    </div>
  );
}

export default page;
