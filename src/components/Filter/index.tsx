import React from 'react';
import filterIcon from '../../assets/icons/filter.svg';
import './styles.css';

interface FilterBarProps {
  selectedLevels: number[];
  onLevelsChange: (levels: number[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedLevels,
  onLevelsChange,
  isOpen,
  onToggle,
}) => {
  const levels = Array.from({ length: 15 }, (_, i) => i + 1);

  const toggleLevel = (level: number) => {
    if (selectedLevels.includes(level)) {
      onLevelsChange(selectedLevels.filter(l => l !== level));
    } else {
      onLevelsChange([...selectedLevels, level]);
    }
  };

  const getLevelColor = (level: number) => {
    if (level <= 5) return 'green';
    if (level <= 10) return 'orange';
    return 'red';
  };

  return (
    <div className="filter-bar">
      <button className="filter-toggle" onClick={onToggle}>
        {isOpen ? 'HIDE FILTER' : 'FILTER BY LEVEL'}
        <FilterIcon />
      </button>

      {isOpen && (
        <div className="level-filters">
          {levels.map(level => (
            <button
              key={level}
              className={`level-pill ${getLevelColor(level)} ${
                selectedLevels.includes(level) ? 'selected' : ''
              }`}
              onClick={() => toggleLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterIcon = () => <img src={filterIcon} alt="Filter" width="24" height="24" />