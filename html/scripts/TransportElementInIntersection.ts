import { Intersection } from "./Intersection.js";
import { TransportElement } from "./TranportElement.js";

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
    return this.intersection?.getRatio() || 0;
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
