// Warn: Astro components are built server side, thus can’t pass
// client side functions as a prop inside of a ".astro" files
// we'd have to pass the function inside of a react component
// so we pass defaults functions to at least be the closest to
// separation of concerns
const searchParentElementName = '[data-name="doc-sidebar"]';
const zIndex = 'z-100';
export const onSearchBtnEnterDefaultCallback = () => {
  const el = document.querySelector(searchParentElementName);
  el?.classList.add(zIndex);
}
export const onSearchBtnLeaveDefaultCallback = () => {
  const el = document.querySelector(searchParentElementName);
  el?.classList.remove(zIndex);
}
