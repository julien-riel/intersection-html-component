import {IncomingMotorized,OutgoingMotorized,TerrePlein,Trottoir} from './scripts/laneUsage.js';
import {Approche} from './scripts/approche.js';

        const lane1 = new OutgoingMotorized({
          lines: {
            lineLeft: {
              type: "solid",
              color: "white",
            },
            lineRight: {
              type: "solid",
              color: "yellow",
            },
          },
        });

        const lane2 = new IncomingMotorized({
          lines: {
            lineLeft: {
              type: "solid",
              color: "yellow",
            },
            lineCenter: {
              type: "dashed",
              color: "white",
            },
          },
        });

        const lane3 = new IncomingMotorized({
          lines: {
            lineRight: {
              type: "solid",
              color: "white",
            },
          },
        });

        const lanes = [
          new Trottoir(),
          lane1,
          new TerrePlein(),
          lane2,
          lane3,
          new Trottoir(),
        ];


        // const approcheNord = new Approche('nord', lanes);
        // const approcheSud = new Approche('sud', lanes);
        // const approcheOuest = new Approche('ouest', lanes);
        // const approcheEst = new Approche('est', lanes);

        // const streetProfile = new ProfilDeRue(lanes);

       // const intersection = new Intersection(approcheNord, approcheSud, approcheOuest, approcheEst);

        const uneApproche = new Approche(lanes, 'south', 100, 100);
        uneApproche.draw();

        const uneAutreApproche = new Approche(
          [
            new Trottoir(),
            new OutgoingMotorized(),
            new IncomingMotorized(),
            new IncomingMotorized(),
            new OutgoingMotorized(),
            new Trottoir(),
          ], 'east', 500, 500);
        uneAutreApproche.draw();
      