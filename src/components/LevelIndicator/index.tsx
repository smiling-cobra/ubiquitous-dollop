import React from "react";
import { LEVELS_TOTAL } from "../Filter";
import "./styles.css";

const EASY_LEVEL = 5;
const MEDIUM_LEVEL = 10;

enum LEVEL_COLOR {
  EASY = "green",
  MEDIUM = "orange",
  HARD = "red",
}

interface LevelIndicatorProps {
  level: number;
  selected?: boolean;
}

const LevelIndicator: React.FC<LevelIndicatorProps> = React.memo(
  ({ level, selected = false }) => {
    const progress = (level / LEVELS_TOTAL) * 100;
    const color =
      level <= EASY_LEVEL
        ? LEVEL_COLOR.EASY
        : level <= MEDIUM_LEVEL
        ? LEVEL_COLOR.MEDIUM
        : LEVEL_COLOR.HARD;
    return (
      <div
        className={`level-badge ${color} ${selected ? "selected" : ""}`}
        style={{ "--progress": `${progress}%` } as React.CSSProperties}
      >
        <span>{level}</span>
      </div>
    );
  }
);

export default LevelIndicator;
