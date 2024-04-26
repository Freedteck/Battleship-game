const Ship = require("./Ship");

describe("Ship", () => {
  test.skip("initializes with given length", () => {
    const ship = Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.getHits()).toBe(0);
  });

  test.skip("Takes a hit", () => {
    const ship = Ship(3)
    ship.hit()
    expect(ship.getHits()).toBe(1)
  })

  test.skip("Takes multiple hits", () => {
    const ship = Ship(2)
    ship.hit()
    ship.hit()
    expect(ship.getHits()).toBe(2)
  })

  test.skip("The ship is Sunk", () => {
    const ship = Ship(2)
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true)
  })
});
