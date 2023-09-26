import makeAnagramButtons from "./makeAnagramButtons";

const findQuestionIndices = (letter, anagramWords, disabledButtons) => {
  // Format anagramLetters to include their word and letter index
  const anagramButtons = makeAnagramButtons(anagramWords);
  // Get a list of potential question/anagram buttons, based on them having the correct letter
  const potentialButtons = [];
  anagramButtons.forEach((button) => {
    if (button.letter === letter) {
      potentialButtons.push(button);
    }
  });
  // Get a list of all the disabled buttons with that letter
  const letterDisabledButtons = [];
  disabledButtons.forEach((button) => {
    if (button.letter === letter) {
      letterDisabledButtons.push(button);
    }
  });
  // Loop through all the potential buttons
  for (let i = 0; i < potentialButtons.length; i++) {
    // Filter the disabled buttons if they have the same word and letter index as the button we're looping through
    const filterResult = letterDisabledButtons.filter((button) => {
      return (
        button.wordIndex === potentialButtons[i].wordIndex &&
        button.letterIndex === potentialButtons[i].letterIndex
      );
    });
    // If none of the disabled buttons have that word and letter index
    if (filterResult.length === 0) {
      // Then return this word and letter index, as we can disable this button
      return [potentialButtons[i].wordIndex, potentialButtons[i].letterIndex];
    }
  }
};

export default findQuestionIndices;
