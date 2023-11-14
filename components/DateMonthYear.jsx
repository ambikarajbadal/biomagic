import { DATES, MONTHS } from "@utils/constant";
import { getLast50Years } from "@utils/utils";
import React from "react";
import Dropdown from "./Dropdown";
const DateMonthYear = ({ handleChange, value }) => {
  const onChangeHandler = (key, value) => {
    handleChange({ [key]: value });
  };
  return (
    <div>
      <div className="flex space-x-1">
        {/* Date Dropdown */}
        <Dropdown
          options={DATES} // Replace with your date options
          label="Date"
          onSelect={(data) => onChangeHandler("date", data)}
          value={value?.date}
        />

        {/* Month Dropdown */}
        <Dropdown
          options={MONTHS} // Replace with your month options
          label="Month"
          value={value?.month}
          onSelect={(data) => onChangeHandler("month", data)}
        />

        {/* Year Dropdown */}
        <Dropdown
          options={getLast50Years()} // Replace with your year options
          label="Year"
          value={value?.year}
          onSelect={(data) => onChangeHandler("year", data)}
        />
      </div>
    </div>
  );
};
export default React.memo(DateMonthYear);
