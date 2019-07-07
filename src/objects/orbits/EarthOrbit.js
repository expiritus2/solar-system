import {Orbit} from "..";

const settings = {
  name: 'EarthOrbit',
  radius: 10,
  rotateSpeed: 0.0001
};

class EarthOrbit extends Orbit {
  constructor() {
    super(settings);
  }
}

export default EarthOrbit;
