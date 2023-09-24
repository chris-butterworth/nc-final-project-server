const roomsMap = require("../roomsDatabase");
const { testRoom } = require("../testData");
const { resetGame } = require("../utils/gameUtils");

describe("resetGame()", () => {
  test("should reset all players in a room to readyToStartGame: false", () => {
    roomsMap.set(testRoom.roomId, testRoom);
    resetGame(testRoom.roomId);
    const room = roomsMap.get(testRoom.roomId);
    room.players.forEach((player) => {
      expect(player.readyToStartGame).toBe(false);
    });
  });
  test("should reset currentWord to 0", () => {
    roomsMap.set(testRoom.roomId, testRoom);
    resetGame(testRoom.roomId);
    const room = roomsMap.get(testRoom.roomId);
    expect(room.currentWord).toBe(0);
  });
  test("should reset round to { round: 1, anagram: 1 }", () => {
    const expected = { round: 1, anagram: 1 };
    roomsMap.set(testRoom.roomId, testRoom);
    resetGame(testRoom.roomId);
    const room = roomsMap.get(testRoom.roomId);
    expect(room.round).toEqual(expected);
  });
  test("should get a new set of anagrams from the API", () => {
    roomsMap.set(testRoom.roomId, testRoom);
    resetGame(testRoom.roomId).then(() => {
        const room = roomsMap.get(testRoom.roomId);
        room.anagrams.forEach((anagram, index) => {
          expect(anagram.question).not.toEqual(testRoom.anagrams[index].question);
        });
    });
  });
});
