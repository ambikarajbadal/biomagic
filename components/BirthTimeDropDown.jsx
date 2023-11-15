"use client";
import { HOURS, MINUTES } from "@utils/constant";
import Dropdown from "./Dropdown";
export const BirthTimeDropDown = ({ handleChange, value, error }) => {
  const onChangeHandler = (key, value) => {
    handleChange({ [key]: value });
  };
  return (
    <div>
      <div className="flex space-x-1">
        {/* Date Dropdown */}
        <Dropdown
          options={HOURS} // Replace with your date options
          label="Hr"
          onSelect={(data) => onChangeHandler("hr", data)}
          value={value?.hr}
        />

        {/* Month Dropdown */}
        <Dropdown
          options={MINUTES} // Replace with your month options
          label="Min"
          onSelect={(data) => onChangeHandler("min", data)}
          value={value?.min}
        />

        {/* Year Dropdown */}
        <Dropdown
          options={["AM", "PM"]} // Replace with your year options
          label="AM"
          onSelect={(data) => onChangeHandler("format", data)}
          value={value?.format}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
