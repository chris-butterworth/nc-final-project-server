const findQuestionIndices = (letter, anagramWords, disabledButtons) => {
  // Turn anagram words into nested letter array
  const anagramLettersArray = anagramWords.map((word) => {
    return word.split("");
  });
  // Find the first word and letter index of the letter we're searching for
  for (let i = 0; i < anagramLettersArray.length; i++) {
    for (let j = 0; j < anagramLettersArray[i].length; j++) {
      if (anagramLettersArray[i][j] === letter) {
        //  Check if the disabled buttons already includes a button with that letter
        const disabledLetters = disabledButtons.map((button) => {
          return button.letter;
        });
        if (disabledLetters.includes(letter)) {
          for (let k = 0; k < disabledButtons.length; k++) {
            //  Check if that disabled button is the correct letter, and has a different word and letter index
            if (
              (disabledButtons[k].wordIndex !== i ||
                disabledButtons[k].letterIndex !== j) &&
              disabledButtons[k].letter === letter
            ) {
              //  If it is, return the questionWordIndex and the letterWordIndex
              return [i, j];
            }
          }
        } else {
          // If it doesn't, return [i,j]
          return [i, j];
        }
      }
    }
  }
};

export default findQuestionIndices;
