const svgns = "http://www.w3.org/2000/svg";
const racineSvg = "street";
function createLignePointille(x, y, x2, y2, color) {
    let line = document.createElementNS(svgns, "line");
    line.setAttribute("x1", x.toString());
    line.setAttribute("y1", y.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-dasharray", "30 25");
    line.setAttribute("stroke-width", '5');
    attachToTheRightPlace(line);
}
function attachToTheRightPlace(line) {
    const elem = document.getElementById(racineSvg);
    if (elem) {
        elem.appendChild(line);
    }
}
function createLignePleine(x, y, x2, y2, color) {
    let line = document.createElementNS(svgns, "line");
    line.setAttribute("x1", x.toString());
    line.setAttribute("y1", y.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", '5');
    attachToTheRightPlace(line);
}
function drawRectangle(x, y, width, height, couleur) {
    // make a simple rectangle
    let newRect = document.createElementNS(svgns, "rect");
    newRect.setAttribute("x", x.toString());
    newRect.setAttribute("y", y.toString());
    newRect.setAttribute("width", width.toString());
    newRect.setAttribute("height", height.toString());
    newRect.setAttribute("fill", couleur);
    attachToTheRightPlace(newRect);
}
function drawCircle(x, y, r, col) {
    // make a simple circle
    let circle = document.createElementNS(svgns, "circle");
    circle.setAttribute("cx", "" + x);
    circle.setAttribute("cy", "" + y);
    circle.setAttribute("r", "" + r);
    circle.setAttribute("fill", col);
    attachToTheRightPlace(circle);
}
function drawText(x, y, text) {
    const lg = 100;
    let newRect = document.createElementNS(svgns, "text");
    newRect.setAttribute("x", x.toString());
    newRect.setAttribute("y", y.toString());
    newRect.innerHTML = text;
    attachToTheRightPlace(newRect);
}
function drawUse(x, y, id) {
    let newRect = document.createElementNS(svgns, "use");
    newRect.setAttribute("x", x.toString());
    newRect.setAttribute("y", y.toString());
    newRect.setAttribute("href", "#" + id);
    attachToTheRightPlace(newRect);
}
export { createLignePointille, createLignePleine, drawRectangle, drawCircle, drawText, drawUse };
