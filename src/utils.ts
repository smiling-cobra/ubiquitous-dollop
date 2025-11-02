import { EASY_LEVEL, MEDIUM_LEVEL } from "./constants";

/** Since images urls aren't working I decided to replace them with placeholders */
export const getPlaceholderImage = (level: number, title: string): string => {
  const color = level <= EASY_LEVEL ? '6fc13e' : level <= MEDIUM_LEVEL ? 'ff8e00' : 'dc001c';
  const initials = title
    .split(' ')
    .filter(word => word.length > 0)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase() || '??';
  
  return `https://ui-avatars.com/api/?name=${initials}&size=200&background=${color}&color=ffffff&bold=true&font-size=0.5`;
};