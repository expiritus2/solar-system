import {Orbit} from "..";

const settings = {
  name: 'SaturnOrbit',
  radius: 5,
  rotateSpeed: 0.0001
};

class MercuryOrbit extends Orbit {
  constructor() {
    super(settings);
  }
}

export default MercuryOrbit;
