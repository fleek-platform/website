const AVATAR_SIZE = 24;

const hashCode = (name: string) => {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    const character = name.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash);
};

const getRandomColor = (number: number, colors: string[], range: number) => {
  return colors[number % range];
};

const getDigit = (number: number, ntn: number) => {
  return Math.floor((number / Math.pow(10, ntn)) % 10);
};

const getUnit = (number: number, range: number, index?: number) => {
  const value = number % range;

  if (index && getDigit(number, index) % 2 === 0) {
    return -value;
  } else {
    return value;
  }
};

const ELEMENTS = 4;

type GenerateColorsArgs = {
  name: string;
  colors: string[];
};

export const generateColors = ({ name, colors }: GenerateColorsArgs) => {
  const numFromName = hashCode(name);
  const range = colors && colors.length;

  const elementsProperties = Array.from({ length: ELEMENTS }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), AVATAR_SIZE / 10, 1),
    translateY: getUnit(numFromName * (i + 1), AVATAR_SIZE / 10, 2),
    scale: 1.2 + getUnit(numFromName * (i + 1), AVATAR_SIZE / 20) / 10,
    rotate: getUnit(numFromName * (i + 1), 360, 1),
  }));

  return elementsProperties;
};
