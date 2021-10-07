import { Cell, Grid, Palette } from "./resources.js";
const COLORS = ["#A2D2FF", "#FF0075", "#FFDEFA", "#C56824", "#F0A500", "#FCFFA6"];
function initGrid() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const container = document.getElementById("container");
  const palette = new Palette(COLORS);
  palette.createPalette();
  const grid = new Grid(width, height, "#fbfbfb", container, palette);
  const quantyCells = grid.createGrid();
  let cellsCreated = false;
  for (let i = 0; i < quantyCells; i++) {
    const newCell = new Cell("16px", "16px", "#fbfbfb", i);
    grid.parent.appendChild(newCell.createCell());
    i + 1 === quantyCells && (cellsCreated = true);
  }
  cellsCreated && gsap.to(".container", { opacity: 1, duration: 1 });
  grid.bindEvents();
}
document.body.addEventListener("onLoad", initGrid());
