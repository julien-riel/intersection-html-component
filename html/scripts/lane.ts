import { Approach } from "./Approach.js";
import { TransportElementInIntersection } from "./TransportElementInIntersection.js";

export class Lane extends TransportElementInIntersection {
  /**
   * The parent approach
   */
  private approach?: Approach = undefined;

  // SVG Elements (for repositionning / rendering)
  private streetUsageText?: SVGTextElement = undefined;
  private laneRectangle?: SVGRectElement = undefined;

  private laneLength = 10;

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

      this.laneRectangle = this.makeRectangle(
        0,
        0,
        this.getLaneWidth(),
        this.laneLength,
        this.getCouleurByUsage(this.getLaneUsage())
      );
      this.draw(this.laneRectangle);

      this.streetUsageText = this.makeText(
        this.getMiddleOfLane(),
        1,
        this.getLaneUsage()
      );
      this.draw(this.streetUsageText);
      this.draw(this.makeCircle(0, 0, 0.3, "green"));
    }
    this.debugMe();
  }

  /**
   * Set the position of then lane relative to the lop left corner, in meters
   */
  public setXOffset(value: number) {
    const ratio = this.getRatio();
    const trans = `${value * ratio} 0`;

    const transformation = `translate(${trans})`;
    (this.getDrawingContext() as SVGGElement).setAttribute(
      "transform",
      transformation
    );

    this.recomputeWidth();
  }

  /**
   *
   * @returns
   */
  public recomputeWidth() {
    this.laneRectangle?.setAttribute("x", "0");
    this.laneRectangle?.setAttribute("y", "0");
    this.laneRectangle?.setAttribute(
      "width",
      (this.getLaneWidth() * this.getRatio()).toString()
    );
    this.laneRectangle?.setAttribute(
      "height",
      (this.laneLength * this.getRatio()).toString()
    );
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
    return this.getLaneWidth() / 2;
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
