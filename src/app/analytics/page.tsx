import { Metadata } from "next";
import { promises as fs } from "fs";
import React from "react";
import ridesPlot from "@/assets/rides_plot.png";
import PlotlyChart from "@/components/charts/PlotlyChart";
import PickupStations from "@/components/stationsMap/PickupStations";
import dbConnect from "@/lib/dbConnect";
import user from "@/models/user";
import ComparisonSection from "@/components/charts/ComparisonSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Analytics",
};

async function page() {
  // Collect the total emissions saved data
  const totalEmissionsFile = await fs.readFile(
    process.cwd() + "/src/assets/pie_chart_total_co2.json",
    "utf8"
  );
  const totalEmissionsData = JSON.parse(totalEmissionsFile);

  // Collect the department data for the rides
  const departmentRideFile = await fs.readFile(
    process.cwd() + "/src/assets/donut_chart_departments.json",
    "utf8"
  );
  const departmenRidetData = JSON.parse(departmentRideFile);

  // Collect the team data for the rides
  const teamRideFile = await fs.readFile(
    process.cwd() + "/src/assets/donut_chart_team.json",
    "utf8"
  );
  const teamtRideData = JSON.parse(teamRideFile);

  // Collect the department data for co2 emissions
  const departmentCO2File = await fs.readFile(
    process.cwd() + "/src/assets/CO2perDepartment.json",
    "utf8"
  );
  const departmenCO2Data = JSON.parse(departmentCO2File);

  // Collect the team data for co2 emissions
  const teamCO2File = await fs.readFile(
    process.cwd() + "/src/assets/CO2perTeam.json",
    "utf8"
  );
  const teamtCO2Data = JSON.parse(teamCO2File);
  // await dbConnect();

  // const users = await user.find({});

  return (
    <div className="grid justify-center max-w-3xl mx-auto mt-4">
      <h1 className="font-semibold text-lg text-center">
        Welcome to HopInMorris analytics section. Here you can gain some
        valuable insights about our contribution to reducing CO2 emmisions
        within our team!
      </h1>
      {/* Total emissions saved */}
      <p className="text-center my-5">
        Lets begin with analysing the contribution divided by teams and
        departments:
      </p>
      <PlotlyChart data={totalEmissionsData} />
      {/* Contribution by team */}
      <p className="text-center my-5">
        Lets begin with analysing the contribution divided by teams and
        departments:
      </p>
      <ComparisonSection
        teamPlotData={teamtRideData}
        depPlotData={departmenRidetData}
      />

      {/* Emission charts */}
      <p className="text-center my-5">
        Lets continue with a breakdown of CO2 emissions saved by each team and
        depertment:
      </p>
      <ComparisonSection
        teamPlotData={teamtCO2Data}
        depPlotData={departmenCO2Data}
      />
      {/* Rides plot */}
      <p className="text-center my-5">
        And lets finish with a breakdown of previous rides divided by pickup
        stations:
      </p>
      <Image src={ridesPlot} alt="rides plot" className="w-[700px]" priority />
    </div>
  );
}

export default page;
