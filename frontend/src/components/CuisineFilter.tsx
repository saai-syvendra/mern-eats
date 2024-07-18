import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisinesReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine </div>
        <div
          className="text-sm font-semibol mb-2 underline cursor-pointer text-blue-500"
          onClick={handleCuisinesReset}
        >
          Reset Filters
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 12)
          .sort((a, b) => {
            if (selectedCuisines.includes(b) && !selectedCuisines.includes(a)) {
              return 1;
            } else if (
              selectedCuisines.includes(a) &&
              !selectedCuisines.includes(b)
            ) {
              return -1;
            } else {
              return 0;
            }
          })
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);

            const handleCuisineChange = (
              event: ChangeEvent<HTMLInputElement>
            ) => {
              const clickedCuisine = event.target.value;
              const isChecked = event.target.checked;

              const newCuisineList = isChecked
                ? [...selectedCuisines, clickedCuisine]
                : selectedCuisines.filter(
                    (cuisine) => clickedCuisine !== cuisine
                  );

              onChange(newCuisineList);
            };

            return (
              <div className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
      </div>
      <div className="flex justify-between items-center px-2">
        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
