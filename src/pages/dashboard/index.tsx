import { useState } from "react";
import { CircleHelp } from "lucide-react";

import Button from "@/components/button/CustomButton";
import ChartView from "@/components/chart";
import CustomSelect from "@/components/input/CustomSelect";
import SenarioResults from "./SenarioResults";
import EditVariables from "./EditVariables";
import { KPI_CARDS } from "@/utils/data";
import { UploadIcon, RefreshIcon, ChargingIcon } from "@/utils/icons";

/**
 * DashboardPage - Displays scenario results, KPIs, charts, and allows editing variables.
 */
const DashboardPage = () => {
  const [opened, setOpened] = useState(false); // Controls visibility of EditVariables panel

  return (
    <div className="w-full min-h-full bg-background-secondary rounded-[5px] border border-border-primary px-4 md:px-10 pb-4">
      {/* default tab */}
      <> 
        {/* Side Panel: Edit Variables */}
        <EditVariables
          onClick={() => setOpened(false)}
          className={`
          transition-all duration-300 ease-in-out
          ${
            opened
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 translate-x-10 pointer-events-none"
          }
        `}
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 md:pt-10 text-white gap-4">
          {/* Title */}
          <div className="flex items-center gap-3 w-full justify-center md:w-auto">
            <ChargingIcon className="text-white text-xs md:text-lg" />
            <h1 className="text-xl md:text-2xl lg:text-[32px]">
              Charging Station
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full md:w-auto gap-3 justify-between">
            <Button
              className="h-10 w-10"
              icon={<RefreshIcon className="text-description" active={false} />}
              onClick={() => console.log("refresh")}
            />
            <Button
              label="Edit Variables"
              className="h-10 px-3"
              onClick={() => setOpened(true)}
            />
            <Button
              className="h-10 w-10"
              icon={<UploadIcon className="" />}
              onClick={() => console.log("upload")}
            />
          </div>
        </div>

        {/* Scenario Output Section */}
        <SenarioResults />

        {/* Graphs & KPI Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6 mt-10 text-white">
          {/* Graph Section */}
          <div className="xl:col-span-7 flex flex-col">
            <h2 className="mb-4 text-sm md:text-lg xl:text-2xl font-semibold">
              Graphs
            </h2>
            <div className="bg-background-surface rounded-[5px] border border-border-secondary flex-1 pt-4 md:p-6">
              <div className="flex items-center justify-end mb-2 px-2 sm:px-0">
                <CustomSelect
                  options={["Unsatisfied Demand %"]}
                  defaultValue="Unsatisfied Demand %"
                  onChange={(val) => console.log("Selected:", val)}
                />
              </div>
              <ChartView />
            </div>
          </div>

          {/* KPI Section */}
          <div className="xl:col-span-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm md:text-lg xl:text-2xl font-semibold">
                Key Performance Indicators
              </h2>
              <button className="flex items-center gap-1 text-sm border border-neutral-600 h-8 px-3 rounded hover:bg-neutral-700">
                Variables <span className="text-xs">＋</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {KPI_CARDS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-background-surface rounded-xl border border-neutral-700 p-4 md:p-6 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-xs md:text-lg font-medium">
                      {item.label}
                    </p>
                    <CircleHelp size={16} className="text-neutral-400" />
                  </div>
                  <p className="text-description text-[10px] md:text-sm mt-1 w-3/4">
                    {item.description}
                  </p>
                  <div className="text-xl md:text-[32px] font-semibold mt-4 md:mt-10 flex justify-end">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default DashboardPage;
