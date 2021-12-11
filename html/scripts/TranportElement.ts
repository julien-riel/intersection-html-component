import { Intersection } from "./Intersection.js";

// Create a class for the element
export const svgns = "http://www.w3.org/2000/svg";

// Utilisations des slots
//https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b

export class TransportElement extends HTMLElement {
  protected g: SVGGElement;

  constructor() {
    // Always call super first in constructor
    super();
    this.g = this.initialiseDrawingContext();

    console.log(
      "Constructeur de la classe de base du transport element",
      this.tagName
    );
  }
  connectedCallback() {
    console.log("connectedCallback ", this.tagName);
    this.debugMe();
  }

  disconnectedCallback() {
    console.log("disconnectedCallback");
  }

  adoptedCallback() {
    console.log("disconnectedCallback");
  }

  attributeChangedCallback() {
    console.log("attributeChangedCallback");
  }

  observedAttributes() {}

  protected currentSvgContainer?: SVGGElement;

  protected appendtt() {
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
    let circle = document.createElementNS(svgns, "circle");
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
    let line = document.createElementNS(svgns, "line");
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
    let line = document.createElementNS(svgns, "line");
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
    let newRect = document.createElementNS(svgns, "rect");
    newRect.setAttribute("x", x.toString());
    newRect.setAttribute("y", y.toString());
    newRect.setAttribute("width", width.toString());
    newRect.setAttribute("height", height.toString());
    newRect.setAttribute("fill", couleur);
    return newRect;
  }

  protected makeText(x: number, y: number, text: string) {
    const lg = 100;
    let textElement = document.createElementNS(svgns, "text");
    textElement.setAttribute("x", x.toString());
    textElement.setAttribute("y", y.toString());
    //textElement.setAttribute("transform", `rotate(-45,${x},${y})`);
    textElement.innerHTML = text;
    return textElement;
  }

  protected drawUse(x: number, y: number, id: string) {
    let newRect = document.createElementNS(svgns, "use");
    newRect.setAttribute("x", x.toString());
    newRect.setAttribute("y", y.toString());
    newRect.setAttribute("href", "#" + id);
  }
}

export class TransportElementInIntersection extends TransportElement {
  public intersection?: Intersection;

  constructor() {
    // Always call super first in constructor
    super();
  }

  protected setIntersection(intersection: Intersection) {
    this.intersection = intersection;
  }

  getRatio(): number {
    return this.intersection!.getRatio();
  }

  protected override makeCircle(x: number, y: number, r: number, col: string) {
    const ratio = this.getRatio();
    return super.makeCircle(x * ratio, y * ratio, r * ratio, col);
  }

  protected override makeText(x: number, y: number, text: string) {
    const ratio = this.getRatio();
    return super.makeText(x * ratio, y * ratio, text);
  }

  protected override makeRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    const ratio = this.getRatio();
    return super.makeRectangle(
      x * ratio,
      y * ratio,
      width * ratio,
      height * ratio,
      color
    );
  }
}

/**
 *
 */
export class Approach extends TransportElementInIntersection {
  private currentLineXOffset = 0;

  constructor() {
    // Always call super first in constructor
    super();

    this.setIntersection(this.parentNode as Intersection);

    // TODO: Allow Approach only in an intersection element
    this.intersection = this.parentNode as Intersection;
    this.intersection.registerApproach(this.getDrawingContext());

    const d = this.getDirection();
    let deg = "0";
    let trans = "0 0";
    if (d === "north") {
      deg = "180 500 220";
      trans = "500 220";
    } else if (d === "east") {
      deg = "270 400 200";
      trans = "200 200";
    } else if (d === "west") {
      deg = "90 200 200";
      trans = "200 200";
    } else if (d === "south") {
      deg = "0 200 400";
      trans = "200 400";
    }
    // Exemple de comment pivoter une approche
    (this.getDrawingContext() as SVGGElement).setAttribute(
      "transform",
      "rotate(" + deg + ")" + " translate(" + trans + ")"
    );

    this.draw(this.makeCircle(0, 0, 1, "yellow"));
  }

  public registerLane(lane: Lane) {
    lane.setXOffset(this.currentLineXOffset);
    this.currentLineXOffset += lane.getLaneWidth();
    // console.log("Directoin de approche", approach.getDirection());
  }

  public getApproachWidth(): number {
    return this.currentLineXOffset;
  }

  public attachDrawingContext(drawingContext: SVGElement) {
    this.getDrawingContext().appendChild(drawingContext);
  }

  public getDirection(): string {
    return this.getAttribute("direction") || "";
  }
}

export class Lane extends TransportElementInIntersection {
  private approach: Approach;
  private xOffset = 0;

  constructor() {
    // Always call super first in constructor
    super();
    // TODO: Allow Approach only in an Intersection element
    this.approach = this.parentNode as Approach;
    this.intersection = this.approach.intersection;

    this.approach.attachDrawingContext(this.getDrawingContext());
    this.approach.registerLane(this);

    this.draw(
      this.makeRectangle(
        this.xOffset,
        0,
        this.getLaneWidth(),
        10,
        this.getCouleurByUsage(this.getLaneUsage())
      )
    );

    this.draw(this.makeText(this.getMiddleOfLane(), 1, this.getLaneUsage()));
    this.draw(this.makeCircle(this.xOffset, 0, 0.3, "green"));
  }

  public setXOffset(value: number) {
    this.xOffset = value;
  }

  public getLaneWidth(): number {
    const attrValue = this.getAttribute("lane-width");
    if (attrValue === null) {
      return 3; // 3 meters as default value
    }
    return parseFloat(attrValue);
  }

  public getLaneUsage(): string {
    const attrValue = this.getAttribute("lane-usage");
    if (attrValue === null) {
      return "car";
    }
    return attrValue;
  }

  private getMiddleOfLane(): number {
    return this.xOffset + this.getLaneWidth() / 2;
  }

  private getCouleurByUsage(usage: string) {
    if (usage == "car") {
      return "gray";
    } else if (usage == "trottoir") {
      return "lightGray";
    } else if (usage == "terre-plein") {
      return "green";
    }
    return "gray";
  }
}

// Define the new element

customElements.define("transport-approach", Approach);
customElements.define("transport-lane", Lane);
