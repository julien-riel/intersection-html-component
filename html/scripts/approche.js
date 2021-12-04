class Approche {
  constructor(lanes, azimuth, x, y) {
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

    const debugMode = false;
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
