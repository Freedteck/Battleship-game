const Player = require("./Player");

describe("Player", () => {
    test("This player is a computer", () => {
        const player = Player(false)
        expect(player.isComputer).toBe(false)
    })
});
