class Lane {
    constructor({ x, y, width, height, usage, lines, type }) {
      this.x = x || 0;
      this.y = y || 0;
      this.width = width;
      this.height = height || 500; // "trottoir (haut) ou route (bas)"
      this.type = type || "entrant";
      this.distanceLigneArret = distanceLigneArret;
      this.lines = lines || {};

      (this.usage = usage || "voitures"),
        (this.virages = ["gauche", "tout-droit", "droite", "demi-tour"]);
    }

  
    debugPoint(x, y, nom) {
      drawCircle(x, y, 5, "red");
      drawText(x, y, nom);
    }

    /**
     * Dessine les lignes, il faut dessiner les lignes après avoir dessiné la chaussée.
     *
     * Cette fonction mérite d'être refactorisée
     * */
    drawLines() {
      const margin = 8;
      if (this.lines.lineLeft) {
        console.log("this.lines.lineLeft.type", this.lines.lineLeft.type);
        if (this.lines.lineLeft.type == "solid") {
          createLignePleine(
            margin + this.x,
            this.y + this.distanceLigneArret,
            margin + this.x,
            this.y + this.height,
            this.lines.lineLeft.color
          );
        } else {
          createLignePointille(
            margin + this.x,
            this.y + this.distanceLigneArret,
            margin + this.x,
            this.y + this.height,
            this.lines.lineLeft.color
          );
        }
      }
      if (this.lines.lineCenter) {
        if (this.lines.lineCenter.type == "solid") {
          createLignePleine(
            this.width + this.x,
            this.y + this.distanceLigneArret,
            this.width + this.x,
            this.y + this.height,
            this.lines.lineCenter.color
          );
        } else {
          createLignePointille(
            this.width + this.x,
            this.y + this.distanceLigneArret,
            this.width + this.x,
            this.y + this.height,
            this.lines.lineCenter.color
          );
        }
      }
      if (this.lines.lineRight) {
        if (this.lines.lineRight.type == "solid") {
          createLignePleine(
            -margin + this.width + this.x,
            this.y + this.distanceLigneArret,
            -margin + this.width + this.x,
            this.y + this.height,
            this.lines.lineRight.color
          );
        } else {
          createLignePointille(
            -margin + this.width + this.x,
            this.y + this.distanceLigneArret,
            -margin + this.width + this.x,
            this.y + this.height,
            this.lines.lineRight.color
          );
        }
      }

      if (this.usage == "car" && this.type === "entrant")
        createLignePleine(
          this.x,
          this.y + this.distanceLigneArret,
          this.x + this.width,
          this.y + this.distanceLigneArret,
          "white"
        );
    }

    getCouleurByUsage(usage) {
      if (usage == "car") {
        return couleurRoute;
      } else if (usage == "trottoir") {
        return "lightGray";
      } else if (usage == "terre-plein") {
        return "green";
      }
      return couleurRoute;
    }

    draw() {
/*
      if (this.usage == "trottoir") {
        drawCircle(
          this.x,
          this.y,
          this.width,
          this.getCouleurByUsage(this.usage)
        );
      }
*/
      drawRectangle(
        this.x,
        this.y,
        this.width,
        this.height,
        this.getCouleurByUsage(this.usage)
      );
      drawCircle(this.x, 0, 2, "black");

      //
      if (this.usage == "car" && this.type == "entrant") {
        const posFlecheX = this.getLaneCenter().x;
        const posFlecheY =
          this.y + distanceLigneArret + distanceFlechesLigneArret;
        const offset = 20;
        drawUse(-offset + posFlecheX, posFlecheY, "gauche");
        drawUse(0 + posFlecheX, posFlecheY, "centre");
        drawUse(+offset + posFlecheX, posFlecheY, "droite");
        drawUse(+0 + posFlecheX, posFlecheY + 200, "bike");
      }
    }

    debug() {
      const textMargin = 7;
      this.debugPoint(this.x, this.y, "x,y");
      this.debugPoint(
        this.getLaneCenter().x,
        this.y + 30,
        "milieu de voie"
      );
      const posFlecheY =
        this.y + distanceLigneArret + distanceFlechesLigneArret;
      drawText(this.x + textMargin, posFlecheY + 230, this.usage);
    }

    getLaneCenter() {
      console.log(this.x, this.width, this.width / 2);
      return {
        x: this.x + this.width / 2,
      };
    }
  }
