import React from "react";
import LevelIndicator from "../LevelIndicator";
import { LEVELS_TOTAL } from "../../constants";
import { FilterIcon } from "./FilterIcon";
import "./styles.css";

enum FilterStatus {
  OPENED = "HIDE FILTER",
  CLOSED = "FILTER BY LEVEL",
}

interface FilterBarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedLevels: number[];
  onLevelsChange: (levels: number[]) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  isOpen,
  onToggle,
  selectedLevels,
  onLevelsChange,
}) => {
  const levels = React.useMemo(() => {
    return Array.from({ length: LEVELS_TOTAL }, (_, i) => i);
  }, []);

  const toggleLevel = React.useCallback(
    (level: number) => {
      if (selectedLevels.includes(level)) {
        onLevelsChange(selectedLevels.filter(l => l !== level));
      } else {
        onLevelsChange([...selectedLevels, level]);
      }
    },
    [onLevelsChange, selectedLevels]
  );

  const hasSelectedLevels = selectedLevels.length > 0;
  const showRangePill = hasSelectedLevels && !isOpen;

  const selectedRange = React.useMemo(() => {
    if (selectedLevels.length === 0) return null;
    if (selectedLevels.length === 1) return selectedLevels[0];

    const sorted = [...selectedLevels].sort((a, b) => a - b);
    return `${sorted[0]} - ${sorted[sorted.length - 1]}`;
  },[selectedLevels])


  return (
    <div className="filter-bar">
      <button className="filter-toggle" onClick={onToggle}>
        {isOpen ? FilterStatus.OPENED : FilterStatus.CLOSED}

        <div className={`filter-toggle-icon-wrapper ${showRangePill ? 'active' : ''}`}>
          {showRangePill && selectedRange && (
            <span className="filter-range">{selectedRange}</span>
          )}
          <FilterIcon />
        </div>
      </button>
      {isOpen && (
        <div className="level-filters">
          {levels.map(level => (
            <button key={level} onClick={() => toggleLevel(level)}>
              <LevelIndicator
                level={level}
                selected={selectedLevels.includes(level)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
