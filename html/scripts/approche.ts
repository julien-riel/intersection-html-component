import * as draw from './drawLib.js';
class Approche {

  lanes: any;
  x: number;
  y: number;

  constructor(lanes: any, azimuth: any, x: number, y: number) {
    this.lanes = lanes;
    this.x = x;
    this.y = y;
  }

  getWidth() {
    let width = 0;
    for (const lane of this.lanes) {
      width += lane.width;
    }

    return width;
  }

  draw() {
    //const rayonRondeurTrottoir = lane0.width;
    // Dessiner l'arrière plan
    // drawRectangle(0, 0, 660, 600, "gray");

    // Dessiner la chaussée et le terrain
    let cursorPosition = this.x;
    for (const lane of this.lanes) {
      lane.x = cursorPosition;
      lane.y = this.y;
      cursorPosition += lane.width;
      lane.draw();
    }

    cursorPosition = this.x;
    for (const lane of this.lanes) {
      lane.x = cursorPosition;
      lane.y = this.y;
      cursorPosition += lane.width;
      lane.drawLines();
    }

    const debugMode = true;
    if (debugMode) {
      cursorPosition = this.x;
      for (const lane of this.lanes) {
        lane.x = cursorPosition;
        lane.y = this.y;
        cursorPosition += lane.width;
        lane.debug();
      }
    }
  }
}

export { Approche };
