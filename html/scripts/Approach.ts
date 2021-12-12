import { Intersection } from "./Intersection.js";
import { Lane } from "./Lane.js";
import { TransportElementInIntersection } from "./TransportElementInIntersection.js";

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
    if (!this.intersection) {
      throw new Error("Imossible d'associer l'approche à l'intersection");
    }
    this.intersection.registerApproach(this.getDrawingContext());

    const d = this.getDirection();
    this.setTransform(d);

    this.draw(this.makeCircle(0, 0, 1, "yellow"));
  }

  public setTransform(d: string, x: number, y: number) {
    console.log(
      "Bonjour, je suis une approche de largeur",
      this.getApproachWidth()
    );
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
console.log("Ok. on arrête de niaiser!");
// customElements.define("transport-approach", Approach);
