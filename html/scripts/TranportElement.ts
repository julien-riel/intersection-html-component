// Create a class for the element
export const svgns = "http://www.w3.org/2000/svg";

/**
 *
 */
export class TransportElement extends HTMLElement {
  protected g: SVGGElement;

  constructor() {
    // Always call super first in constructor
    super();
    this.g = this.initialiseDrawingContext();
  }

  protected currentSvgContainer?: SVGGElement;

  protected appendSvgContainerToThis() {
    // Ajout de trace de débogage
    if (this.currentSvgContainer) {
      this.appendChild(this.currentSvgContainer);
    }
  }

  protected debugMe() {
    // console.log("Voici mon parent", (this.parentNode as any).offsetWidth);
  }

  protected initialiseDrawingContext() {
    this.g = document.createElementNS(svgns, "g");
    return this.g;
  }

  protected getDrawingContext(): SVGElement {
    return this.g;
  }

  protected draw(elem: SVGElement) {
    this.getDrawingContext().appendChild(elem);
  }

  protected makeCircle(
    x: number,
    y: number,
    r: number,
    col: string
  ): SVGCircleElement {
    // make a simple circle
    const circle = document.createElementNS(svgns, "circle");
    circle.setAttribute("cx", "" + x);
    circle.setAttribute("cy", "" + y);
    circle.setAttribute("r", "" + r);
    circle.setAttribute("fill", col);
    return circle;
  }

  protected makeLignePointille(
    x: number,
    y: number,
    x2: number,
    y2: number,
    color: string
  ) {
    const line = document.createElementNS(svgns, "line");
    line.setAttribute("x1", x.toString());
    line.setAttribute("y1", y.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-dasharray", "30 25");
    line.setAttribute("stroke-width", "5");

    return line;
  }

  protected makeLignePleine(
    x: number,
    y: number,
    x2: number,
    y2: number,
    color: string
  ) {
    const line = document.createElementNS(svgns, "line");
    line.setAttribute("x1", x.toString());
    line.setAttribute("y1", y.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", "5");
    return line;
  }

  protected makeRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    couleur: string
  ) {
    // make a simple rectangle
    const newRect = document.createElementNS(svgns, "rect");
    newRect.setAttribute("x", x.toString());
    newRect.setAttribute("y", y.toString());
    newRect.setAttribute("width", width.toString());
    newRect.setAttribute("height", height.toString());
    newRect.setAttribute("fill", couleur);
    return newRect;
  }

  protected makeText(x: number, y: number, text: string) {
    const textElement = document.createElementNS(svgns, "text");
    textElement.setAttribute("x", x.toString());
    textElement.setAttribute("y", y.toString());
    //textElement.setAttribute("transform", `rotate(-45,${x},${y})`);
    textElement.innerHTML = text;
    return textElement;
  }

  protected drawUse(x: number, y: number, id: string) {
    const newRect = document.createElementNS(svgns, "use");
    newRect.setAttribute("x", x.toString());
    newRect.setAttribute("y", y.toString());
    newRect.setAttribute("href", "#" + id);
  }
}

// Define the new element
