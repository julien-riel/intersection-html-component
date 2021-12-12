import { Approach } from "./Approach.js";
import { TransportElementInIntersection } from "./TransportElementInIntersection.js";

export class Lane extends TransportElementInIntersection {
  private approach?: Approach = undefined;
  private xOffset = 0;

  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    // TODO: Allow Approach only in an Intersection element
    const x: any = this.parentNode;
    if (x) {
      this.approach = x as Approach;

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
    this.debugMe();
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

console.log("On enregistre un lane");
//customElements.define("transport-lane", Lane);
