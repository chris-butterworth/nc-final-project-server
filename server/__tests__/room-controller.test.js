const roomsMap = require("../roomsDatabase");
const { testRoom, templateAnagrams } = require("../testData");
const { resetGame } = require("../controllers/anagram-controller");

describe("resetGame()", () => {
  test("should reset all players in a room to readyToStartGame: false", () => {
    roomsMap.set(testRoom.roomId, { ...testRoom });
    resetGame(testRoom.roomId);
    const room = roomsMap.get(testRoom.roomId);
    room.players.forEach((player) => {
      expect(player.readyToStartGame).toBe(false);
    });
  });
  test("should preserve each player's totalScore", () => {
    roomsMap.set(testRoom.roomId, { ...testRoom });
    resetGame(testRoom.roomId);
    const room = roomsMap.get(testRoom.roomId);
    room.players.forEach((player, index) => {
      expect(player.totalScore).toBe(testRoom.players[index].totalScore);
    });
  });
  test("should reset currentWord to 0", () => {
    roomsMap.set(testRoom.roomId, { ...testRoom });
    resetGame(testRoom.roomId);
    const room = roomsMap.get(testRoom.roomId);
    expect(room.currentWord).toBe(0);
  });
  test("should reset round to { round: 1, anagram: 1 }", () => {
    const expected = { round: 1, anagram: 1 };
    roomsMap.set(testRoom.roomId, { ...testRoom });
    resetGame(testRoom.roomId);
    const room = roomsMap.get(testRoom.roomId);
    expect(room.round).toEqual(expected);
  });
  test("should get a new set of anagrams from the API", async () => {
    roomsMap.set(testRoom.roomId, { ...testRoom });
    await resetGame(testRoom.roomId).then(() => {
      const room = roomsMap.get(testRoom.roomId);
      room.anagrams.forEach((anagram, index) => {
        expect(anagram.question).not.toEqual(templateAnagrams[index].question);
      });
    });
  });
});
