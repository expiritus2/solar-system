export const settings = {
  sun: {
    name: 'Sun',
    radius: 7,
    rotateSpeed: 0.002
  },
  mercury: {
    name: 'Saturn',
    radius: 0.5,
    rotateSpeed: -0.003,
    orbit: {
      name: 'SaturnOrbit',
      radius() { return this.sun.radius + 3 },
      rotateSpeed: 0.001,
      startAngleY: 0,
    }
  },
  venus: {
    name: 'Venus',
    radius: 1,
    rotateSpeed: 0.003,
    orbit: {
      name: 'VenusOrbit',
      radius() { return this.sun.radius + 6 },
      rotateSpeed: 0.001,
      startAngleY: 30,
    }
  },
  earth: {
    name: 'Earth',
    radius: 1,
    rotateSpeed: 0.003,
    orbit: {
      name: 'EarthOrbit',
      radius() { return this.sun.radius + 9 },
      rotateSpeed: 0.001,
      startAngleY: 130,
    }
  },
  mars: {
    name: 'Mars',
    radius: 0.7,
    rotateSpeed: 0.003,
    orbit: {
      name: 'MarsOrbit',
      radius() { return this.sun.radius + 12 },
      rotateSpeed: 0.001,
      startAngleY: -45,
    }
  },
  jupiter: {
    name: 'Jupiter',
    radius: 3,
    rotateSpeed: 0.003,
    orbit: {
      name: 'JupiterOrbit',
      radius() { return this.sun.radius + 15 },
      rotateSpeed: 0.001,
      startAngleY: 240,
    }
  },
  saturn: {
    name: 'Saturn',
    radius: 2.7,
    rotateSpeed: 0.003,
    orbit: {
      name: 'SaturnOrbit',
      radius() { return this.sun.radius + 18 },
      rotateSpeed: 0.001,
      startAngleY: 35,
    }
  },
  uranus: {
    name: 'Uranus',
    radius: 2,
    rotateSpeed: 0.003,
    orbit: {
      name: 'UranusOrbit',
      radius() { return this.sun.radius + 21 },
      rotateSpeed: 0.001,
      startAngleY: 90,
    }
  },
  neptune: {
    name: 'Neptune',
    radius: 2,
    rotateSpeed: 0.003,
    orbit: {
      name: 'NeptuneOrbit',
      radius() { return this.sun.radius + 24 },
      rotateSpeed: 0.001,
      startAngleY: 170,
    }
  },
  pluto: {
    name: 'Pluto',
    radius: 1.5,
    rotateSpeed: 0.003,
    orbit: {
      name: 'PlutoOrbit',
      radius() { return this.sun.radius + 27 },
      rotateSpeed: 0.001,
      startAngleY: 0,
    }
  },
};
