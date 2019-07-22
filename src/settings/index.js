export const settings = {
  Galaxy: {
    radius: 200,
  },
  Sun: {
    name: 'Sun',
    radius: 7,
    rotateSpeed: 0.002
  },
  Mercury: {
    name: 'Saturn',
    radius: 0.5,
    rotateSpeed: -0.003,
    orbit: {
      name: 'SaturnOrbit',
      radius() { return this.Sun.radius + 3 },
      rotateSpeed: 0.001,
      startAngleY: 0,
    }
  },
  Venus: {
    name: 'Venus',
    radius: 1,
    rotateSpeed: 0.003,
    orbit: {
      name: 'VenusOrbit',
      radius() { return this.Sun.radius + 6 },
      rotateSpeed: 0.001,
      startAngleY: 30,
    }
  },
  Earth: {
    name: 'Earth',
    radius: 1,
    rotateSpeed: 0.003,
    orbit: {
      name: 'EarthOrbit',
      radius() { return this.Sun.radius + 9 },
      rotateSpeed: 0.001,
      startAngleY: 130,
    },
    sputniks: {
      Moon: {
        name: 'Moon',
        radius() { return this.Earth.radius / 4 },
        rotateSpeed: 0.001,
        orbit: {
          name: 'MoonOrbit',
          radius() { return this.Earth.radius + 1 },
          rotateSpeed: 0.003,
          startAngleY: 0,
        }
      }
    }
  },
  Mars: {
    name: 'Mars',
    radius: 0.7,
    rotateSpeed: 0.003,
    orbit: {
      name: 'MarsOrbit',
      radius() { return this.Sun.radius + 12 },
      rotateSpeed: 0.001,
      startAngleY: -45,
    },
    sputniks: {
      Phobos: {
        name: 'Phobos',
        radius() { return this.Mars.radius / 6 },
        rotateSpeed: 0.001,
        orbit: {
          name: 'PhobosOrbit',
          radius() { return this.Mars.radius + 1 },
          rotateSpeed: 0.003,
          startAngleY: 0,
        }
      },
      Deimos: {
        name: 'Deimos',
        radius() { return this.Mars.radius / 5 },
        rotateSpeed: 0.003,
        orbit: {
          name: 'Deimos',
          radius() { return this.Mars.radius + 2 },
          rotateSpeed: 0.003,
          startAngleY: 90,
        }
      }
    }
  },
  Jupiter: {
    name: 'Jupiter',
    radius: 3,
    rotateSpeed: 0.003,
    orbit: {
      name: 'JupiterOrbit',
      radius() { return this.Sun.radius + 15 },
      rotateSpeed: 0.001,
      startAngleY: 240,
    }
  },
  Saturn: {
    name: 'Saturn',
    radius: 2.7,
    rotateSpeed: 0.003,
    orbit: {
      name: 'SaturnOrbit',
      radius() { return this.Sun.radius + 18 },
      rotateSpeed: 0.001,
      startAngleY: 15,
    }
  },
  Uranus: {
    name: 'Uranus',
    radius: 2,
    rotateSpeed: 0.003,
    orbit: {
      name: 'UranusOrbit',
      radius() { return this.Sun.radius + 21 },
      rotateSpeed: 0.001,
      startAngleY: 90,
    }
  },
  Neptune: {
    name: 'Neptune',
    radius: 2,
    rotateSpeed: 0.003,
    orbit: {
      name: 'NeptuneOrbit',
      radius() { return this.Sun.radius + 24 },
      rotateSpeed: 0.001,
      startAngleY: 170,
    }
  },
  Pluto: {
    name: 'Pluto',
    radius: 1.5,
    rotateSpeed: 0.003,
    orbit: {
      name: 'PlutoOrbit',
      radius() { return this.Sun.radius + 27 },
      rotateSpeed: 0.001,
      startAngleY: 0,
    }
  },
};
