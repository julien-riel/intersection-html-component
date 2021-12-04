import {ILaneOptions, Lane} from './lane.js';
class Trottoir extends Lane {
  constructor() {
    super({
      width: 75,
      usage: "trottoir",
    });
  }
}

class OutgoingMotorized extends Lane {
  constructor(options?: ILaneOptions) {
    super({
      width: 150,
      type: "sortant",
      usage: "car",
      ...options,
    });
  }
}

class IncomingMotorized extends Lane {
  constructor(options?: ILaneOptions) {
    super({
      width: 100,
      type: "entrant",
      usage: "car",
      ...options,
    });
  }
}

class TerrePlein extends Lane {
  constructor(options?: ILaneOptions) {
    super({
      width: 60,
      usage: "terre-plein",
      ...options,
    });
  }
}

export {Trottoir, OutgoingMotorized, IncomingMotorized, TerrePlein};