import plugin from "tailwindcss/plugin";
/**
 * Creates a custom css grid with 24 columns instead of 12 columns, which are Tailwind default
 */

const columns = 24;
const generateGridTemplateColumns = () => {
    const ret = {};
    for (let i = 1; i <= columns; i++) {
        ret[i] = `repeat(${i}, minmax(0, 1fr))`;
    }
    return ret;
};

const generateGridColumn = () => {
    const ret = {};
    for (let i = 1; i <= columns; i++) {
        ret["span-" + i] = `span ${i} / span ${i}`;
    }
    return ret;
};

const generateGridColumnStart = () => {
    const ret = {};
    for (let i = 1; i <= columns; i++) {
        ret[`${i}`] = `${i}`;
    }
    return ret;
};

const generateGridColumnEnd = () => {
    const ret = {};
    for (let i = 1; i <= columns; i++) {
        ret[`${i}`] = `${i}`;
    }
    return ret;
};

const generateGapSizes = () => {
    const ret = {};
    for (let i = 1; i <= 78; i++) {
        ret[i] = `${i / 10}rem`;
    }
    return ret;
};

const grid = plugin(function () {}, {
    theme: {
        gridTemplateColumns: {
            ...generateGridTemplateColumns(),
        },
        gridColumn: {
            ...generateGridColumn(),
        },
        gridColumnStart: {
            ...generateGridColumnStart(),
        },
        gridColumnEnd: {
            ...generateGridColumnEnd(),
        },
        gap: {
            ...generateGapSizes(),
        },
    },
    // variants: {
    //   gridTemplateColumns: ["responsive"],
    //   gridColumn: ["responsive"],
    //   gridColumnStart: ["responsive"],
    //   gridColumnEnd: ["responsive"],
    //   gap: ["responsive"],
    // },
});

export default grid;
