export function targetPalette(id, color, attrs) {
  const elem = document.createElement("div");
  elem.setAttribute("class", "elementPalette");
  elem.setAttribute("id", id);
  elem.addEventListener("click", () => {
    attrs.action(color);
  });
  elem.style.background = color;
  return elem;
}
