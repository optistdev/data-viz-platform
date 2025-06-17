import { useRef, useState } from "react";
import { X, Info, ChevronUp, ChevronDown } from "lucide-react";

import SearchInput from "@/components/input/SearchInput";
import Button from "@/components/button/CustomButton";
import VariableButton from "@/components/button/VariableButton";
import { useAppDispatch, useAppSelector } from "@/hooks/";
import { setSelectedVariables } from "@/store/slices/variables.slice";
import { variables } from "@/utils/data";
import { SparklesIcon, RefreshIcon } from "@/utils/icons";

interface EditVariablesProps {
  onClick: () => void;
  className: string;
}

/**
 * EditVariables - Sidebar component for managing variable selections.
 * Allows selecting/deselecting variables, triggering rerun/autofill,
 * and viewing hover-based descriptions.
 */
const EditVariables = ({ onClick, className }: EditVariablesProps) => {
  const dispatch = useAppDispatch();
  const { selectedVariables } = useAppSelector((state) => state.variables);

  const [showPrimary, setShowPrimary] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [showDescription, setShowDescription] = useState({
    title: "",
    desc: "",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Event Handlers ---

  const changeHandler = () => {}; // TODO: Implement search/filter logic

  const reRunHandler = () => {
    dispatch(setSelectedVariables([]));
  };

  const autofillHandler = () => {}; // TODO: Implement autofill logic

  const variableClickHandler = (id: string) => {
    const updated = selectedVariables.includes(id)
      ? selectedVariables.filter((item) => item !== id)
      : [...selectedVariables, id];
    dispatch(setSelectedVariables(updated));
  };

  const handleMouseEnter = (desc = "", title = "") => {
    timerRef.current = setTimeout(() => {
      setShowDescription({ title, desc });
    }, 1500);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowDescription({ title: "", desc: "" });
  };

  // --- Render ---

  return (
    <div
      className={`bg-black/50 z-50 backdrop-blur-xs fixed top-0 left-0 w-screen flex justify-end ${className}`}
    >
      <div className="w-172 bg-[#0E0D0D] h-screen border-l-2 border-border-secondary relative px-7 py-3 overflow-y-auto">
        {/* Close Button */}
        <button className="outline-none cursor-pointer">
          <X
            className="w-6 h-6 text-white absolute right-7 top-10"
            onClick={onClick}
          />
        </button>

        {/* Title */}
        <p className="font-body text-2xl font-medium">Edit Variables</p>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-4">
          <SearchInput
            onChange={changeHandler}
            className="sm:col-span-3 gap-1 h-9"
          />
          <Button
            className="h-9"
            onClick={autofillHandler}
            label="Autofill"
            icon={<SparklesIcon className="w-5 h-5" />}
          />
          <Button
            className="h-9"
            onClick={reRunHandler}
            label="Rerun"
            icon={
              <RefreshIcon
                className="w-5 h-5"
                active={selectedVariables.length > 0}
              />
            }
            active={selectedVariables.length > 0}
          />
        </div>

        {/* Variable List */}
        <div className="bg-background-secondary border border-border-secondary rounded-sm">
          <div className="h-101 border-b border-border-secondary py-8 px-6 overflow-y-auto">
            {variables.map((group) => (
              <div key={group.id} className="mb-8">
                <div className="text-[#D5D5D5] mb-5">{group.label}</div>
                <div className="flex gap-4 flex-wrap">
                  {group.variables.map((btn) => (
                    <VariableButton
                      key={btn.id}
                      label={btn.label}
                      onMouseEnter={() =>
                        handleMouseEnter(btn.description, btn.label)
                      }
                      onMouseLeave={handleMouseLeave}
                      onClick={() => variableClickHandler(btn.id)}
                      selected={selectedVariables.includes(btn.id)}
                      desc={btn.description ?? ""}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Description Box */}
          <div
            className={`
              overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${
                showDescription.title
                  ? "max-h-[500px] opacity-100 scale-100"
                  : "max-h-0 opacity-0 scale-95"
              }
            `}
          >
            <div className="bg-background-surface py-8 px-8 rounded-md">
              <div className="flex items-center gap-3 pb-4">
                <p className="font-body text-[24px] font-medium">
                  {showDescription.title}
                </p>
                <Info className="w-4 h-4 text-white" />
              </div>
              <p className="font-body text-[15px] font-normal text-[#BBBBBB]">
                {showDescription.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Primary Toggle */}
        <div className="w-full h-14 bg-background-surface mt-4 border border-border-secondary rounded-sm flex justify-between items-center px-5">
          <div className="flex gap-2.5 items-center">
            <p className="text-xl md:text-2xl text-active">Primary Variables</p>
          </div>
          <Button
            active
            className="rounded-full border-active border w-11 h-[34px]"
            icon={
              showPrimary ? (
                <ChevronUp className="text-active" />
              ) : (
                <ChevronDown className="text-active" />
              )
            }
            onClick={() => setShowPrimary(!showPrimary)}
          />
        </div>

        {/* Secondary Toggle */}
        <div className="w-full h-14 bg-background-surface mt-4 border border-border-secondary rounded-sm flex justify-between items-center px-5">
          <div className="flex gap-2.5 items-center">
            <p className="text-xl md:text-2xl text-active">
              Secondary Variables
            </p>
          </div>
          <Button
            active
            className="rounded-full border-active border w-11 h-[34px]"
            icon={showSecondary ? <ChevronUp /> : <ChevronDown />}
            onClick={() => setShowSecondary(!showSecondary)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditVariables;
