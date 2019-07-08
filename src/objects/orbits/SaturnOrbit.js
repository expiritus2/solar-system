import {Orbit} from "..";

const settings = {
  name: 'SaturnOrbit',
  radius: 20,
  rotateSpeed: 0.0001
};

class SaturnOrbit extends Orbit {
  constructor() {
    super(settings);
  }
}

export default SaturnOrbit;
