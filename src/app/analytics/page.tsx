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
    <div className="grid justify-center max-w-3xl mx-auto mt-4">
      <h1 className="font-semibold text-lg text-center">
        Welcome to HopInMorris analytics section. Here you can gain some
        valuable insights about our contribution to reducing CO2 emmisions
        within our team!
      </h1>
      <p className="text-center my-3">
        Lets begin with analysing the contribution divided by teams and
        departments:
      </p>
      <ComparisonSection
        teamPlotData={teamtData}
        depPlotData={departmentData}
      />
    </div>
  );
}

export default page;
