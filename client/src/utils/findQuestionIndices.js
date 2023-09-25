const findQuestionIndices = (letter, anagramWords) => {
  // Turn anagram words into nested letter array
  const anagramLettersArray = anagramWords.map((word) => {
    return word.split("");
  });
  // Find the first word and letter index of the letter we're searching for
  for (let i = 0; i < anagramLettersArray.length; i++) {
    for (let j = 0; j < anagramLettersArray[i].length; j++) {
      if (anagramLettersArray[i][j] === letter) {
        // Return that word and letter index
        return [i, j];
      }
    }
  }
};

export default findQuestionIndices;
