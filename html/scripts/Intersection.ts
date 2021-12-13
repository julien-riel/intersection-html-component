import { Approach } from "./Approach.js";
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
    this.appendSvgContainerToThis();
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

    this.addDebugInformation();
  }

  protected override makeCircle(x: number, y: number, r: number, col: string) {
    const ratio = this.getRatio();
    return super.makeCircle(x * ratio, y * ratio, r * ratio, col);
  }

  private addDebugInformation() {
    this.draw(super.makeCircle(0, 0, 15, "blue"));
    this.draw(super.makeCircle(this.pixelWidth, 0, 15, "red"));

    this.draw(this.makeCircle(0, 0, 1, "black"));
    this.draw(this.makeCircle(30, 0, 1, "black"));
    this.draw(this.makeCircle(15, 0, 1, "black"));

    this.draw(this.makeCircle(0, 30, 1, "blue"));
    this.draw(this.makeCircle(30, 30, 1, "blue"));
    this.draw(this.makeCircle(15, 30, 1, "blue"));
  }

  public getRatio(): number {
    return this.pixelWidth / this.intersectionWithInMeter;
  }

  public registerApproach(approach: Approach) {
    const approachDirection = approach.getDirection();
    this.setApproachForDirection(approachDirection, approach);
    this.computeTransformOfApproaches();
    console.log("Enregistrement de  l'approche dans l'intersection");
  }

  public attachDrawingContext(drawingContext: SVGElement) {
    this.getDrawingContext().appendChild(drawingContext);
  }

  private approachesByDirection: { [key: string]: Approach } = {};

  private setApproachForDirection(direction: string, approach: Approach) {
    this.approachesByDirection[direction] = approach;
  }

  public getApprochByDirection(direction: string): Approach {
    return this.approachesByDirection[direction];
  }

  public getWiderApproachWE() {
    return this.getWiderApproach(
      this.getApprochByDirection("west"),
      this.getApprochByDirection("east")
    );
  }

  public getWiderApproachNS() {
    return this.getWiderApproach(
      this.getApprochByDirection("north"),
      this.getApprochByDirection("south")
    );
  }

  private getWiderApproach(approachA?: Approach, approachB?: Approach) {
    const aWidth = approachA?.getApproachWidth() || 0;
    const bWidth = approachB?.getApproachWidth() || 0;

    console.log(approachA?.getApproachWidth(), approachB?.getApproachWidth());
    return Math.max(aWidth, bWidth);
  }

  public computeTransformOfApproaches() {
    console.log("Début du positionnement");

    const x = this.getWiderApproachNS();
    const y = this.getWiderApproachWE();
    // const largeurSVG = this.intersectionWithInMeter;
    const longueurVoieX = (this.intersectionWithInMeter - x) / 2;
    const longueurVoieY = (this.intersectionWithInMeter - y) / 2;

    const northApproach = this.getApprochByDirection("north");
    if (northApproach) {
      northApproach.setTransform("north", longueurVoieX + x, longueurVoieY);
    }

    const southApproach = this.getApprochByDirection("south");
    if (southApproach) {
      southApproach.setTransform("south", longueurVoieX, longueurVoieY + y);
    }

    const westApproach = this.getApprochByDirection("west");
    if (westApproach) {
      westApproach.setTransform("west", longueurVoieX, longueurVoieY);
    }

    const eastApproach = this.getApprochByDirection("east");
    if (eastApproach) {
      eastApproach.setTransform("east", longueurVoieX + x, longueurVoieY + y);
    }
  }
}
