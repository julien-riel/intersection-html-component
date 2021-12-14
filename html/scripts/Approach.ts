import { Intersection } from "./Intersection.js";
import { Lane } from "./Lane.js";
import { TransportElementInIntersection } from "./TransportElementInIntersection.js";

/**
 *
 */
export class Approach extends TransportElementInIntersection {
  private currentWidth = 0;
  private lanes: Lane[] = [];

  constructor() {
    // Always call super first in constructor
    super();

    this.setIntersection(this.parentNode as Intersection);

    // TODO: Allow Approach only in an intersection element
    this.intersection = this.parentNode as Intersection;
    if (!this.intersection) {
      throw new Error("Impossible d'associer l'approche à l'intersection");
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
    console.log("Enregistrement de la lane dans l'approche");
    this.lanes.push(lane);
    this.recomputeWidth();

    // Should not tell what to do to the intersection
    this.intersection?.computeTransformOfApproaches();
  }

  public getApproachWidth(): number {
    return this.currentWidth;
  }

  public attachDrawingContext(drawingContext: SVGElement) {
    this.getDrawingContext().appendChild(drawingContext);
  }

  public getDirection(): string {
    return this.getAttribute("direction") || "";
  }

  public recomputeWidth() {
    let offset = 0;
    for (const lane of this.lanes) {
      lane.setXOffset(offset);

      offset += lane.getLaneWidth();
    }
    this.currentWidth = offset;
  }
}
