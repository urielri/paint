import { targetPalette } from "./targets.js";
export class Palette {
  constructor(colors) {
    this.colors = colors;
    this.current = this.colors[0];
  }
  createPalette() {
    let checkMenu = false;
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
     
      const menuContextual = document.createElement("div");
      menuContextual.setAttribute("class", "menu");
      menuContextual.setAttribute(
        "style",
        `transform: translate(${e.x}px, ${e.y}px)`
      );

      menuContextual.setAttribute("id", "menuContextual");
      !checkMenu && document.body.appendChild(menuContextual);
      this.colors.map((res, index) =>
        menuContextual.appendChild(
          targetPalette(index, res, {
            action: (e) => this.captureColor(e),
          })
        )
      );
      checkMenu = true;
      const current = document.getElementById("menuContextual");
      current && (current.style.transform = `translate(${e.x}px, ${e.y}px)`)
  
    
      gsap.to("#menuContextual", {
        opacity: 1,
        display: "grid",
        duration: 0.2,
      });
    });
    document.body.addEventListener("click", () => {
      const current = document.getElementById("menuContextual");
      if (current.style.display === "grid") {
        gsap.to("#menuContextual", {
          opacity: 0,
          display: "none",
          duration: 0.2,
        });
      }
    });
  }
  captureColor(color) {
    this.current = color;
    return color;
  }
}

export class Grid {
  constructor(width, height, background, parent, palette) {
    this.grid = {
      width: width ? width : window.innerWidth,
      height: height ? height : window.innerHeight,
      background: background ? background : "#ffffff",
    };
    this.parent = parent;
    this.palette = palette;
  }
  createGrid() {
    const quantyElemsWidth = Math.ceil(this.grid.width / 16);
    const quantyElemsHeight = Math.ceil(this.grid.height / 16);
    const quantyElemsGrid = Math.ceil(quantyElemsWidth * quantyElemsHeight);
    this.changeBackgroundGrid();
    return quantyElemsGrid;
  }
  changeBackgroundGrid() {
    this.parent.style.background = this.background;
  }
  bindEvents() {
    let a = false;
    this.parent.addEventListener("mousedown", (e) => {
      e.button === 0 && (a = true);
    });
    this.parent.addEventListener("mouseup", (e) => {
      e.button === 0 && (a = false);
    });
    this.parent.addEventListener("mousemove", (e) => {
      if (a) {
        e.path[0].className === "cell" &&
          (e.path[0].style.background = this.palette.current);
      }
    });
  }
}

export class Cell {
  constructor(width, height, borderColor, id) {
    this.width = width;
    this.height = height;
    this.borderColor = borderColor;
    this.id = id;
  }

  createCell() {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("id", this.id);
    return cell;
  }
}
