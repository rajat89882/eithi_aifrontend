import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const CircularPercentageBar = ({
  value, // Percentage value (0-100)
  textColor = "#000",
  pathColor = "#4caf50",
  trailColor = "#d6d6d6",
}) =>
{
  return (
    <div style={{ width: "150px", height: "150px" }}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textColor: textColor,
          pathColor: pathColor,
          trailColor: trailColor,
          strokeLinecap: "round",
        })}
      />
    </div>
  );
};

export default CircularPercentageBar;
