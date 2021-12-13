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

    this.intersection.attachDrawingContext(this.getDrawingContext());
    this.intersection.registerApproach(this);

    const d = this.getDirection();
    this.setTransform(d, 0, 0);

    this.draw(this.makeCircle(0, 0, 1, "yellow"));
  }

  public setTransform(direction: string, x: number, y: number) {
    let degre = 0;
    if (direction === "north") {
      degre = 180;
    } else if (direction === "east") {
      degre = 270;
    } else if (direction === "west") {
      degre = 90;
    } else if (direction === "south") {
      degre = 0;
    }

    const ratio = this.getRatio();
    const deg = `${degre} ${x * ratio} ${y * ratio}`;
    const trans = `${x * ratio} ${y * ratio}`;

    const monTransform = `rotate(${deg}) translate(${trans})`;
    console.log(monTransform, monTransform);
    // Exemple de comment pivoter une approche
    (this.getDrawingContext() as SVGGElement).setAttribute(
      "transform",
      monTransform
    );
  }

  public registerLane(lane: Lane) {
    lane.setXOffset(this.currentLineXOffset);
    this.currentLineXOffset += lane.getLaneWidth();
    this.intersection?.computeTransformOfApproaches();
    console.log("Enregistrement de la lane dans l'approche");
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
