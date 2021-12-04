
function busy() {
  alert("Allo");
}

const svgns = "http://www.w3.org/2000/svg";
const racineSvg = "street";

function createLignePointille(x, y, x2, y2, color) {
  
  let line = document.createElementNS(svgns, "line");
  line.setAttribute("x1", x);
  line.setAttribute("y1", y);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", color);
  line.setAttribute("stroke-dasharray", "30 25");
  line.setAttribute("stroke-width", 5);
  const elem = document.getElementById(racineSvg);
  elem.appendChild(line);
}

function createLignePleine(x, y, x2, y2, color) {
  let line = document.createElementNS(svgns, "line");
  line.setAttribute("x1", x);
  line.setAttribute("y1", y);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", color);
  line.setAttribute("stroke-width", 5);

  const elem = document.getElementById(racineSvg);
  elem.appendChild(line);
}

function drawRectangle(x, y, width, height, couleur) {
  // make a simple rectangle
  const lg = 100;
  let newRect = document.createElementNS(svgns, "rect");
  newRect.setAttribute("x", x);
  newRect.setAttribute("y", y);
  newRect.setAttribute("width", width);
  newRect.setAttribute("height", height);
  newRect.setAttribute("fill", couleur);

  const elem = document.getElementById(racineSvg);
  elem.appendChild(newRect);
  console.log("Yeah!");
}

function drawCircle(x, y, r, col) {
  // make a simple circle
  let circle = document.createElementNS(svgns, "circle");
  circle.setAttribute("cx", "" + x);
  circle.setAttribute("cy", "" + y);
  circle.setAttribute("r", "" + r);
  circle.setAttribute("fill", col);
  const elem = document.getElementById(racineSvg);
  elem.appendChild(circle);
}

function drawText(x, y, text) {
  const lg = 100;
  let newRect = document.createElementNS(svgns, "text");
  newRect.setAttribute("x", x);
  newRect.setAttribute("y", y);

  const elem = document.getElementById(racineSvg);
  elem.appendChild(newRect);
  newRect.innerHTML = text;
  console.log("Yeah!");
}

function drawUse(x, y, id) {
  let newRect = document.createElementNS(svgns, "use");
  newRect.setAttribute("x", x);
  newRect.setAttribute("y", y);
  newRect.setAttribute("href", "#" + id);

  const elem = document.getElementById(racineSvg);
  elem.appendChild(newRect);
}
