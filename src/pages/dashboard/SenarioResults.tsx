import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import Button from "@/components/button/CustomButton";
import { senarioResults as results } from "@/utils/data";
import { SparklesIcon, DotsIcon } from "@/utils/icons";

/**
 * SenarioResults - Displays a collapsible list of best scenario results.
 * Each result row is styled and can be expanded/collapsed with animation.
 */
const SenarioResults = () => {
  const [show, setShow] = useState<boolean>(true); // Controls visibility of results

  return (
    <div className="pt-4 md:pt-10 flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2.5">
          <SparklesIcon className="text-active" />
          <p className="text-lg md:text-2xl text-active">
            Best Scenario Results
          </p>
        </div>
        <Button
          active
          className="rounded-full border w-11 h-[34px]"
          icon={
            show ? (
              <ChevronUp />
            ) : (
              <ChevronDown />
            )
          }
          onClick={() => setShow(!show)}
        />
      </div>

      {/* Expandable Results Section */}
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          show ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2.5 pt-6">
          {results.map((result: string, index: number) => (
            <div
              key={`${result}-${index}`}
              className="flex justify-between items-center text-active border-active border-[0.5px] rounded-[6px] py-2 px-3 md:py-4 md:px-6"
            >
              <p className="text-[16px]">{result}</p>
              <Button
                className="border-none bg-inherit"
                onClick={() => console.log("")}
                icon={<DotsIcon className="text-active" />}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SenarioResults;
