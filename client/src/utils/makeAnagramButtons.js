const makeAnagramButtons = (anagramWords) => {
  // Create an empty array
  const anagramButtons = [];
  // Loop through each word in the question
  for (let i = 0; i < anagramWords.length; i++) {
    let anagramWord = anagramWords[i].toUpperCase();
    // Loop through each letter in the question
    for (let j = 0; j < anagramWord.length; j++) {
      let anagramLetter = anagramWord[j];
      // Push an object to the anagramButtons array with the letter, wordIndex and letterIndex
      anagramButtons.push({
        letter: anagramLetter,
        wordIndex: i,
        letterIndex: j,
      });
    }
  }
  // Return the array of buttons
  return anagramButtons;
};

export default makeAnagramButtons;
