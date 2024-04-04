const baseFontSizePx = 10;
const unitToRem = (val) => `${val}rem`;
const pxToRem = (val) => val / baseFontSizePx;
const pxToRemUnit = (val) => unitToRem(pxToRem(val));
const appendPx = (val) => `${val}px`

module.exports = {
    unitToRem,
    pxToRem,
    pxToRemUnit,
    appendPx,
};
