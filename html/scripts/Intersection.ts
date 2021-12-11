import { TransportElement, svgns } from "./TranportElement.js";

/***
 */
export class Intersection extends TransportElement {
  // La largeur du parent en unité d'écran
  private pixelWidth = 100;
  private intersectionWithInMeter = 30;

  constructor() {
    // Always call super first in constructor
    super();

    this.createRootSVGElement();
    this.appendtt();
  }

  private createRootSVGElement() {
    this.currentSvgContainer = document.createElementNS(svgns, "svg");

    this.pixelWidth = (this.parentNode as any).offsetWidth;

    this.currentSvgContainer.setAttribute("id", "street");
    this.currentSvgContainer.setAttribute("width", "100%");
    this.currentSvgContainer.setAttribute("height", this.pixelWidth + "px");
    console.log(this.parentNode);

    // Bind the 'g' element
    this.currentSvgContainer.appendChild(this.getDrawingContext());

    this.draw(super.makeCircle(0, 0, 15, "blue"));
    this.draw(super.makeCircle(this.pixelWidth, 0, 15, "red"));

    this.draw(this.makeCircle(0, 0, 1, "black"));
    this.draw(this.makeCircle(30, 0, 1, "black"));
    this.draw(this.makeCircle(15, 0, 1, "black"));

    this.draw(this.makeCircle(0, 30, 1, "blue"));
    this.draw(this.makeCircle(30, 30, 1, "blue"));
    this.draw(this.makeCircle(15, 30, 1, "blue"));
  }

  protected override makeCircle(x: number, y: number, r: number, col: string) {
    const ratio = this.getRatio();
    return super.makeCircle(x * ratio, y * ratio, r * ratio, col);
  }

  public getRatio(): number {
    return this.pixelWidth / this.intersectionWithInMeter;
  }

  public registerApproach(drawingContext: SVGElement) {
    /* console.log("On enregistre une approche!!!", approach);
    const approachDirection = approach.getDirection();
    console.log("Directoin de approche", approach.getDirection());
*/
    this.getDrawingContext().appendChild(drawingContext);
  }
}

customElements.define("transport-intersection", Intersection);
